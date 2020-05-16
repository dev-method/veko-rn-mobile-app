import React from 'react';
import {Component} from 'react';
import { AppUrls } from "../config/env/urls";
import { Electro_styles } from '../config/styles/electro-styles'
import { ElectronicInterface } from '../config/interfaces/electronicInterface'
import fetchList from '../config/functions/fetchData'
import { filterData, filterPounchData } from "../config/functions/filterData";
import { NavigationScreenProp} from 'react-navigation';
import HTMLView from 'react-native-htmlview';
import Toast from 'react-native-simple-toast';
import {
    Text,
    View,
    Image,
    ImageBackground,
    TouchableHighlight,
    FlatList,
    Linking,
    ActivityIndicator,
    Platform,
    StyleSheet
} from 'react-native';
import {saveElectroToPounchDB} from "../config/functions/saveDataToPounchDB";
import PouchDB from "pouchdb-react-native";
import {requestStorePermission} from "../config/functions/requestStorePermission";
import {saveElectroImage} from "../config/functions/saveImages";
import {Common_styles} from "../config/styles/common-styles";
var RNFS = require('react-native-fs');
import RNFetchBlob from 'rn-fetch-blob'

const electroDB = new PouchDB('electrodb');

interface Props {
    navigation: NavigationScreenProp<any,any>
}

interface State {
    common_list: Array<ElectronicInterface[]>,
    isConnected: boolean,
    net_err_message: string

}

const styles = StyleSheet.create({
    p: {fontWeight: 'bold', fontSize: 16},
    h4:{fontWeight:'bold', fontSize: 16},
    h3:{fontWeight:'bold', fontSize: 16},
    h2:{fontWeight:'bold', fontSize: 16},
    h1:{fontWeight:'bold', fontSize: 16},
});

export default class ElectroScreen extends Component<Props> {
    onPressDownload() {
        let dirs = RNFetchBlob.fs.dirs;
        RNFetchBlob
            .config({
                fileCache : true,
                path : dirs.DocumentDir + '/price-vekolom.xlsx',
                addAndroidDownloads : {
                    useDownloadManager : true, // <-- this is the only thing required
                    // Optional, override notification setting (default to true)
                    notification : true,
                    // Optional, but recommended since android DownloadManager will fail when
                    // the url does not contains a file extension, by default the mime type will be text/plain
                    description : 'Скачиваем прайс-лист',
                    mime : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet ',
                    // Make the file scannable  by media scanner
                    mediaScannable : true,
                }
            })
            .fetch('GET', 'https://vekolom.ru/media/media/exel/PriceVeko.xlsx', {
                //some headers ..
            })
            .then((resp) => {
                // the temp file path
            })
    };
    render() {
        return (
            <View style={{flex: 1}}>
                <ImageBackground style={{width: '100%', height: '100%'}} source={require("../assets/electro/electro_back.jpg")}>
                    <View style={Electro_styles.top_bar_container}>
                        <ImageBackground style={{width: '100%', height: '100%'}} source={require("../assets/electro/header-electro-app.jpg")}>
                            <View style={Electro_styles.top_bar_wrapper}>
                                <View style={Electro_styles.bar_button_wrapper}><TouchableHighlight onPress={() => this.props.navigation.goBack()}><Image style={Electro_styles.top_bar_back_button} source={require("../assets/icons/arow-icon.png")}/></TouchableHighlight></View>
                                <View style={Electro_styles.bar_logo_wrapper}><TouchableHighlight  onPress={ ()=> Linking.openURL(AppUrls.vekolom_link) } ><Image style={Electro_styles.top_bar_logo} source={require("../assets/icons/logo-vekolom-app.png")}/></TouchableHighlight></View>
                                <View style={Electro_styles.bar_text_wrapper}><Text style={Electro_styles.top_bar_text}>ЭЛЕКТРОННЫЙ ЛОМ</Text></View>
                                <View style={Common_styles.bar_button_wrapper}><TouchableHighlight onPress={() => this.onPressDownload()}><Image style={Common_styles.top_bar_back_button} source={require("../assets/icons/download_icon.png")}/></TouchableHighlight></View>
                            </View>
                        </ImageBackground>
                    </View>
                    <View style={Electro_styles.comm_list_container}>
                        <ElectronicList navigation={this.props.navigation}/>
                    </View>
                    <View style={Electro_styles.bottom_bar_container}>
                        <TouchableHighlight onPress={() => this.props.navigation.navigate('Map')}>
                            <Image style={{height:45, width: 45}} source={require('../assets/icons/map-icon-map.png')}/>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={() => this.props.navigation.navigate('Calc')}>
                            <Image style={{height:45, width: 45}} source={require('../assets/icons/calculator-icon-app.png')}/>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={() => this.props.navigation.navigate('Form')}>
                            <Image style={{height:45, width: 45}} source={require('../assets/icons/mail-icon-app.png')}/>
                        </TouchableHighlight>
                    </View>
                </ImageBackground>
            </View>
        )
    }
}


class ElectronicList extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            common_list:[],
            isConnected: true,
            net_err_message: ''
        }
    }
    componentDidMount() {
        this.getData()

    }
    async getData(){
        try {
            const data = await fetchList.fetchListData(AppUrls.electronic_link);
            const filter_data = filterData<ElectronicInterface>(data, 'category');
            await saveElectroToPounchDB(electroDB, data);
            if (Platform.OS == "android") {
                let permission = await requestStorePermission();
                if (permission) {
                    await saveElectroImage(data);
                }
            }
            else {
                await saveElectroImage(data);
            }


            this.setState({common_list:filter_data});
            }
         catch (e) {
             electroDB.info().then(function(info) {
                 return info.doc_count;

             }).then(count => {
                 if (count>0) {
                     electroDB.allDocs({
                         include_docs: true
                     })
                         .then(result => {
                             return result.rows.map(row => row.doc);
                         })
                         .then((items) => {
                             let state_copy = {...this.state};
                             state_copy.isConnected = false;
                             state_copy.common_list = filterPounchData(items, 'category');
                             this.setState(state_copy);
                         })
                 }
                 else {
                     this.setState({net_err_message: 'ДЛЯ ПОЛУЧЕНИЯ КОРРЕКТНЫХ ДАННЫХ НЕОБХОДИМО ИНТЕРНЕТ ПОДКЛЮЧЕНИЕ'})
                 }
             })
         }
    }

    _renderItem=({item})=>{
        return item.map((index, i)=>{
            const description = index.description;
            const rules = index.rules;
            return (
                <ElectroItem
                    key={i}
                    item={index}
                    connect={this.state.isConnected}
                />
            )
        })
    };
    showToast(net_fail){
        if(net_fail){
            Toast.showWithGravity(net_fail, Toast.LONG, Toast.CENTER)
        }
    }

    render() {
        if (this.state.common_list.length == 0){
            return (
                <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                    {this.showToast(this.state.net_err_message)}
                    <ActivityIndicator />
                </View>
            )
        }
        return (
            <View style={Electro_styles.list_container}>
                <FlatList
                    data={this.state.common_list}
                    showsVerticalScrollIndicator={false}
                    renderItem={this._renderItem}
                    keyExtractor={(item, index) => (index).toString()}
                />
            </View>
        )
    }
}

class ElectroItem extends Component {
    renderInfoBlock(item){
        if (item.price_2){
            return(
                <View style={Electro_styles.list_text_block_container}>
                    <View style={Electro_styles.multi_list_title_wrapper}>
                        <TouchableHighlight ><Text style={Electro_styles.list_title}>{item.name}</Text></TouchableHighlight>
                    </View>
                    <View style={Electro_styles.multi_price_wrapper}>
                        <Text style={Electro_styles.multi_list_price_text}>{item.price_title}:</Text><Image style={Electro_styles.multi_list_price_icon} source={require("../assets/icons/money_icon.png")}/><Text style={Electro_styles.multi_list_price_text}>{item.price}</Text>
                    </View>
                    {item.price_2?<View style={Electro_styles.multi_price_wrapper}>
                        <Text style={Electro_styles.multi_list_price_text}>{item.price2_title}:</Text><Image style={Electro_styles.multi_list_price_icon} source={require("../assets/icons/money_icon.png")}/><Text style={Electro_styles.multi_list_price_text}>{item.price_2}</Text>
                    </View>:<View></View>}
                    {item.price_3?<View style={Electro_styles.multi_price_wrapper}>
                        <Text style={Electro_styles.multi_list_price_text}>{item.price3_title}:</Text><Image style={Electro_styles.multi_list_price_icon} source={require("../assets/icons/money_icon.png")}/><Text style={Electro_styles.multi_list_price_text}>{item.price_3}</Text>
                    </View>:<View></View>}
                </View>
            )
        }
        else {
            return (
                <View style={Electro_styles.list_text_block_container}>
                    <View style={Electro_styles.list_title_wrapper}>
                        <TouchableHighlight ><Text style={Electro_styles.list_title}>{item.name}</Text></TouchableHighlight>
                    </View>
                    <View style={Electro_styles.price_wrapper}>
                        <Image style={Electro_styles.list_price_icon} source={require("../assets/icons/money_icon.png")}/>
                        <Text style={Electro_styles.list_price_text}>{item.price}</Text>
                    </View>
                </View>
            )
        }

    }
    renderImages(flag, item){
        if(flag){
            return(
                <Image style={Electro_styles.list_image} source={{uri:"https://vekolom.ru/"+item.foto_app}}/>
            )
        }
        else {
            const extension = (Platform.OS === 'android') ? 'file://' : '';
            const img_part =item.foto_app.slice(12);
            const path = `${extension}${RNFS.DocumentDirectoryPath}${img_part}`;
            return (
                <Image style={Electro_styles.list_image} source={{uri:path}}/>?<Image style={Electro_styles.list_image} source={{uri:path}}/>:<Image style={Electro_styles.list_image} source={require("../assets/common/blank_image.jpg")}/>
            )
        }
    }

    render(){
        return(
            <View style={Electro_styles.list_item_wrapper}>
                <View style={Electro_styles.list_item_top}>
                    <View style={Electro_styles.list_image_wrapper}>
                        {this.renderImages(this.props.connect, this.props.item)}
                    </View>
                    {this.renderInfoBlock(this.props.item)}
                </View>
                <View style={Electro_styles.list_item_bottom}>
                    <View style={Electro_styles.list_item_bottom_text}>{this.props.item.description?<HTMLView value={ this.props.item.description } stylesheet={styles}/>:<View></View>}</View>
                    <View style={Electro_styles.list_item_bottom_text}>{this.props.item.rules?<HTMLView value={ this.props.item.rules } stylesheet={styles}/>:<View></View>}</View>
                </View>
            </View>
        )
    }
}
