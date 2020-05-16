import React from 'react';
import {Component} from 'react';
import { Form_styles } from '../config/styles/form-styles'
import {View, ImageBackground, TouchableHighlight, ScrollView, ToastAndroid, Image, Text, TextInput, KeyboardAvoidingView} from 'react-native';
import { NavigationScreenProp} from 'react-navigation';
import { saveMessToPounchDB } from '../config/functions/saveDataToPounchDB'
import PouchDB from 'pouchdb-react-native'
import { FormState } from "../config/interfaces/formInterface";
import { AppUrls } from "../config/env/urls"


const messDB = new PouchDB('messdb');

interface FormProps {
    navigation: NavigationScreenProp<any, any>
}

export default class FormScreen extends Component<FormProps, FormState>{
    constructor(props: FormProps) {
        super(props);
        this.state = {
            fields: {
                name: {
                    value: '',
                    required: true,
                    blank: false
                },
                phone: {
                    value: '',
                    required: true,
                    blank: false
                },
                mail: {
                    value: '',
                    required: false,
                    blank: false
                },
                message: {
                    value: '',
                    required: true,
                    blank: false
                }
            },
            input_error: false,
            server_error: false
        }
    }
    onChangeName(text){
        const state={...this.state};
        state.fields.name.value = text;
        this.setState(state)
    }
    onChangePhone(text){
        const state={...this.state};
        state.fields.phone.value = text;
        this.setState(state)
    }
    onChangeMail(text){
        const state={...this.state};
        state.fields.mail.value = text;
        this.setState(state)
    }
    onChangeMessage(text){
        const state={...this.state};
        state.fields.message.value = text;
        this.setState(state)
    }

    validateInput(state) {
        const fields = state.fields;
        const fields_keys = Object.keys(fields);
        for (let item in fields_keys) {
            let position = fields_keys[item];
            if (fields[position].value.length==0 && fields[position].required) {
                state.fields[position].blank = true;
                state.input_error = true;
            }
        }
        return state
    }
    clearForm(state){
        state.fields.name.value = '';
        state.fields.phone.value = '';
        state.fields.mail.value = '';
        state.fields.message.value = '';
        ToastAndroid.showWithGravityAndOffset(
            'ВАШЕ СООБЩЕНИЕ ОТПРАВЛЕНО. МЫ С ВАМИ СВЯЖЕМСЯ!',
            ToastAndroid.LONG,
            ToastAndroid.CENTER,
            25,
            50,
        );
        this.setState({state});
    }
    showNetworkError(err){
        if(err){
            ToastAndroid.showWithGravityAndOffset(
                'ПРОБЛЕМЫ С ОТПРАВКОЙ! ПРОВЕРЬТЕ НАЛИЧИЕ СЕТИ! МЫ ПОПРОБУЕМ ОТПРАВИТЬ ВАШЕ СООБЩЕНИЕ ПОЗЖЕ',
                ToastAndroid.LONG,
                ToastAndroid.CENTER,
                25,
                50,
            );
        }
    }
    sendMessage(state) {
        const state_clone = this.validateInput(state);
        if (!state.input_error) {
            fetch(AppUrls.message_post_link, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({"name":this.state.fields.name.value, "phone":this.state.fields.phone.value, "mail":this.state.fields.mail.value, "message":this.state.fields.message.value})
            }).then(resp=>{
                return resp.json();
            }).then((result)=>{
                this.clearForm(state);
            }).catch(err=>{
                saveMessToPounchDB(messDB, this.state);
                this.setState({server_error:true})
            });
        }
        else {
            this.setState(state)
        }
    }
    componentDidMount(){
        messDB.info().then(function(info) {
            return info.doc_count;

        }).then(count => {
            if (count>0) {
                messDB.allDocs({
                    include_docs: true
                })
                    .then(result => {
                        return result.rows.map(row => row.doc);
                    })
                    .then((items) => {
                        items.map((index)=>{
                            fetch(AppUrls.message_post_link, {
                                method: "POST",
                                headers: {
                                    Accept: "application/json",
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({"name":index.name, "phone":index.phone, "mail":index.mail, "message":index.message})
                            }).then(resp=>{
                                return resp.json();
                            }).then((result)=>{
                                messDB.get(index.message).then(function (doc) {
                                    doc._deleted = true;
                                    return messDB.put(doc);
                                });
                            }).catch(err=>{
                                ToastAndroid.showWithGravityAndOffset(
                                    'ВОЗНИКЛИ НЕПРЕДВИДЕННЫЕ НЕПОЛАДКИ!',
                                    ToastAndroid.LONG,
                                    ToastAndroid.CENTER,
                                    25,
                                    50,
                                );
                            });
                        });
                    })
            }

        })

    }
    render() {
        return(
            <View style={{ flex: 1}}>
                <View style={Form_styles.top_bar_container}>
                    <View style={Form_styles.arrow_icon_wrapper}>
                        <TouchableHighlight onPress={() => this.props.navigation.goBack()}><Image style={{height:40, width: 45}} source={require("../assets/icons/arow-icon.png")}/></TouchableHighlight>
                    </View>
                    <View style={Form_styles.icon_wrapper}>
                        <TouchableHighlight onPress={() => this.props.navigation.navigate("Main")}><Image style={{height:40, width: 40}} source={require("../assets/icons/home_icon.png")}/></TouchableHighlight>
                    </View>
                    <View style={Form_styles.icon_wrapper}>
                        <TouchableHighlight onPress={() => this.props.navigation.navigate("Map")}><Image style={{height:40, width: 40}} source={require("../assets/icons/map-icon-map.png")}/></TouchableHighlight>
                    </View>
                    <View style={Form_styles.icon_wrapper}>
                        <TouchableHighlight onPress={() => this.props.navigation.navigate("Calc")}><Image style={{height:40, width: 40}} source={require("../assets/icons/calculator-icon-app.png")}/></TouchableHighlight>
                    </View>
                </View>
                <View style={Form_styles.header_container}>
                    <ImageBackground style={Form_styles.header_image} source={require("../assets/form_screen/message-header.jpg")}>
                        <View style={Form_styles.header_text_wrapper}>
                            <Text style={Form_styles.header_text}>ОСТАВИТЬ СООБЩЕНИЕ</Text>
                        </View>
                    </ImageBackground>
                </View>
                <View style={{flex: 0.8}}>
                {this.showNetworkError(this.state.server_error)}
                <ScrollView >
                <View style={Form_styles.form_container}>
                    <ImageBackground style={{height:'100%', width: '100%'}} source={require("../assets/form_screen/form-back.jpg")}>
                    <View style={Form_styles.form}>
                    <View style={Form_styles.form_wrapper}>
                    {this.state.input_error?<View style={Form_styles.input_error_wr}><Text style={Form_styles.input_error_text}>Перед отправкой сообщения проверьте, что указанные поля заполнены.</Text></View>:<View></View>}
                    <View style={Form_styles.form_input_container}>
                        <View style={Form_styles.form_input_label_wrapper}>
                            <Text style={Form_styles.form_input_label}>Как вас зовут:</Text>
                        </View>
                        <View style={Form_styles.form_input_field_wrapper}>
                            <View style={Form_styles.form_input_icon_wrapper}>
                                <Image style={{height:30, width: 30}} source={require("../assets/icons/human_icon.png")}/>
                            </View>
                            <KeyboardAvoidingView behavior="padding" style={Form_styles.form_input_wrapper}>
                                <TextInput
                                    onChangeText={(text) => {this.onChangeName(text)}}
                                    style={this.state.fields.name.blank?Form_styles.form_text_input_blank:Form_styles.form_text_input}
                                    value={this.state.fields.name.value}
                                />
                            </KeyboardAvoidingView>
                        </View>
                    </View>
                    <View style={Form_styles.form_input_container}>
                        <View style={Form_styles.form_input_label_wrapper}>
                            <Text style={Form_styles.form_input_label}>Телефон:</Text>
                        </View>
                        <View style={Form_styles.form_input_field_wrapper}>
                            <View style={Form_styles.form_input_icon_wrapper}>
                                <Image style={{height:30, width: 30}} source={require("../assets/icons/phone_icon.png")}/>
                            </View>
                            <KeyboardAvoidingView behavior="padding" style={Form_styles.form_input_wrapper}>
                                <TextInput
                                    onChangeText={(text) => {this.onChangePhone(text)}}
                                    style={this.state.fields.phone.blank?Form_styles.form_text_input_blank:Form_styles.form_text_input}
                                    value={this.state.fields.phone.value}
                                />
                            </KeyboardAvoidingView>
                        </View>
                    </View>
                    <View style={Form_styles.form_input_container}>
                        <View style={Form_styles.form_input_label_wrapper}>
                            <Text style={Form_styles.form_input_label}>Почта:</Text>
                        </View>
                        <View style={Form_styles.form_input_field_wrapper}>
                            <View style={Form_styles.form_input_icon_wrapper}>
                                <Image style={{height:30, width: 30}} source={require("../assets/icons/email-icon.png")}/>
                            </View>
                            <KeyboardAvoidingView behavior="padding" style={Form_styles.form_input_wrapper}>
                                 <TextInput
                                    onChangeText={(text) => {this.onChangeMail(text)}}
                                    style={this.state.fields.mail.blank?Form_styles.form_text_input_blank:Form_styles.form_text_input}
                                    value={this.state.fields.mail.value}
                                />
                            </KeyboardAvoidingView>
                        </View>
                    </View>
                    <View style={Form_styles.form_textarea_container}>
                        <View style={Form_styles.form_textarea_label_wrapper}>
                            <Text style={Form_styles.form_input_label}>Сообщение:</Text>
                        </View>
                        <KeyboardAvoidingView behavior="padding" style={Form_styles.form_textarea_wrapper}>
                            <TextInput  style={this.state.fields.message.blank?Form_styles.form_text_input_blank:Form_styles.form_text_input}
                                        onChangeText={(text) => {this.onChangeMessage(text)}}
                                        multiline = {true}
                                        numberOfLines = {3}
                                        value={this.state.fields.message.value}
                            />
                        </KeyboardAvoidingView>
                    </View>
                    {this.state.input_error?<View style={Form_styles.input_error_wr}><Text style={Form_styles.input_error_text}>Перед отправкой сообщения проверьте, что указанные поля заполнены.</Text></View>:<View></View>}
                    <View style={Form_styles.button_container}>
                        <TouchableHighlight onPress={()=>this.sendMessage(this.state)}>
                            <Text style={Form_styles.button_text}>ОТПРАВИТЬ</Text>
                        </TouchableHighlight>
                    </View>
                    </View>
                    </View>
                    </ImageBackground>
                </View>
                </ScrollView>
                </View>
            </View>
        )

    }
}
