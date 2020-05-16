import React from 'react';
import {Component} from 'react';
import { Calc_styles } from '../config/styles/calculator-styles'
import { CalcData } from "../config/data/calculator-data";
import { NavigationScreenProp} from 'react-navigation';
import { calcCatalogInterface } from "../config/interfaces/calculatorInterfaces";
import {
    Image,
    View,
    Text,
    ScrollView,
    Picker,
    TouchableHighlight,
    TextInput,
    KeyboardAvoidingView,
    ImageBackground,
    UIManager, Platform, LayoutAnimation,
} from "react-native";
import LinearGradient from 'react-native-linear-gradient';

if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}

interface Props {
    navigation: NavigationScreenProp<any, any>
}

interface State {
    calc_data:calcCatalogInterface[]
    active: calcCatalogInterface,
    selectvalue: number,
    active_mark: string,
    activeprofile: number,
    d: string,
    n: string,
    h: string,
    k: string,
    l: string,
    s: string,
    result: string

}

export default class Calculator extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            calc_data: CalcData,
            active: CalcData[0],
            selectvalue: CalcData[0].group[0].density,
            active_mark: CalcData[0].group[0].name,
            activeprofile: 1,
            d: "0",
            n: "0",
            h: "0",
            k: "0",
            l: "0",
            s: "0",
            result: ""
        }
    }
    handleMaterialChange(id) {
        for (let item in CalcData){
            if (CalcData[item].id==id) {
                let state_copy = {...this.state};
                state_copy.active = CalcData[item];
                state_copy.selectvalue = CalcData[item].group[0].density;
                this.setState(state_copy)
            }
        }
    }
    handleProfileClick(item){
        let state_copy = {...this.state};
        state_copy.d= '0';
        state_copy.n= '0';
        state_copy.h= '0';
        state_copy.k= '0';
        state_copy.l= '0';
        state_copy.s= '0';
        state_copy.activeprofile= item;
        this.setState(state_copy)
    }
    handleOnBlurN(value){
        if (!value) {
            this.setState({n:"0"})
        }
    }

    handleOnFocusN(value) {
        if (Number(value.charAt(0))== 0) {
            this.setState({n:""})
        }

    }

    handleOnBlurH(value){
        if (!value) {
            this.setState({h:"0"})
        }
    }

    handleOnFocusH(value) {
        if (Number(value.charAt(0))== 0) {
            this.setState({h:""})
        }

    }

    handleOnBlurL(value){
        if (!value) {
            this.setState({l:"0"})
        }
    }

    handleOnFocusL(value) {
        if (Number(value.charAt(0))== 0) {
            this.setState({l:""})
        }

    }

    handleOnFocusS(value) {
        if (Number(value.charAt(0))== 0) {
            this.setState({s:""})
        }

    }

    handleOnBlurS(value){
        if (!value) {
            this.setState({s:"0"})
        }
    }
    handleOnBlurK(value){
        if (!value) {
            this.setState({k:"0"})
        }
    }
    handleOnFocusK(value) {
        if (Number(value.charAt(0))== 0) {
            this.setState({k:""})
        }

    }

    handleOnBlurD(value) {
        if (!value) {
            this.setState({d:"0"})
        }
    }
    handleOnFocusD(value) {
        if (Number(value.charAt(0))== 0) {
            this.setState({d:""})
        }

    }
    renderTopResult() {
        if (this.state.result == "NaN" || this.state.result == "0.00" || this.state.result == ""){
            return (
                <View></View>
            )
        }
        else {
            return (

                <View><Text style={Calc_styles.weight_top_text}>ВЕС ОБРАЗЦА:  {this.state.result}  КГ</Text></View>
            )

        }
    }
    renderBottomResult() {
        if (this.state.result == "NaN" || this.state.result == "0.00" || this.state.result == ""){
            return (
                <View></View>
            )
        }
        else {
            return (

                <View>
                    <Text style={Calc_styles.weight_bottom_text}>МАТЕРИАЛ:  {this.state.active.name}</Text>
                    <Text style={Calc_styles.weight_bottom_text}>МАРКА:  {this.state.active_mark}</Text>
                    <Text style={Calc_styles.weight_bottom_text}>ВЕС ОБРАЗЦА:  {this.state.result}  КГ</Text>
                </View>
            )

        }
    }
    handleMarkChange(event, index) {
        let state_copy = {...this.state};
        state_copy.selectvalue = this.state.active.group[index].density;
        state_copy.active_mark = this.state.active.group[index].name;
        this.setState(state_copy);
    }

    handleCalculate(profile){
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        switch (profile) {
            case 1:{
                const d=Number(this.state.d);
                const n=Number(this.state.n);
                const V=(3.14*((d*d)/4)*n)/1000000000;
                const dens=Number(this.state.selectvalue);
                const M=(V*dens).toFixed(2);
                return this.setState({result:M})
            }
            case 2:{
                const h=Number(this.state.h);
                const n=Number(this.state.n);
                const V=(h*h*n)/1000000000;
                const dens=Number(this.state.selectvalue);
                const M=(V*dens).toFixed(2);
                return this.setState({result:M})
            }
            case 3:{
                const h=Number(this.state.h);
                const k=Number(this.state.k);
                const l=Number(this.state.l);
                const V=(h*k*l)/1000000000;
                const dens=Number(this.state.selectvalue);
                const M=(V*dens).toFixed(2);
                return this.setState({result:M})
            }
            case 4:{
                const d=Number(this.state.d);
                const k=Number(this.state.k);
                const n=Number(this.state.n);
                const V=(3.14*n*k*(d+k))/1000000000;
                const dens=Number(this.state.selectvalue);
                const M=(V*dens).toFixed(2);
                return this.setState({result:M})
            }
            case 5:{
                const h=Number(this.state.h);
                const l=Number(this.state.l);
                const k=Number(this.state.k);
                const n=Number(this.state.n);
                const V=((h*l*n)-((h-2*k)*(l-2*k)*n))/1000000000;
                const dens=Number(this.state.selectvalue);
                const M=(V*dens).toFixed(2);
                return this.setState({result:M})
            }
            case 6:{
                const h=Number(this.state.h);
                const l=Number(this.state.l);
                const k=Number(this.state.k);
                const n=Number(this.state.n);
                const V=((h*l*n)-((h-2*k)*(l-k)*n))/1000000000;
                const dens=Number(this.state.selectvalue);
                const M=(V*dens).toFixed(2);
                return this.setState({result:M})
            }
            case 7:{
                const h=Number(this.state.h);
                const n=Number(this.state.n);
                const V=(((3*1.7320508)/2)*h*h*n)/1000000000;
                const dens=Number(this.state.selectvalue);
                const M=(V*dens).toFixed(2);
                return this.setState({result:M})
            }
            case 8:{
                const h=Number(this.state.h);
                const l=Number(this.state.l);
                const k=Number(this.state.k);
                const s=Number(this.state.s);
                const n=Number(this.state.n);
                const V=((h*l*n)-((h-2*k)*(l-s)*n))/1000000000;
                const dens=Number(this.state.selectvalue);
                const M=(V*dens).toFixed(2);
                return this.setState({result:M})
            }
            case 9:{
                const h=Number(this.state.h);
                const l=Number(this.state.l);
                const k=Number(this.state.k);
                const n=Number(this.state.n);
                const V=((h*l*n)-((h-k)*(l-k)*n))/1000000000;
                const dens=Number(this.state.selectvalue);
                const M=(V*dens).toFixed(2);
                return this.setState({result:M})
            }
        }

    };
    render() {
        const default_item=this.state.calc_data[0];
        return (
            <View style={Calc_styles.calc_main_container}>
                <View style={Calc_styles.calc_topbar_container}>
                    <View style={Calc_styles.topbar_arrow_wrapper}>
                        <TouchableHighlight onPress={() => this.props.navigation.goBack()}><Image style={{height:40, width: 43}} source={require('../assets/icons/arow-icon.png')}/></TouchableHighlight>
                    </View>
                    <View style={Calc_styles.topbar_icons_wrapper}>
                        <TouchableHighlight onPress={() => this.props.navigation.navigate("Main")}><Image style={{height:40, width: 40}} source={require('../assets/icons/home_icon.png')}/></TouchableHighlight>
                        <TouchableHighlight onPress={() => this.props.navigation.navigate("Map")}><Image style={{height:40, width: 40}} source={require('../assets/icons/map-icon-map.png')}/></TouchableHighlight>
                        <TouchableHighlight onPress={() => this.props.navigation.navigate("Form")}><Image style={{height:40, width: 40}} source={require('../assets/icons/mail-icon-app.png')}/></TouchableHighlight>
                    </View>
                </View>

                <ScrollView>
                <ImageBackground style={{width: '100%', height: '100%'}} source={require("../assets/calc_images/calc-back.png")}>
                <View style={{paddingBottom: 50}}>
                <LinearGradient colors={['#c6d8e4', '#78abcb', '#6398b9']} style={Calc_styles.calc_display_container}>
                    <View style={Calc_styles.display_title_wrapper}>
                        <Text style={Calc_styles.display_title}>КАЛЬКУЛЯТОР МЕТАЛЛА</Text>
                    </View>
                    <View style={Calc_styles.display_draw_wrapper}>
                        {(() => {
                            switch (this.state.activeprofile) {
                                case 1:  return <Image style={{height: 200, width: 200}} source={require('../assets/calc_images/calc-img-profiles/circle_600.png')}/>;
                                case 2:  return <Image style={{height: 200, width: 200}} source={require('../assets/calc_images/calc-img-profiles/square_600.png')}/>;
                                case 3:  return <Image style={{height: 200, width: 200}} source={require('../assets/calc_images/calc-img-profiles/plate_600.png')}/>;
                                case 4:  return <Image style={{height: 200, width: 200}} source={require('../assets/calc_images/calc-img-profiles/profile_tube_600.png')}/>;
                                case 5:  return <Image style={{height: 200, width: 200}} source={require('../assets/calc_images/calc-img-profiles/profile_square_600.png')}/>;
                                case 6:  return <Image style={{height: 200, width: 200}} source={require('../assets/calc_images/calc-img-profiles/channel_600.png')}/>;
                                case 7:  return <Image style={{height: 200, width: 200}} source={require('../assets/calc_images/calc-img-profiles/hexahedron_600.png')}/>;
                                case 8:  return <Image style={{height: 200, width: 200}} source={require('../assets/calc_images/calc-img-profiles/bend_600.png')}/>;
                                case 9:  return <Image style={{height: 200, width: 200}} source={require('../assets/calc_images/calc-img-profiles/corner_600.png')}/>;
                            }
                        })()}
                    </View>
                    <View style={Calc_styles.top_display_weight_wrapper}>
                        {this.renderTopResult()}
                    </View>
                </LinearGradient>
                <View style={Calc_styles.calc_profiles_container}>
                    {this.state.active.profile.map((item, i)=>{
                        if(item==1){
                            return <TouchableHighlight style={[this.state.activeprofile == 1? Calc_styles.profileimage_wr_active : Calc_styles.profileimage_wr]}  key={i} onPress={this.handleProfileClick.bind(this,item)}><Image style={Calc_styles.profileimage} key={i} source={require('../assets/calc_images/calc-img-icon/circle_icon_200.png')}/></TouchableHighlight>
                        }
                        else if(item==2){
                            return <TouchableHighlight style={[this.state.activeprofile == 2? Calc_styles.profileimage_wr_active : Calc_styles.profileimage_wr]} key={i} onPress={this.handleProfileClick.bind(this,item)}><Image style={Calc_styles.profileimage} key={i} source={require('../assets/calc_images/calc-img-icon/square_icon_200.png')}/></TouchableHighlight>
                        }
                        else if(item==3){
                            return <TouchableHighlight style={[this.state.activeprofile == 3? Calc_styles.profileimage_wr_active : Calc_styles.profileimage_wr]} key={i} onPress={this.handleProfileClick.bind(this,item)}><Image style={Calc_styles.profileimage} key={i} source={require('../assets/calc_images/calc-img-icon/plate_icon_200.png')}/></TouchableHighlight>
                        }
                        else if(item==4){
                            return <TouchableHighlight style={[this.state.activeprofile == 4? Calc_styles.profileimage_wr_active : Calc_styles.profileimage_wr]} key={i} onPress={this.handleProfileClick.bind(this,item)}><Image style={Calc_styles.profileimage} key={i} source={require('../assets/calc_images/calc-img-icon/profile_tube_icon_200.png')}/></TouchableHighlight>
                        }
                        else if(item==5){
                            return <TouchableHighlight style={[this.state.activeprofile == 5? Calc_styles.profileimage_wr_active : Calc_styles.profileimage_wr]} key={i} onPress={this.handleProfileClick.bind(this,item)}><Image style={Calc_styles.profileimage} key={i} source={require('../assets/calc_images/calc-img-icon/profile_square_icon_200.png')}/></TouchableHighlight>
                        }
                        else if(item==6){
                            return <TouchableHighlight style={[this.state.activeprofile == 6? Calc_styles.profileimage_wr_active : Calc_styles.profileimage_wr]} key={i} onPress={this.handleProfileClick.bind(this,item)}><Image style={Calc_styles.profileimage} key={i} source={require('../assets/calc_images/calc-img-icon/channel_icon_200.png')}/></TouchableHighlight>
                        }
                        else if(item==7){
                            return <TouchableHighlight style={[this.state.activeprofile == 7? Calc_styles.profileimage_wr_active : Calc_styles.profileimage_wr]} key={i} onPress={this.handleProfileClick.bind(this,item)}><Image style={Calc_styles.profileimage} key={i} source={require('../assets/calc_images/calc-img-icon/hexahedron_icon_200.png')}/></TouchableHighlight>
                        }
                        else if(item==8){
                            return <TouchableHighlight style={[this.state.activeprofile == 8? Calc_styles.profileimage_wr_active : Calc_styles.profileimage_wr]} key={i} onPress={this.handleProfileClick.bind(this,item)}><Image style={Calc_styles.profileimage} key={i} source={require('../assets/calc_images/calc-img-icon/bend_icon_200.png')}/></TouchableHighlight>
                        }
                        else if(item==9){
                            return <TouchableHighlight style={[this.state.activeprofile == 9? Calc_styles.profileimage_wr_active : Calc_styles.profileimage_wr]} key={i} onPress={this.handleProfileClick.bind(this,item)}><Image style={Calc_styles.profileimage} key={i} source={require('../assets/calc_images/calc-img-icon/corner_icon_200.png')}/></TouchableHighlight>
                        }
                    })}
                </View>
                <View style={Calc_styles.calc_workarea_container}>
                        <View style={Calc_styles.material_change_wrapper}>
                            <View style={Calc_styles.select_material_wr}>
                                <Text style={Calc_styles.material_change_title}>МАТЕРИАЛ</Text>
                                <View style={{flexDirection: 'row'}}>
                                    <View style={{flex: 1, paddingTop: 10, paddingLeft: 10 }}><Image style={{ height: 30, width: 25}} source={require('../assets/icons/tap_icon.png')}/></View>
                                    <View style={{flex: 7}}>
                                        <Picker style={Calc_styles.calculator_picker} itemStyle={Calc_styles.calculator_picker_item} selectedValue={this.state.active.id} onValueChange={this.handleMaterialChange.bind(this)}>
                                            {this.state.calc_data.map((item, i)=>{
                                                return <Picker.Item  key={i} value={item.id} label={item.name} />
                                            })}
                                        </Picker>
                                    </View>
                                </View>
                            </View>
                            <View style={Calc_styles.select_type_wr}>
                                <Text style={Calc_styles.material_change_title}>МАРКА</Text>
                                <View style={{flexDirection: 'row'}}>
                                <View style={{flex: 1, paddingTop: 10, paddingLeft: 10 }}><Image style={{ height: 30, width: 25}} source={require('../assets/icons/tap_icon.png')}/></View>
                                <View style={{flex: 7}}>
                                   <Picker style={Calc_styles.calculator_picker} itemStyle={Calc_styles.calculator_picker_item} selectedValue={this.state.active_mark} onValueChange={this.handleMarkChange.bind(this)}>
                                       {this.state.active.group.map((index, i)=>{
                                           return <Picker.Item key={i} value={index.name} label={index.name} />
                                       })}
                                   </Picker>
                                </View>
                                </View>
                            </View>
                        </View>
                        <Text style={Calc_styles.material_change_title}>РАЗМЕРЫ</Text>
                        <View style={Calc_styles.dimensions_change_wrapper}>
                            {(() => {
                                switch (this.state.activeprofile) {
                                    case 1:  return (<KeyboardAvoidingView behavior="padding" enabled style={Calc_styles.inputscontainer}>
                                        <View style={Calc_styles.inputtitle}><Text style={Calc_styles.inputtitle_text}>Диаметр, d(мм):</Text></View>
                                        <View style={Calc_styles.inputwrapper}><TextInput keyboardType='numeric' style={Calc_styles.text_input} onFocus={this.handleOnFocusD.bind(this, this.state.d)} onBlur={this.handleOnBlurD.bind(this, this.state.d)}  key="d" value={this.state.d} onChangeText={(value) => this.setState({d:value})}/></View>
                                        <View style={Calc_styles.inputtitle}><Text style={Calc_styles.inputtitle_text}>Длина, мм:</Text></View>
                                        <View style={Calc_styles.inputwrapper}><TextInput keyboardType='numeric' style={Calc_styles.text_input} onFocus={this.handleOnFocusN.bind(this, this.state.n)} onBlur={this.handleOnBlurN.bind(this,this.state.n)}  value={this.state.n} onChangeText={(value) => this.setState({n:value})}/></View>
                                    </KeyboardAvoidingView>);
                                    case 2:  return (<KeyboardAvoidingView behavior="padding" style={Calc_styles.inputscontainer}>
                                        <View style={Calc_styles.inputtitle}><Text style={Calc_styles.inputtitle_text}>Ширина, h(мм):</Text></View>
                                        <View style={Calc_styles.inputwrapper}><TextInput keyboardType='numeric' style={Calc_styles.text_input} onFocus={this.handleOnFocusH.bind(this, this.state.h)} onBlur={this.handleOnBlurH.bind(this,this.state.h)} value={this.state.h} onChangeText={(value) => this.setState({h:value})}/></View>
                                        <View style={Calc_styles.inputtitle}><Text style={Calc_styles.inputtitle_text}>Длина, мм:</Text></View>
                                        <View style={Calc_styles.inputwrapper}><TextInput keyboardType='numeric' style={Calc_styles.text_input} onFocus={this.handleOnFocusN.bind(this, this.state.n)} onBlur={this.handleOnBlurN.bind(this,this.state.n)} value={this.state.n} onChangeText={(value) => this.setState({n:value})}/></View>
                                    </KeyboardAvoidingView>);
                                    case 3:  return (<KeyboardAvoidingView behavior="padding" style={Calc_styles.inputscontainer}>
                                        <View style={Calc_styles.inputtitle}><Text style={Calc_styles.inputtitle_text}>Ширина, h(мм):</Text></View>
                                        <View style={Calc_styles.inputwrapper}><TextInput keyboardType='numeric' style={Calc_styles.text_input} onFocus={this.handleOnFocusH.bind(this, this.state.h)} onBlur={this.handleOnBlurH.bind(this,this.state.h)} value={this.state.h} onChangeText={(value) => this.setState({h:value})}/></View>
                                        <View style={Calc_styles.inputtitle}><Text style={Calc_styles.inputtitle_text}>Длина, l(мм):</Text></View>
                                        <View style={Calc_styles.inputwrapper}><TextInput keyboardType='numeric' style={Calc_styles.text_input} onFocus={this.handleOnFocusL.bind(this, this.state.l)} onBlur={this.handleOnBlurL.bind(this,this.state.l)} value={this.state.l} onChangeText={(value) => this.setState({l:value})}/></View>
                                        <View style={Calc_styles.inputtitle}><Text style={Calc_styles.inputtitle_text}>Толщина,мм:</Text></View>
                                        <View style={Calc_styles.inputwrapper}><TextInput keyboardType='numeric' style={Calc_styles.text_input} onFocus={this.handleOnFocusK.bind(this, this.state.k)} onBlur={this.handleOnBlurK.bind(this,this.state.k)}  value={this.state.k} onChangeText={(value) => this.setState({k:value})}/></View>
                                    </KeyboardAvoidingView>);
                                    case 4:  return (<KeyboardAvoidingView behavior="padding" style={Calc_styles.inputscontainer}>
                                        <View style={Calc_styles.inputtitle}><Text style={Calc_styles.inputtitle_text}>Диаметр, d(мм):</Text></View>
                                        <View style={Calc_styles.inputwrapper}><TextInput keyboardType='numeric' style={Calc_styles.text_input} onFocus={this.handleOnFocusD.bind(this, this.state.d)} onBlur={this.handleOnBlurD.bind(this,this.state.d)} value={this.state.d} onChangeText={(value) => this.setState({d:value})}/></View>
                                        <View style={Calc_styles.inputtitle}><Text style={Calc_styles.inputtitle_text}>Толщина, k(мм):</Text></View>
                                        <View style={Calc_styles.inputwrapper}><TextInput keyboardType='numeric' style={Calc_styles.text_input} onFocus={this.handleOnFocusK.bind(this, this.state.k)} onBlur={this.handleOnBlurK.bind(this,this.state.k)} value={this.state.k} onChangeText={(value) => this.setState({k:value})}/></View>
                                        <View style={Calc_styles.inputtitle}><Text style={Calc_styles.inputtitle_text}>Длина, мм:</Text></View>
                                        <View style={Calc_styles.inputwrapper}><TextInput keyboardType='numeric' style={Calc_styles.text_input} onFocus={this.handleOnFocusN.bind(this, this.state.n)} onBlur={this.handleOnBlurN.bind(this,this.state.n)} value={this.state.n} onChangeText={(value) => this.setState({n:value})}/></View>
                                    </KeyboardAvoidingView>);
                                    case 5:  return (<KeyboardAvoidingView behavior="padding" style={Calc_styles.inputscontainer}>
                                        <View style={Calc_styles.inputtitle}><Text style={Calc_styles.inputtitle_text}>Размер стороны, h(мм):</Text></View>
                                        <View style={Calc_styles.inputwrapper}><TextInput keyboardType='numeric' style={Calc_styles.text_input} onFocus={this.handleOnFocusH.bind(this, this.state.h)} onBlur={this.handleOnBlurH.bind(this,this.state.h)} value={this.state.h} onChangeText={(value) => this.setState({h:value})}/></View>
                                        <View style={Calc_styles.inputtitle}><Text style={Calc_styles.inputtitle_text}>Размер стороны, l(мм):</Text></View>
                                        <View style={Calc_styles.inputwrapper}><TextInput keyboardType='numeric' style={Calc_styles.text_input} onFocus={this.handleOnFocusL.bind(this, this.state.l)} onBlur={this.handleOnBlurL.bind(this,this.state.l)} value={this.state.l} onChangeText={(value) => this.setState({l:value})}/></View>
                                        <View style={Calc_styles.inputtitle}><Text style={Calc_styles.inputtitle_text}>Толщина, k(мм):</Text></View>
                                        <View style={Calc_styles.inputwrapper}><TextInput keyboardType='numeric' style={Calc_styles.text_input} onFocus={this.handleOnFocusK.bind(this, this.state.k)} onBlur={this.handleOnBlurK.bind(this,this.state.k)} value={this.state.k} onChangeText={(value) => this.setState({k:value})}/></View>
                                        <View style={Calc_styles.inputtitle}><Text style={Calc_styles.inputtitle_text}>Длина, мм:</Text></View>
                                        <View style={Calc_styles.inputwrapper}><TextInput keyboardType='numeric' style={Calc_styles.text_input} onFocus={this.handleOnFocusN.bind(this, this.state.n)} onBlur={this.handleOnBlurN.bind(this,this.state.n)} value={this.state.n} onChangeText={(value) => this.setState({n:value})}/></View>
                                    </KeyboardAvoidingView>);
                                    case 6:  return (<KeyboardAvoidingView behavior="padding" style={Calc_styles.inputscontainer}>
                                        <View style={Calc_styles.inputtitle}><Text style={Calc_styles.inputtitle_text}>Высота, h(мм):</Text></View>
                                        <View style={Calc_styles.inputwrapper}><TextInput keyboardType='numeric' style={Calc_styles.text_input} onFocus={this.handleOnFocusH.bind(this, this.state.h)} onBlur={this.handleOnBlurH.bind(this,this.state.h)} value={this.state.h} onChangeText={(value) => this.setState({h:value})}/></View>
                                        <View style={Calc_styles.inputtitle}><Text style={Calc_styles.inputtitle_text}>Ширина, l(мм):</Text></View>
                                        <View style={Calc_styles.inputwrapper}><TextInput keyboardType='numeric' style={Calc_styles.text_input} onFocus={this.handleOnFocusL.bind(this, this.state.l)} onBlur={this.handleOnBlurL.bind(this,this.state.l)} value={this.state.l} onChangeText={(value) => this.setState({l:value})}/></View>
                                        <View style={Calc_styles.inputtitle}><Text style={Calc_styles.inputtitle_text}>Толщина, k(мм):</Text></View>
                                        <View style={Calc_styles.inputwrapper}><TextInput keyboardType='numeric' style={Calc_styles.text_input} onFocus={this.handleOnFocusK.bind(this, this.state.k)} onBlur={this.handleOnBlurK.bind(this,this.state.k)} value={this.state.k} onChangeText={(value) => this.setState({k:value})}/></View>
                                        <View style={Calc_styles.inputtitle}><Text style={Calc_styles.inputtitle_text}>Длина, мм:</Text></View>
                                        <View style={Calc_styles.inputwrapper}><TextInput keyboardType='numeric' style={Calc_styles.text_input} onFocus={this.handleOnFocusN.bind(this, this.state.n)} onBlur={this.handleOnBlurN.bind(this,this.state.n)} value={this.state.n} onChangeText={(value) => this.setState({n:value})}/></View>
                                    </KeyboardAvoidingView>);
                                    case 7:  return (<KeyboardAvoidingView behavior="padding" style={Calc_styles.inputscontainer}>
                                        <View style={Calc_styles.inputtitle}><Text style={Calc_styles.inputtitle_text}>Размер грани, h(мм):</Text></View>
                                        <View style={Calc_styles.inputwrapper}><TextInput keyboardType='numeric' style={Calc_styles.text_input} onFocus={this.handleOnFocusH.bind(this, this.state.h)} onBlur={this.handleOnBlurH.bind(this,this.state.h)} value={this.state.h} onChangeText={(value) => this.setState({h:value})}/></View>
                                        <View style={Calc_styles.inputtitle}><Text style={Calc_styles.inputtitle_text}>Длина, n(мм):</Text></View>
                                        <View style={Calc_styles.inputwrapper}><TextInput keyboardType='numeric' style={Calc_styles.text_input} onFocus={this.handleOnFocusN.bind(this, this.state.n)} onBlur={this.handleOnBlurN.bind(this,this.state.n)} value={this.state.n} onChangeText={(value) => this.setState({n:value})}/></View>
                                    </KeyboardAvoidingView>);
                                    case 8:  return (<KeyboardAvoidingView behavior="padding"style={Calc_styles.inputscontainer}>
                                        <View style={Calc_styles.inputtitle}><Text style={Calc_styles.inputtitle_text}>Высота, h(мм):</Text></View>
                                        <View style={Calc_styles.inputwrapper}><TextInput keyboardType='numeric' style={Calc_styles.text_input} onFocus={this.handleOnFocusH.bind(this, this.state.h)} onBlur={this.handleOnBlurH.bind(this,this.state.h)} value={this.state.h} onChangeText={(value) => this.setState({h:value})}/></View>
                                        <View style={Calc_styles.inputtitle}><Text style={Calc_styles.inputtitle_text}>Ширина, l(мм):</Text></View>
                                        <View style={Calc_styles.inputwrapper}><TextInput keyboardType='numeric' style={Calc_styles.text_input} onFocus={this.handleOnFocusL.bind(this, this.state.l)} onBlur={this.handleOnBlurL.bind(this,this.state.l)} value={this.state.l} onChangeText={(value) => this.setState({l:value})}/></View>
                                        <View style={Calc_styles.inputtitle}><Text style={Calc_styles.inputtitle_text}>Толщина, k(мм):</Text></View>
                                        <View style={Calc_styles.inputwrapper}><TextInput keyboardType='numeric' style={Calc_styles.text_input} onFocus={this.handleOnFocusK.bind(this, this.state.k)} onBlur={this.handleOnBlurK.bind(this,this.state.k)} value={this.state.k} onChangeText={(value) => this.setState({k:value})}/></View>
                                        <View style={Calc_styles.inputtitle}><Text style={Calc_styles.inputtitle_text}>Толщина, s(мм):</Text></View>
                                        <View style={Calc_styles.inputwrapper}><TextInput keyboardType='numeric' style={Calc_styles.text_input} onFocus={this.handleOnFocusS.bind(this, this.state.s)} onBlur={this.handleOnBlurS.bind(this,this.state.s)} value={this.state.s} onChangeText={(value) => this.setState({s:value})}/></View>
                                        <View style={Calc_styles.inputtitle}><Text style={Calc_styles.inputtitle_text}>Длина, мм:</Text></View>
                                        <View style={Calc_styles.inputwrapper}><TextInput keyboardType='numeric' style={Calc_styles.text_input} onFocus={this.handleOnFocusN.bind(this, this.state.n)} onBlur={this.handleOnBlurN.bind(this,this.state.n)} value={this.state.n} onChangeText={(value) => this.setState({n:value})}/></View>
                                    </KeyboardAvoidingView>);
                                    case 9:  return (<KeyboardAvoidingView behavior="padding" style={Calc_styles.inputscontainer}>
                                        <View style={Calc_styles.inputtitle}><Text style={Calc_styles.inputtitle_text}>Размер стороны, h(мм):</Text></View>
                                        <View style={Calc_styles.inputwrapper}><TextInput keyboardType='numeric' style={Calc_styles.text_input} onFocus={this.handleOnFocusH.bind(this, this.state.h)} onBlur={this.handleOnBlurH.bind(this,this.state.h)} value={this.state.h} onChangeText={(value) => this.setState({h:value})}/></View>
                                        <View style={Calc_styles.inputtitle}><Text style={Calc_styles.inputtitle_text}>Размер стороны, l(мм):</Text></View>
                                        <View style={Calc_styles.inputwrapper}><TextInput keyboardType='numeric' style={Calc_styles.text_input} onFocus={this.handleOnFocusL.bind(this, this.state.l)} onBlur={this.handleOnBlurL.bind(this,this.state.l)} value={this.state.l} onChangeText={(value) => this.setState({l:value})}/></View>
                                        <View style={Calc_styles.inputtitle}><Text style={Calc_styles.inputtitle_text}>Толщина, k(мм):</Text></View>
                                        <View style={Calc_styles.inputwrapper}><TextInput keyboardType='numeric' style={Calc_styles.text_input} onFocus={this.handleOnFocusK.bind(this, this.state.k)} onBlur={this.handleOnBlurK.bind(this,this.state.k)} value={this.state.k} onChangeText={(value) => this.setState({k:value})}/></View>
                                        <View style={Calc_styles.inputtitle}><Text style={Calc_styles.inputtitle_text}>Длина, мм:</Text></View>
                                        <View style={Calc_styles.inputwrapper}><TextInput keyboardType='numeric' style={Calc_styles.text_input} onFocus={this.handleOnFocusN.bind(this, this.state.n)} onBlur={this.handleOnBlurN.bind(this,this.state.n)} value={this.state.n} onChangeText={(value) => this.setState({n:value})}/></View>
                                    </KeyboardAvoidingView>);
                                }
                            })()}
                        </View>
                    <View style={Calc_styles.bottom_display_weight_wrapper}>
                        {this.renderBottomResult()}
                    </View>
                    <TouchableHighlight onPress={this.handleCalculate.bind(this, this.state.activeprofile)} style={Calc_styles.calc_button_container}>
                        <Text style={Calc_styles.calc_button_text}>РАССЧИТАТЬ</Text>
                    </TouchableHighlight>
                </View>
                </View>
                </ImageBackground>
                </ScrollView>
            </View>
        )
    }
}