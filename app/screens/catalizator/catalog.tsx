import React, {Component} from "react";
import {AppUrls} from "../../config/env/urls";
import { catalogInterface } from "../../config/interfaces/catalizators/catalogInterface";
import {ActivityIndicator, FlatList, Image, TouchableHighlight, Text, View, ScrollView} from "react-native";
import PouchDB from 'pouchdb-react-native';
import {Catalizator_styles} from "../../config/styles/catalizator-style";
import {saveCatalogToPounchDB} from "../../config/functions/saveDataToPounchDB";
import {NavigationScreenProp} from "react-navigation";

const catalogDB = new PouchDB('catalogdb');


interface catalogProps {
    navigation: NavigationScreenProp<any, any>
}

interface catalogState {
    catalog_items: catalogInterface[],
    isConnected: boolean,
    net_err_message: string
}


export default class Catalog extends Component<catalogProps, catalogState> {
    constructor(props: catalogProps){
        super(props);
        this.state = {
            catalog_items:[],
            isConnected: true,
            net_err_message: ''
        }
    }
    componentDidMount(){
        this.loadCatalog()
    }
    async loadCatalog(){
        try {
            let response = await fetch(AppUrls.cat_catalog_link);
            let result = await response.json();
            await saveCatalogToPounchDB(catalogDB, result);
            this.setState({catalog_items: await result});
        }
        catch (e) {
            catalogDB.info().then(function(info) {
                return info.doc_count;

            }).then(count => {
                if (count>0) {
                    catalogDB.allDocs({
                        include_docs: true
                    })
                        .then(result => {
                            return result.rows.map(row => row.doc);
                        })
                        .then((items) => {
                            let state_copy = {...this.state};
                            state_copy.isConnected = false;
                            // @ts-ignore
                            state_copy.catalog_items = items;
                            this.setState(state_copy);
                        })
                }
                else {
                    this.setState({net_err_message: 'ДЛЯ ПОЛУЧЕНИЯ КОРРЕКТНЫХ ДАННЫХ НЕОБХОДИМО ИНТЕРНЕТ ПОДКЛЮЧЕНИЕ'})
                }
            })
        }
        
    }
    render() {
        if (this.state.catalog_items.length == 0){
            return (
                <View>
                    {this.state.net_err_message?<View><Text>{this.state.net_err_message}</Text></View>:<View></View>}
                    <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                        <ActivityIndicator />
                    </View>
                </View>
            )
        }
        return (
            <View style={{flex: 1}}>
            <View style={Catalizator_styles.catalog_topbar}>
                <View style={Catalizator_styles.catalog_topbar_title_wr}><Text style={Catalizator_styles.catalog_topbar_title}>ЗАКРЫТЬ КАТАЛОГ</Text></View>
                <TouchableHighlight style={Catalizator_styles.catalog_topbar_icon_wr} onPress={() => this.props.navigation.navigate("Catalizator")} ><Image style={{width: 30, height: 30}} source={require("../../assets/catalizator/close-button-icon.png")}/></TouchableHighlight>
            </View>
            <ScrollView style={{flex: 7, marginTop: 50}}>
            <View style={Catalizator_styles.catalog_container}>
                    <View style={Catalizator_styles.catalog_category_container}>
                        <Text style={Catalizator_styles.catalog_title}>ОТЕЧЕСТВЕННЫЕ КАТАЛИЗАТОРЫ</Text>
                        {this.state.catalog_items.map((item, index)=>{
                            return(
                                <View key={index} style={Catalizator_styles.catalog_item_container}>
                                    <Text style={Catalizator_styles.catalog_item_model}>Модель: {item.auto_model}</Text>
                                    <Text style={Catalizator_styles.catalog_item_param}>Год выпуска: {item.year}</Text>
                                    <Text style={Catalizator_styles.catalog_item_param}>Вес катализатора: {item.weight} кг</Text>
                                    <Text style={Catalizator_styles.catalog_item_param}>Цена за кг: {item.price_kg} руб</Text>
                                    <Text style={Catalizator_styles.catalog_item_param}>Сумма: {item.sum} руб</Text>
                                </View>
                            )
                        })}
                    </View>
            </View>
            </ScrollView>
            </View>
        )
    }
}