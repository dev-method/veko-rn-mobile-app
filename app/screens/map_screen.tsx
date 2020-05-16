import React, {Component} from "react";
import MapView, {Marker} from 'react-native-maps';
import {View, Dimensions, TouchableHighlight, Image, Text, Animated, UIManager, Platform, LayoutAnimation, Linking} from "react-native";
import { NavigationScreenProp} from 'react-navigation';
import { Map_styles } from '../config/styles/map-styles';
import {AppUrls} from "../config/env/urls";

if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}

interface Props {
    navigation: NavigationScreenProp<any,any>
}

const LATITUDE=55.7756462;
const LONGITUDE=38.4503282;
const LONGITUDEDELTA=0.009;
const LATITUDEDELTA=0.009;
const InitRegion={
    longitude:38.4503282,
    latitude: 55.7756462,
    latitudeDelta: 0.009,
    longitudeDelta: 0.009,
};

const markertext="ООО ВеКо";

export default class MapScreen extends Component<Props> {
    constructor(props: Props) {
        super(props);
        this.state = {
            displayBlock: false,
            myloc:{
                width: Dimensions.get('screen').width,
                height: Dimensions.get('screen').height,
                latitude: LATITUDE,
                longitude: LONGITUDE,
                latitudeDelta:LATITUDEDELTA,
                longitudeDelta:LONGITUDEDELTA
            },

        }
    }
    showBox(){
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        this.setState({displayBlock: true});
    }
    closeBox(){
        this.setState({displayBlock: false});
    }


    render() {
        return (
            <View style={{flex: 1}}>
            <View style={Map_styles.map_container}>
                <MapView
                    style={Map_styles.map}
                    mapType={"hybrid"}
                    initialRegion={InitRegion}
                    region={ this.state.myloc }
                    zoomEnabled={true}
                    showsTraffic={true}
                    zoomControlEnabled={true}
                >
                    <Marker
                        coordinate={{latitude: 55.775715,longitude:38.450641}}
                        title={markertext}
                    />
                </MapView>
            </View>
            {this.state.displayBlock? <View style={Map_styles.hidden_contact_box}>
                                          <Text style={{fontWeight: 'bold', textAlign: "center", fontSize: 20, marginBottom: 20, color: '#dbdad5'}}>КОНТАКТЫ:</Text>
                                          <Text style={{fontWeight: 'bold', fontSize: 16, marginBottom: 10, color: 'white' }}>г.Электросталь, ул.Пионерская д.22</Text>
                                          <View style={{flexDirection: 'row'}}>
                                              <Image style={{height:25, width: 25 }} source={require('../assets/map_screen/map_net_icon.png')}/>
                                              <TouchableHighlight onPress={ ()=> Linking.openURL(AppUrls.common_link) }>
                                                   <Text style={{fontWeight: 'bold', fontSize: 18, marginBottom: 5, marginLeft: 5, color: '#585858' }}>WWW.VEKOMET.RU</Text>
                                              </TouchableHighlight>
                                          </View>
                                          <Text style={{fontWeight: 'bold', fontSize: 16, marginBottom: 10, color: 'white'}}>Цветные, металлы и сплавы, редкоземельные металлы </Text>
                                          <View style={{flexDirection: 'row'}}>
                                                <Image style={{height:25, width: 25 }} source={require('../assets/map_screen/map_net_icon.png')}/>
                                                <TouchableHighlight onPress={ ()=> Linking.openURL(AppUrls.vekolom_link) }>
                                                    <Text style={{fontWeight: 'bold', fontSize: 18, marginBottom: 5, marginLeft: 5, color: '#585858'}}>WWW.VEKOLOM.RU</Text>
                                                </TouchableHighlight>
                                          </View>
                                          <Text style={{fontWeight: 'bold', fontSize: 16, marginBottom: 10, color: 'white' }}>Электронный лом</Text>
                                          <View style={{flexDirection: 'row'}}>
                                                <Image style={{height:20, width: 20 }} source={require('../assets/map_screen/map_mail_icon.png')}/>
                                                <TouchableHighlight onPress={ ()=> Linking.openURL('mailto:vekomet@gmail.com') }><Text style={{fontWeight: 'bold', fontSize: 16, marginBottom: 5, marginLeft: 5 }}>vekomet@gmail.com</Text></TouchableHighlight>
                                          </View>
                                          <View style={{flexDirection: 'row'}}>
                                                <Image style={{height:20, width: 20 }} source={require('../assets/map_screen/map_phone_icon.png')}/>
                                                <Text style={{fontWeight: 'bold', fontSize: 16, marginBottom: 10, marginLeft: 5 }}>8(499)499-84-74 | 8(917)599-52-22</Text>
                                          </View>
                                          <View style={{flexDirection: 'row'}}>
                                              <Image style={{height:25, width: 25 }} source={require('../assets/map_screen/map_net_icon.png')}/>
                                              <TouchableHighlight onPress={ ()=> Linking.openURL(AppUrls.vekokat_link) }>
                                                    <Text style={{fontWeight: 'bold', fontSize: 18, marginBottom: 5, marginLeft: 5, color: '#585858'}}>WWW.VEKOKAT.RU</Text>
                                              </TouchableHighlight>
                                          </View>
                                          <Text style={{fontWeight: 'bold', fontSize: 16, marginBottom: 10, color: 'white' }}>Прием автомобильных и промышленных катализаторов</Text>
                                          <View style={{flexDirection: 'row'}}>
                                              <Image style={{height:20, width: 20 }} source={require('../assets/map_screen/map_mail_icon.png')}/>
                                              <TouchableHighlight onPress={ ()=> Linking.openURL('mailto:vekokat@gmail.com') }><Text style={{fontWeight: 'bold', fontSize: 16, marginLeft: 5, marginBottom: 5 }}>vekokat@gmail.com</Text></TouchableHighlight>
                                          </View>
                                          <View style={{flexDirection: 'row'}}>
                                              <Image style={{height:20, width: 20 }} source={require('../assets/map_screen/map_phone_icon.png')}/>
                                              <Text style={{fontWeight: 'bold', fontSize: 16, marginBottom: 10, marginLeft: 5 }}>8(925)553-35-52 | 8(926)866-86-89</Text>
                                          </View>
                                          <View style={{width: '100%', justifyContent: "center", alignItems: 'center', marginTop: 10}}><TouchableHighlight onPress={()=>this.closeBox()}><Image style={{height:35, width: 35 }} source={require('../assets/map_screen/map_arrow_close.png')}/></TouchableHighlight></View>
                                      </View>:
                                      <View style={Map_styles.contact_box}>
                                          <Text style={{color: "white", fontWeight: "bold", textAlign: "center", fontSize: 16}}>г. Электросталь, ул. Пионерская д.22</Text>
                                          <Text style={{color: "white", fontWeight: "bold", textAlign: "center", fontSize: 16, marginTop: 10}}>КОНТАКТЫ ПОДРОБНЕЕ</Text>
                                          <View style={{width: '100%', justifyContent: "center", alignItems: 'center', marginTop: 10}}><TouchableHighlight onPress={()=>this.showBox()}><Image style={{height:35, width: 35 }} source={require('../assets/map_screen/map_arrow_open.png')}/></TouchableHighlight></View>
                                      </View>
            }
            <View style={Map_styles.bottom_bar_container}>

            <TouchableHighlight onPress={() => this.props.navigation.goBack(null)}>
                  <Image style={{height:45, width: 45}} source={require('../assets/icons/home_icon.png')}/>
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

