import React, {Component} from "react";
import {AppUrls} from "../../config/env/urls";
import {Image, Platform, Text, View, TouchableHighlight, ActivityIndicator} from "react-native";
import PouchDB from 'pouchdb-react-native';
import {savePriceImage} from "../../config/functions/saveImages";
import {requestStorePermission} from "../../config/functions/requestStorePermission";
import {savePriceToPounchDB } from "../../config/functions/saveDataToPounchDB";
import { blockInterface } from "../../config/interfaces/catalizators/blockInterface";
var RNFS = require('react-native-fs');
import Catalog from './catalog'
import ForeignCatalog from './foreign-catalog'
import {Catalizator_styles} from "../../config/styles/catalizator-style";
import {NavigationScreenProp} from "react-navigation";

const priceDB = new PouchDB('pricedb');

interface blocksProps {
    navigation: NavigationScreenProp<any, any>
}

interface blocksState {
    blocks: Array<blockInterface>,
    isConnected: boolean,
    net_err_message: string,
}


export default class PriceBlocks extends Component<blocksProps, blocksState> {
    constructor(props: blocksProps){
        super(props);
        this.state = {
            blocks:[],
            isConnected: true,
            net_err_message: '',
        };
    }
    componentDidMount(){
            this.loadPrice();
    }

    async loadPrice(){
        try {
            let response = await fetch(AppUrls.cat_priceblocks_link);
            let result = await response.json();
            await savePriceToPounchDB(priceDB, result);
            if (Platform.OS == 'android') {
                let permission = await requestStorePermission();
                if (permission) {
                    await savePriceImage(result)
                }
            }
            else {
                await savePriceImage(result)
            }
            this.setState({blocks: await result});
        }
        catch (e) {
            priceDB.info().then(function(info) {
                return info.doc_count;

            }).then(count => {
                if (count>0) {
                    priceDB.allDocs({
                        include_docs: true
                    })
                        .then(result => {
                            return result.rows.map(row => row.doc);
                        })
                        .then((items) => {
                            let state_copy = {...this.state};
                            state_copy.isConnected = false;
                            // @ts-ignore
                            state_copy.blocks = items;
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

    renderItemImage(flag:boolean, item:blockInterface) {
        if(flag){
            return(
                <Image style={{height: 250, borderTopLeftRadius: 9, borderTopRightRadius: 9}} source={{uri: 'https://vekokat.ru/'+ item.image}}/>
            )
        }
        else {
            const extension = (Platform.OS === 'android') ? 'file://' : '';
            const img_part =item.image.slice(12);
            const path = `${extension}${RNFS.DocumentDirectoryPath}${img_part}`;
            return(
                <Image style={{height: 250, borderTopLeftRadius: 9, borderTopRightRadius: 9}} source={{uri:path}}/>?<Image style={{height: 250, borderTopLeftRadius: 9, borderTopRightRadius: 9}} source={{uri:path}}/>:<Image style={{height: 250, borderTopLeftRadius: 9, borderTopRightRadius: 9}} source={require("../../assets/common/blank_image.jpg")}/>
            )
        }
    }
    renderCatalogIcons(item:blockInterface){
        switch (item.group) {
            case 1: {
                return (
                    <View style={{flex: 1, flexDirection: 'row', paddingTop: 10}}><TouchableHighlight style={{flex: 2}} onPress={() => this.props.navigation.navigate("Catalog")}><Text style={{fontWeight: 'bold', paddingTop: 5, fontSize: 18}}>СМОТРЕТЬ КАТАЛОГ</Text></TouchableHighlight><TouchableHighlight style={{flex: 1, paddingLeft: 20}} onPress={() => this.props.navigation.navigate("Catalog")}><Image style={{width: 30, height: 30 }} source={require("../../assets/catalizator/show_catalog_grey_icon.png")}/></TouchableHighlight></View>
                )
            }
            case 2: {
                return (
                    <View style={{flex: 1, flexDirection: 'row', paddingTop: 10}}><TouchableHighlight style={{flex: 2}} onPress={() => this.props.navigation.navigate("ForeignCatalog")}><Text style={{fontWeight: 'bold', paddingTop: 5, fontSize: 18}}>СМОТРЕТЬ КАТАЛОГ</Text></TouchableHighlight><TouchableHighlight style={{flex: 1, paddingLeft: 20}} onPress={() => this.props.navigation.navigate("Catalog")}><Image style={{width: 30, height: 30 }} source={require("../../assets/catalizator/show_catalog_grey_icon.png")}/></TouchableHighlight></View>
                )
            }
        }
    }

    render() {
        if (this.state.blocks.length == 0){
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
                    <Text style={Catalizator_styles.component_title}>ЦЕНЫ</Text>
                </View>
            <View style={Catalizator_styles.price_blocks_container}>
                {this.state.blocks.map((item, index)=>{
                    return <View key={index} style={Catalizator_styles.price_blocks_item_wr}>
                        <View style={Catalizator_styles.top_block_wr}>
                            {this.renderItemImage(this.state.isConnected, item)}
                        </View>
                        <View style={Catalizator_styles.middle_block_wr}>
                            <View style={Catalizator_styles.middle_block_title_wr}>
                                <Text style={Catalizator_styles.middle_block_title}>{ item.title }</Text>
                            </View>
                            <View style={Catalizator_styles.middle_block_text_wr}>
                                <Text style={Catalizator_styles.middle_block_text}>{ item.text }</Text>
                            </View>
                        </View>
                        <View style={Catalizator_styles.bottom_block_wr}>
                            <Text style={Catalizator_styles.bottom_block_price}>{ item.price }</Text>
                            {this.renderCatalogIcons(item)}
                        </View>
                    </View>
                })}

            </View>
            </View>

        )
    }
}