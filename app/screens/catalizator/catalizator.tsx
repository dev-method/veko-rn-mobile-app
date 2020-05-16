import React from 'react';
import {Component} from 'react';
import { NavigationScreenProp} from 'react-navigation';
import {Image, View, ScrollView, TouchableHighlight, Linking, Text, ImageBackground, Platform} from "react-native";
import { Catalizator_styles } from '../../config/styles/catalizator-style'
import Methods from './methods'
import PriceBlocks from './priceblocks'
import Laboratory from './laboratory'
import Regions from './regions'
import Advantages from './advantages'
import {AppUrls} from "../../config/env/urls";
import Toast from 'react-native-simple-toast';

interface Props {
    navigation: NavigationScreenProp<any, any>
}

interface State {
    showButton: boolean,
    err_network: boolean
}



export default class CatalizatorScreen extends Component<Props, State> {
    constructor(props: Props){
        super(props);
        this.state = {
            showButton: false,
            err_network: false
        }
    }
    checkStatus(status){
        if(status){
            const mess = "ДЛЯ ПОЛУЧЕНИЯ КОРРЕКТНЫХ ДАННЫХ НЕОБХОДИМО ИНТЕРНЕТ ПОДКЛЮЧЕНИЕ";
            Toast.showWithGravity(mess, Toast.LONG, Toast.CENTER)
        }
    }
    changeStatus(status){
         this.setState({err_network:status})
    }
    render() {
        return(
            <View style={{flex: 1}}>
                {this.state.showButton?<View style={{position: 'absolute', bottom: 100, left: 0, alignItems: 'flex-end', zIndex:10}}><Text>Закрыть</Text></View>:<View></View>}
                <View style={Catalizator_styles.top_bar_container}>
                <ImageBackground style={{width: '100%', height: '100%'}} source={require("../../assets/catalizator/catal-header-back.jpg")}>
                    <View style={Catalizator_styles.bar_wrapper}>
                        <View style={Catalizator_styles.bar_button_wrapper}><TouchableHighlight onPress={() => this.props.navigation.goBack()}><Image style={Catalizator_styles.bar_back_button} source={require("../../assets/icons/arow-icon.png")}/></TouchableHighlight></View>
                        <View style={Catalizator_styles.bar_logo_wrapper}><TouchableHighlight  onPress={ ()=> Linking.openURL(AppUrls.vekokat_link) } ><Image style={Catalizator_styles.bar_logo} source={require("../../assets/catalizator/vekokat_logo.png")}/></TouchableHighlight></View>
                        <View style={Catalizator_styles.bar_text_wrapper}><Text style={Catalizator_styles.bar_text}>КАТАЛИЗАТОРЫ</Text></View>
                    </View>
                </ImageBackground>
                </View>
                <View style={{flex: 4}}>
                <ScrollView>
                    <View style={Catalizator_styles.components_container}>
                       <View style={Catalizator_styles.disclaimer_wrapper}>
                           <Text style={Catalizator_styles.disclaimer}>Компания ООО ”ВекоКат”  одна из немногих фирм, занимающихся переработкой отработанных  катализаторов  с целью извлечения ценных металлов. Мы предлагаем нашим клиентам  выгодное  сотрудничество  - вы можете сдать катализатор и получить за это весомое вознаграждение.</Text>
                       </View>
                        {this.checkStatus(this.state.err_network)}
                       <PriceBlocks changeStatus={this.changeStatus.bind(this)} navigation={this.props.navigation}/>
                       <Advantages changeStatus={this.changeStatus.bind(this)}/>
                       <Methods changeStatus={this.changeStatus.bind(this)}/>
                       <Laboratory changeStatus={this.changeStatus.bind(this)}/>
                       <Regions changeStatus={this.changeStatus.bind(this)}/>
                    </View>
                </ScrollView>
                </View>
                <View style={Catalizator_styles.bottombar_container}>
                    <View style={Catalizator_styles.bottombar_icons_wrapper}>
                        <TouchableHighlight onPress={() => this.props.navigation.navigate("Map")}><Image style={{height:40, width: 40}} source={require('../../assets/icons/map-icon-map.png')}/></TouchableHighlight>
                        <TouchableHighlight onPress={() => this.props.navigation.navigate("Calc")}><Image style={{height:40, width: 40}} source={require('../../assets/icons/calculator-icon-app.png')}/></TouchableHighlight>
                        <TouchableHighlight onPress={() => this.props.navigation.navigate("Form")}><Image style={{height:40, width: 40}} source={require('../../assets/icons/mail-icon-app.png')}/></TouchableHighlight>
                    </View>
                </View>
            </View>
        )
    }
}