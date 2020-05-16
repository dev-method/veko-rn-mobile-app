import React, {Component} from "react";
import {AppUrls} from "../../config/env/urls";
import {ActivityIndicator, FlatList, Image, Platform, ScrollView, Text, TouchableHighlight, View} from "react-native";
import PouchDB from 'pouchdb-react-native';
import { catalogInterface } from "../../config/interfaces/catalizators/catalogInterface";
import {Catalizator_styles} from "../../config/styles/catalizator-style";
import {saveCatalogToPounchDB} from "../../config/functions/saveDataToPounchDB";
import {NavigationScreenProp} from "react-navigation";

const foreigncatalogDB = new PouchDB('foreigncatalogdb');

interface catalogProps {
    navigation: NavigationScreenProp<any, any>
}

interface catalogState {
    catalog_items: catalogInterface[],
    show_catalog: boolean,
    show_foreign_catalog: boolean,
    isConnected: boolean,
    net_err_message: string
}


export default class ForeignCatalog extends Component<catalogProps, catalogState> {
    constructor(props: catalogProps){
        super(props);
        this.state = {
            catalog_items:[],
            show_catalog: true,
            show_foreign_catalog: true,
            isConnected: true,
            net_err_message: ''
        }
    }
    componentDidMount(){
        this.loadCatalog()
    }
    async loadCatalog(){
        try {
            let response = await fetch(AppUrls.cat_foreign_catalog_link);
            let result = await response.json();
            await saveCatalogToPounchDB(foreigncatalogDB, result);
            this.setState({catalog_items: await result});
        }
        catch (e) {
            foreigncatalogDB.info().then(function(info) {
                return info.doc_count;

            }).then(count => {
                if (count>0) {
                    foreigncatalogDB.allDocs({
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
                    <Text style={Catalizator_styles.catalog_title}>ИМПОРТНЫЕ КАТАЛИЗАТОРЫ</Text>
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