import React, {Component} from "react";
import {AppUrls} from "../../config/env/urls";
import { saveAdvantToPounchDB } from "../../config/functions/saveDataToPounchDB";
import {ActivityIndicator, Image, Platform, Text, View} from "react-native";
import {Catalizator_styles} from "../../config/styles/catalizator-style";
import { advantInterface } from "../../config/interfaces/catalizators/advantInterface";
import PouchDB from 'pouchdb-react-native'
import {requestStorePermission} from "../../config/functions/requestStorePermission";
import {saveAdvantImage} from "../../config/functions/saveImages";
var RNFS = require('react-native-fs');

const advantDB = new PouchDB('advantdb');



interface advantProps {

}

interface advantState {
    advant_items: Array<advantInterface>,
    isConnected: boolean,
    net_err_message: string
}


export default class Advantages extends Component<advantProps, advantState> {
    constructor(props: advantProps){
        super(props);
        this.state = {
            advant_items:[],
            isConnected: true,
            net_err_message: ''
        }
    }
    componentDidMount(){
        this.loadAdvantages()
    }
    async loadAdvantages(){

        try {
            let response = await fetch(AppUrls.cat_advantages_link);
            let result = await response.json();
            await saveAdvantToPounchDB(advantDB, result);
            if (Platform.OS == 'android') {
                let permission = await requestStorePermission();
                if (permission) {
                    await saveAdvantImage(result)
                }
            }
            else {
                await saveAdvantImage(result)
            }

            this.setState({advant_items: await result});
        }
        catch (e) {
            advantDB.info().then(function(info) {
                return info.doc_count;

            }).then(count => {
                if (count>0) {
                    advantDB.allDocs({
                        include_docs: true
                    })
                        .then(result => {
                            return result.rows.map(row => row.doc);
                        })
                        .then((items) => {
                            let state_copy = {...this.state};
                            state_copy.isConnected = false;
                            // @ts-ignore
                            state_copy.advant_items = items;
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
                <Image resizeMode="contain" style={{flex: 0.8, width: undefined, height: undefined}} source={{uri:path}}/>?<Image resizeMode="contain" style={{flex: 0.8, width: undefined, height: undefined}} source={{uri:path}}/>:<Image resizeMode="contain" style={{flex: 0.8, width: undefined, height: undefined}} source={require("../../assets/common/blank_image.jpg")}/>
            )
        }
    }

    render() {
        if (this.state.advant_items.length == 0){
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
                    <Text style={Catalizator_styles.component_title}>ПРЕИМУЩЕСТВА</Text>
                </View>
            <View style={Catalizator_styles.advant_container}>
                {this.state.advant_items.map((item, index)=>{
                    return <View key={index} style={Catalizator_styles.advant_item_wr}>
                        <View style={Catalizator_styles.advant_item_image}>
                            <View style={{width: 80, height: 80}}>
                                {this.renderItemImage(this.state.isConnected, item)}
                            </View>
                        </View>
                        <View style={Catalizator_styles.advant_item_text_wr}>
                            <Text style={Catalizator_styles.advant_item_text}>{ item.text }</Text>
                        </View>
                    </View>
                })}
            </View>
            </View>
        )
    }
}