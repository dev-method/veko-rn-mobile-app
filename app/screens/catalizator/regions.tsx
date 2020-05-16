import React, {Component} from "react";
import {AppUrls} from "../../config/env/urls";
import {ActivityIndicator, Image, Platform, Text, View} from "react-native";
import { regionsInterface } from "../../config/interfaces/catalizators/regionsInterface";
import PouchDB from 'pouchdb-react-native';
import {saveRegionImage} from "../../config/functions/saveImages";
import {requestStorePermission} from "../../config/functions/requestStorePermission";
var RNFS = require('react-native-fs');
import {Catalizator_styles} from "../../config/styles/catalizator-style";
import {saveRegionToPounchDB} from "../../config/functions/saveDataToPounchDB";

const regionDB = new PouchDB('regiondb');

interface regionsProps {

}

interface regionsState {
    regions_items: Array<regionsInterface>,
    isConnected: boolean,
    net_err_message: string
}


export default class Regions extends Component<regionsProps, regionsState> {
    constructor(props: regionsProps){
        super(props);
        this.state = {
            regions_items:[],
            isConnected: true,
            net_err_message: ''
        }
    }
    componentDidMount(){
        this.loadRegion()
    }

    async loadRegion(){

        try {
            let response = await fetch(AppUrls.cat_regions_link);
            let result = await response.json();
            await saveRegionToPounchDB(regionDB, result);
            if (Platform.OS == 'android') {
                let permission = await requestStorePermission();
                if (permission) {
                    await saveRegionImage(result)
                }
            }
            else {
                await saveRegionImage(result)
            }
            this.setState({regions_items: await result});
        }
        catch (e) {
            regionDB.info().then(function(info) {
                return info.doc_count;

            }).then(count => {
                if (count>0) {
                    regionDB.allDocs({
                        include_docs: true
                    })
                        .then(result => {
                            return result.rows.map(row => row.doc);
                        })
                        .then((items) => {
                            let state_copy = {...this.state};
                            state_copy.isConnected = false;
                            // @ts-ignore
                            state_copy.regions_items = items;
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
        if (this.state.regions_items.length == 0){
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
                    <Text style={Catalizator_styles.component_title}>ПОРЯДОК РАБОТЫ С РЕГИОНАМИ</Text>
                </View>
            <View style={Catalizator_styles.regions_container}>
                {this.state.regions_items.map((item, index)=>{
                    return <View key={index} style={Catalizator_styles.regions_item_wr}>
                        <View style={Catalizator_styles.regions_item_image}>
                            <View style={{width: 80, height: 80}}>
                                {this.renderItemImage(this.state.isConnected, item)}
                            </View>
                        </View>
                        <View style={Catalizator_styles.regions_item_text_wr}>
                            <Text style={Catalizator_styles.regions_item_text}>{ item.text }</Text>
                        </View>
                    </View>
                })}
            </View>
            </View>
        )
    }
}