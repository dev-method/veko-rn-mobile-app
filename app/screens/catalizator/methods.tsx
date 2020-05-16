import React, {Component} from "react";
import {AppUrls} from "../../config/env/urls";
import {ActivityIndicator, ImageBackground, Platform, Text, View} from "react-native";
import PouchDB from 'pouchdb-react-native';
import { saveMethodImage} from "../../config/functions/saveImages";
import { methodsInterface } from "../../config/interfaces/catalizators/methodsInterface";
import { requestStorePermission } from "../../config/functions/requestStorePermission";
import { saveMethodToPounchDB } from "../../config/functions/saveDataToPounchDB";
var RNFS = require('react-native-fs');
import {Catalizator_styles} from "../../config/styles/catalizator-style";

const methodsDB = new PouchDB('methodsdb');

interface methodsProps {

}

interface methodsState {
    methods_items: Array<methodsInterface>,
    isConnected: boolean,
    net_err_message: string

}


export default class Methods extends Component<methodsProps, methodsState> {
    constructor(props: methodsProps){
        super(props);
        this.state = {
            methods_items:[],
            isConnected: true,
            net_err_message: ''
        }
    }
    componentDidMount(){
        this.loadMethod();
    }
    async loadMethod(){
        try {
            let response = await fetch(AppUrls.cat_methods_link);
            let result = await response.json();
            await saveMethodToPounchDB(methodsDB, result);
            if (Platform.OS == 'android') {
                let permission = await requestStorePermission();
                if (permission) {
                    await saveMethodImage(result)
                }
            }
            else {
                await saveMethodImage(result)
            }
            this.setState({methods_items: await result});
        }
        catch (e) {
            methodsDB.info().then(function(info) {
                return info.doc_count;

            }).then(count => {
                if (count>0) {
                    methodsDB.allDocs({
                        include_docs: true
                    })
                        .then(result => {
                            return result.rows.map(row => row.doc);
                        })
                        .then((items) => {
                            let state_copy = {...this.state};
                            state_copy.isConnected = false;
                            // @ts-ignore
                            state_copy.methods_items = items;
                            this.setState(state_copy);
                        })
                }
                else {
                    this.props.changeStatus(true);
                    this.setState({net_err_message: 'ДЛЯ ПОЛУЧЕНИЯ КОРРЕКТНЫХ ДАННЫХ НЕОБХОДИМО ИНТЕРНЕТ ПОДКЛЮЧЕНИЕ'})
                }
            })
        }

    }
    renderItemImage(flag, item) {
        if(flag){
            return(
                <ImageBackground style={{height: 400, width: 280}} source={{uri: 'https://vekokat.ru/'+ item.image}}>
                    <View style={Catalizator_styles.methods_item_text_wr}>
                        <View style={Catalizator_styles.methods_item_number_wr}>
                            <Text style={Catalizator_styles.methods_item_number}>{ item.number }</Text>
                        </View>
                        <View style={Catalizator_styles.methods_item_title_wr}>
                            <Text style={Catalizator_styles.methods_item_title}>{ item.text }</Text>
                        </View>
                    </View>
                </ImageBackground>
            )
        }
        else {
            const extension = (Platform.OS === 'android') ? 'file://' : '';
            const img_part =item.icon_image.slice(12);
            const path = `${extension}${RNFS.DocumentDirectoryPath}${img_part}`;
            return(
                <ImageBackground style={{height: 400, width: 280}} source={{uri:path}}>
                    <View style={Catalizator_styles.methods_item_text_wr}>
                        <View style={Catalizator_styles.methods_item_number_wr}>
                            <Text style={Catalizator_styles.methods_item_number}>{ item.number }</Text>
                        </View>
                        <View style={Catalizator_styles.methods_item_title_wr}>
                            <Text style={Catalizator_styles.methods_item_title}>{ item.text }</Text>
                        </View>
                    </View>
                </ImageBackground>?
                    <ImageBackground style={{height: 400, width: 280}} source={{uri:path}}>
                        <View style={Catalizator_styles.methods_item_text_wr}>
                            <View style={Catalizator_styles.methods_item_number_wr}>
                                <Text style={Catalizator_styles.methods_item_number}>{ item.number }</Text>
                            </View>
                            <View style={Catalizator_styles.methods_item_title_wr}>
                                <Text style={Catalizator_styles.methods_item_title}>{ item.text }</Text>
                            </View>
                        </View>
                    </ImageBackground>:
                    <ImageBackground style={{height: 400, width: 280}} source={require("../../assets/common/blank_image_400_280.jpg")}>
                        <View style={Catalizator_styles.methods_item_text_wr}>
                            <View style={Catalizator_styles.methods_item_number_wr}>
                                <Text style={Catalizator_styles.methods_item_number}>{ item.number }</Text>
                            </View>
                            <View style={Catalizator_styles.methods_item_title_wr}>
                                <Text style={Catalizator_styles.methods_item_title}>{ item.text }</Text>
                            </View>
                        </View>
                    </ImageBackground>
            )
        }
    }

    render() {
        if (this.state.methods_items.length == 0){
            return (
                <View>
                    <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                        <ActivityIndicator />
                    </View>
                </View>
            )
        }
        return(
            <View style={Catalizator_styles.component_item}>
                <View style={Catalizator_styles.component_title_wr}>
                    <Text style={Catalizator_styles.component_title}>ПОРЯДОК РАБОТ</Text>
                </View>
            <View style={Catalizator_styles.methods_container}>
                {this.state.methods_items.map((item, index)=>{
                    return <View key={index} style={Catalizator_styles.methods_item_wr}>
                        {this.renderItemImage(this.state.isConnected, item)}
                    </View>
                })}
            </View>
            </View>
        )
    }
}