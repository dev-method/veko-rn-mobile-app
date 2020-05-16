import React, {Component} from "react";
import {AppUrls} from "../../config/env/urls";
import {ActivityIndicator, Image, Platform, Text, View} from "react-native";
import PouchDB from 'pouchdb-react-native';
import { saveLaborImage } from "../../config/functions/saveImages";
import {requestStorePermission} from "../../config/functions/requestStorePermission";
var RNFS = require('react-native-fs');
import { laboratoryInterface } from "../../config/interfaces/catalizators/laboratoryInterface";
import {Catalizator_styles} from "../../config/styles/catalizator-style";
import { saveLaborToPounchDB } from "../../config/functions/saveDataToPounchDB";

const laborDB = new PouchDB('labordb');

interface laboratoryProps {

}

interface laboratoryState {
    laboratory_items: Array<laboratoryInterface>,
    isConnected: boolean,
    net_err_message: string
}

export default class Laboratory extends Component<laboratoryProps, laboratoryState> {
    constructor(props: laboratoryProps){
        super(props);
        this.state = {
            laboratory_items:[],
            isConnected: true,
            net_err_message: ''
        }
    }
    componentDidMount(){
        this.loadLabor();
    }
    async loadLabor(){

        try {
            let response = await fetch(AppUrls.cat_laboratory_link);
            let result = await response.json();
            await saveLaborToPounchDB(laborDB, result);
            if (Platform.OS == 'android') {
                let permission = await requestStorePermission();
                if (permission) {
                    await saveLaborImage(result)
                }
            }
            else {
                await saveLaborImage(result)
            }
            this.setState({laboratory_items: await result});
        }
        catch (e) {
            laborDB.info().then(function(info) {
                return info.doc_count;

            }).then(count => {
                if (count>0) {
                    laborDB.allDocs({
                        include_docs: true
                    })
                        .then(result => {
                            return result.rows.map(row => row.doc);
                        })
                        .then((items) => {
                            let state_copy = {...this.state};
                            state_copy.isConnected = false;
                            // @ts-ignore
                            state_copy.laboratory_items = items;
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
                <Image resizeMode="contain" style={{flex: 0.8, width: undefined, height: undefined}} source={{uri: 'https://vekokat.ru/'+ item.icon_image}}/>
            )
        }
        else {
            const extension = (Platform.OS === 'android') ? 'file://' : '';
            const img_part =item.icon_image.slice(12);
            const path = `${extension}${RNFS.DocumentDirectoryPath}${img_part}`;
            return (
                <Image resizeMode="contain" style={{flex: 0.8, width: undefined, height: undefined}} source={{uri:path}}/>? <Image resizeMode="contain" style={{flex: 0.8, width: undefined, height: undefined}} source={{uri:path}}/>:<Image resizeMode="contain" style={{flex: 0.8, width: undefined, height: undefined}} source={require("../../assets/common/blank_image.jpg")}/>
            )
        }
    }

    render() {
        if (this.state.laboratory_items.length == 0){
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
                    <Text style={Catalizator_styles.component_title}>МОБИЛЬНАЯ ЛАБОРАТОРИЯ</Text>
                </View>
            <View style={Catalizator_styles.laboratory_container}>
                {this.state.laboratory_items.map((item, index)=>{
                    return <View key={index} style={Catalizator_styles.laboratory_item_wr}>
                        <View style={Catalizator_styles.laboratory_item_title_wr}>
                            <Text style={Catalizator_styles.laboratory_item_title}>{ item.title }</Text>
                        </View>
                        <View style={Catalizator_styles.laboratory_item_image}>
                            <View style={{width: 80, height: 80}}>
                                {this.renderItemImage(this.state.isConnected, item)}
                            </View>
                        </View>
                        <View style={Catalizator_styles.laboratory_item_text_wr}>
                            <Text style={Catalizator_styles.laboratory_item_text}>{ item.text }</Text>
                        </View>
                    </View>
                })}
            </View>
            </View>
        )
    }
}