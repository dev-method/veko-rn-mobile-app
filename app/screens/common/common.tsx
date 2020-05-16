import React from 'react';
import {Component} from 'react';
import {Common_styles} from '../../config/styles/common-styles'
import { AppUrls } from "../../config/env/urls";
import fetchList from '../../config/functions/fetchData'
import {saveDataToPounchDB} from '../../config/functions/saveDataToPounchDB'
import { MetalInterface } from '../../config/interfaces/metalInterface'
import {requestStorePermission} from '../../config/functions/requestStorePermission'
import { filterPounchData, filterData } from "../../config/functions/filterData";
import { NavigationScreenProp} from 'react-navigation';
import PouchDB from 'pouchdb-react-native';
import RNFetchBlob from 'rn-fetch-blob'
var RNFS = require('react-native-fs');
import Toast from 'react-native-simple-toast';
import {
    Text,
    View,
    Image,
    ImageBackground,
    TouchableHighlight,
    FlatList,
    Linking,
    Animated,
    ActivityIndicator,
    Platform
} from 'react-native';
import {saveComMetImage} from "../../config/functions/saveImages";


interface Props {
    navigation: NavigationScreenProp<any,any>
}

interface State {
    arrowBottom: any,
    iconsBottom: any,
    common_list: Array<MetalInterface[]>,
    isConnected: boolean,
    net_err_message: string
}

export default class CommonScreen extends Component<Props, State> {
    onPressDownload() {
        if (!this.state.isConnected) {
            const mess = "Ошибка скачивания. Повторите попытку позже или проверте подключение к интернету";
            Toast.showWithGravity(mess, Toast.LONG, Toast.CENTER)
        } else {
            let dirs = RNFetchBlob.fs.dirs;
            RNFetchBlob
                .config({
                    fileCache: true,
                    path: dirs.DocumentDir + '/price-vekomet.xlsx',
                    addAndroidDownloads: {
                        useDownloadManager: true, // <-- this is the only thing required
                        // Optional, override notification setting (default to true)
                        notification: true,
                        // Optional, but recommended since android DownloadManager will fail when
                        // the url does not contains a file extension, by default the mime type will be text/plain
                        description: 'Скачиваем прайс-лист',
                        mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet ',
                        // Make the file scannable  by media scanner
                        mediaScannable: true,
                    }
                })
                .fetch('GET', 'https://www.vekomet.ru/static/core/images/PriceVeko.xlsx', {
                    //some headers ..
                })
                .then((resp) => {
                    // the temp file path
                })
        }
    }
    render() {
        return (
            <View style={{flex: 1}}>
                <ImageBackground style={{width: '100%', height: '100%'}} source={require("../../assets/common_screen/common_back.jpg")}>
                    <View style={Common_styles.top_bar_container}>
                        <ImageBackground style={{width: '100%', height: '100%'}} source={require("../../assets/common_screen/header-common-app.jpg")}>
                            <View style={Common_styles.top_bar_wrapper}>
                                <View style={Common_styles.bar_button_wrapper}><TouchableHighlight onPress={() => this.props.navigation.goBack(null)}><Image style={Common_styles.top_bar_back_button} source={require("../../assets/icons/arow-icon.png")}/></TouchableHighlight></View>
                                <View style={Common_styles.bar_logo_wrapper}><TouchableHighlight  onPress={ ()=> Linking.openURL(AppUrls.common_link) } ><Image style={Common_styles.top_bar_logo} source={require("../../assets/common_screen/logo-veko-app.png")}/></TouchableHighlight></View>
                                <View style={Common_styles.bar_text_wrapper}><Text style={Common_styles.top_bar_text}>ОБЩИЕ МЕТАЛЛЫ И СПЛАВЫ</Text></View>
                                <View style={Common_styles.bar_button_wrapper}><TouchableHighlight onPress={() => this.onPressDownload()}><Image style={Common_styles.top_bar_back_button} source={require("../../assets/icons/download_icon.png")}/></TouchableHighlight></View>
                            </View>
                        </ImageBackground>
                    </View>
                    <View style={Common_styles.comm_list_container}>
                        <CommonList navigation={this.props.navigation}/>
                    </View>
                    <View style={Common_styles.bottom_bar_container}>
                        <TouchableHighlight onPress={() => this.props.navigation.navigate('Map')}>
                            <Image style={{height:45, width: 45}} source={require('../../assets/icons/map-icon-map.png')}/>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={() => this.props.navigation.navigate('Calc')}>
                            <Image style={{height:45, width: 45}} source={require('../../assets/icons/calculator-icon-app.png')}/>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={() => this.props.navigation.navigate('Form')}>
                            <Image style={{height:45, width: 45}} source={require('../../assets/icons/mail-icon-app.png')}/>
                        </TouchableHighlight>
                    </View>
                </ImageBackground>
            </View>
        )
    }
}

const commonDB = new PouchDB('commondb');

class CommonList extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            arrowBottom: new Animated.Value(0),
            iconsBottom: new Animated.Value(-50),
            common_list:[],
            isConnected: true,
            net_err_message: ''
        }
    }
    componentDidMount() {
            this.getData();
    }
    async getData() {
        try {
            const data = await fetchList.fetchListData(AppUrls.common_collection);
            const filter_data =await filterData<MetalInterface>(data, 'group');
            await saveDataToPounchDB(commonDB, data);
            if (Platform.OS == "android") {
                let permission = await requestStorePermission();
                if (permission) {
                    await saveComMetImage(data);
                }
            }
            else {
                await saveComMetImage(data);
            }
            this.setState({common_list:filter_data});
        }
        catch (e) {
            commonDB.info().then(function(info) {
                return info.doc_count;

            }).then(count => {
                if (count>0) {
                    commonDB.allDocs({
                        include_docs: true
                    })
                    .then(result => {
                        return result.rows.map(row => row.doc);
                    })
                    .then((items) => {
                        let state_copy = {...this.state};
                        state_copy.isConnected = false;
                        state_copy.common_list = filterPounchData(items, 'group');
                        this.setState(state_copy);
                    })
                }
                else {
                    this.setState({net_err_message: 'ДЛЯ ПОЛУЧЕНИЯ КОРРЕКТНЫХ ДАННЫХ НЕОБХОДИМО ИНТЕРНЕТ ПОДКЛЮЧЕНИЕ'})
                }
            })
        }
    }
    onPressArrow=()=>{
        Animated.timing(this.state.arrowBottom, {
            toValue: 50,
            duration: 2000
        }).start();
        Animated.timing(this.state.iconsBottom, {
            toValue: 50,
            duration: 2000
        }).start()
    };

    renderPosition(item) {
        if(item.description_clear){
            return(
                <View style={Common_styles.list_image_wrapper}>
                  <TouchableHighlight style={Common_styles.list_image_wr} onPress={() => this.props.navigation.navigate("Detail", {...item})}><View style={Common_styles.list_image_wr}><ImageItem status={this.state.isConnected} item={item}/></View></TouchableHighlight>
                    <Image style={{position: "absolute", width:20, height:20, zIndex: 50, top: "70%", left: "70%"}} source={require('../../assets/icons/position-iron-icon.png')}/>
                </View>
                    )
        }
        else {
            return(
                <View style={Common_styles.list_image_wrapper}>
                   <View style={Common_styles.list_image_wr}><View style={Common_styles.list_image_wr}><ImageItem status={this.state.isConnected} item={item}/></View></View>
                </View>
                )
        }
    }

    _renderItem=({item})=>{
         return item.map((index, i)=>{
            return(
            <View key={i} style={Common_styles.list_item_wrapper}>
                    {this.renderPosition(index)}
                <View style={Common_styles.list_text_block_container}>
                    <View style={Common_styles.list_title_wrapper}>
                        <TouchableHighlight><Text style={Common_styles.list_title}>{index.title}</Text></TouchableHighlight>
                    </View>
                    <View style={Common_styles.price_wrapper}>
                        <Image style={Common_styles.list_price_icon} source={require("../../assets/icons/money_icon.png")}/>
                        <Text style={Common_styles.list_price_text}>{index.price}</Text>
                    </View>
                </View>
            </View>
            )
        })
    };
    showToast(net_fail){
        if(net_fail){
            Toast.showWithGravity(net_fail, Toast.LONG, Toast.CENTER)
        }
    }

    render() {
        const animateArrow = {bottom: this.state.arrowBottom};
        const animateIcons = {bottom: this.state.iconsBottom};
        if (this.state.common_list.length == 0){
            return (
                <View>
                    {this.showToast(this.state.net_err_message)}
                <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                    <ActivityIndicator />
                </View>
                </View>
            )
        }
        return (
            <View>
            <View style={Common_styles.list_container}>
                <FlatList
                    style={Common_styles.flatlist}
                    data={this.state.common_list}
                    showsVerticalScrollIndicator={false}
                    renderItem={this._renderItem}
                    keyExtractor={(item, index) => (index).toString()}

                />
            </View>
            </View>
        )
    }
}

class ImageItem extends Component {
    render(){
        const extension = (Platform.OS === 'android') ? 'file://' : '';
        const img_part =this.props.item.photo_amp_1.slice(12);
        const path = `${extension}${RNFS.DocumentDirectoryPath}${img_part}`;
        if(this.props.status) {
            return (
                <Image style={Common_styles.list_image} source={{uri:"https://www.vekomet.ru/"+this.props.item.photo_amp_1}}/>
            )
        }
        else {
            return (
                <Image style={Common_styles.list_image} source={{uri: path}}/> ?
                    <Image style={Common_styles.list_image} source={{uri: path}}/> :
                    <Image style={Common_styles.list_image} source={require("../../assets/common/blank_image.jpg")}/>
            )
        }
    }
}
