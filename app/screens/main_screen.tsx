import React from 'react';
import {Component} from 'react';
import { Main_styles } from '../config/styles/main_styles'
import { NavigationScreenProp } from 'react-navigation';
import { View, ImageBackground, Image, TouchableHighlight, Text } from 'react-native';


interface Props {
    navigation: NavigationScreenProp<any, any>;
}


export default class MainScreen extends Component<Props> {
    render() {
        return (
            <View>
                <ImageBackground style={Main_styles.back_image} source={require('../assets/main_screen/back-mobile-app.jpg')}>
                   <View style={Main_styles.logo_wrapper}>
                       <Image source={require('../assets/main_screen/main_icon.png')}/>
                   </View>
                   <View style={Main_styles.menu_container}>
                       <TouchableHighlight onPress={() => this.props.navigation.navigate("Common")}>
                       <View style={Main_styles.menu_button}>
                           <Text style={Main_styles.button_text}>ОБЩИЕ МЕТАЛЛЫ И СПЛАВЫ</Text>
                       </View>
                       </TouchableHighlight>
                       <TouchableHighlight onPress={() => this.props.navigation.navigate('Rare')}>
                           <View style={Main_styles.menu_button}>
                               <Text style={Main_styles.button_text}>РЕДКОЗЕМЕЛЬНЫЕ МЕТАЛЛЫ</Text>
                           </View>
                       </TouchableHighlight>
                       <TouchableHighlight onPress={() => this.props.navigation.navigate('Electro')}>
                           <View style={Main_styles.menu_button}>
                               <Text style={Main_styles.button_text}>ЭЛЕКТРОННЫЙ ЛОМ</Text>
                               <Image style={{position: 'absolute', width: 35, height: 35, top: '65%', left: '-5%'}} source={require('../assets/main_screen/cash_icon_white.png')}/>
                           </View>
                       </TouchableHighlight>
                       <TouchableHighlight onPress={() => this.props.navigation.navigate('Catalizator')}>
                           <View style={Main_styles.menu_button}>
                               <Text style={Main_styles.button_text}>КАТАЛИЗАТОРЫ</Text>
                               <Image style={{position: 'absolute', width: 35, height: 35, top: '65%', left: '-5%'}} source={require('../assets/main_screen/cash_icon_white.png')}/>
                           </View>
                       </TouchableHighlight>
                   </View>
                   <View style={Main_styles.bottom_menu_wr}>
                       <View style={Main_styles.bottom_icons_wr}>
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
                   </View>
                </ImageBackground>
            </View>
        )
    }
}

