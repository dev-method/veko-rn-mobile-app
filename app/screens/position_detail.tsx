import React from 'react';
import {Component} from 'react';
import { NavigationScreenProp} from 'react-navigation';
import { Com_detail_styles } from '../config/styles/common-detail-styles'
import HTMLView from 'react-native-htmlview';
import {
    Text,
    View,
    Image,
    ImageBackground,
    ScrollView,
    TouchableHighlight,
    Linking,
    Platform,
    StyleSheet
} from 'react-native';
import {AppUrls} from "../config/env/urls";
var RNFS = require('react-native-fs');

interface Props {
    navigation: NavigationScreenProp<any,any>
}
const styles = StyleSheet.create({
    p: { fontSize: 19, fontWeight: "bold"},
    h4:{fontSize: 20, fontWeight:'bold', color: "#B0C1CD"},
    h3:{fontSize: 21, fontWeight:'bold', color: "#B0C1CD"},
    h2:{fontSize: 22, fontWeight:'bold', color: "#B0C1CD"},
    h1:{fontSize: 23, fontWeight:'bold', color: "#B0C1CD"},
    a:{textDecorationLine:'none'}
});

export default class CommonDetail extends Component<Props> {
    render() {
        const { navigation } = this.props;
        const title = navigation.getParam('title');
        const price = navigation.getParam('price');
        const description = navigation.getParam('description_clear');
        const photo = navigation.getParam('photo_amp_1');
        const extension = (Platform.OS === 'android') ? 'file://' : '';
        const img_part =photo.slice(12);
        const path = `${extension}${RNFS.DocumentDirectoryPath}${img_part}`;
        return (
            <View style={{flex: 1}}>
                <View style={Com_detail_styles.image_container}>
                    <ImageBackground style={{width: '100%', height: '100%'}} source={{uri: path}}>
                        <View style={Com_detail_styles.image_text_wrapper}>
                            <Text style={Com_detail_styles.image_text}>{title}</Text>
                        </View>
                    </ImageBackground>
                </View>
                <View style={Com_detail_styles.image_bottom_container}>
                    <View style={Com_detail_styles.bottom_title_wrapper}>
                        <Text style={Com_detail_styles.bottom_title}>Цена</Text>
                    </View>
                    <View style={Com_detail_styles.bottom_price_wrapper}>
                        <Text style={Com_detail_styles.bottom_price}>{price}</Text>
                    </View>
                </View>
                <TouchableHighlight style={{zIndex: 100}} onPress={ ()=> Linking.openURL(AppUrls.common_link) } ><Image style={Com_detail_styles.image_logo} source={require("../assets/common_screen/logo-veko-app.png")}/></TouchableHighlight>
                <View style={Com_detail_styles.detail_text_wrapper}>
                    <ScrollView>
                        {description?<HTMLView addLineBreaks={false} value={ description } stylesheet={styles}/>:<Text>Здесь пока нет никакой информации</Text>}
                    </ScrollView>
                </View>
                <View style={{flex: 0.6, flexDirection: "row", justifyContent: "space-around", alignItems: "center", backgroundColor: "#C4C4C4"}}>
                    <TouchableHighlight onPress={() => this.props.navigation.goBack(null)}>
                        <Image style={{height:45, width: 49}} source={require('../assets/icons/arow-icon.png')}/>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => this.props.navigation.navigate('Calc')}>
                        <Image style={{height:45, width: 45}} source={require('../assets/icons/calculator-icon-app.png')}/>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => this.props.navigation.navigate('Form')}>
                        <Image style={{height:45, width: 45}} source={require('../assets/icons/mail-icon-app.png')}/>
                    </TouchableHighlight>
                </View>
            </View>
        )
    }
}