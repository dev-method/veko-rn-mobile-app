import {ImageStyle, StyleSheet, TextStyle, ViewStyle} from "react-native";


export interface MainStyle {
    back_image:ImageStyle,
    logo_wrapper:ViewStyle,
    menu_container:ViewStyle,
    button_text:TextStyle,
    bottom_icons_wr:ViewStyle,
    menu_button:ViewStyle,
    bottom_menu_wr:ViewStyle
}

export const Main_styles = StyleSheet.create<MainStyle>({
    back_image: {
        minHeight:'100%'
    },
    logo_wrapper: {
        flex: 2,
        justifyContent:'center',
        alignItems: 'center'
    },
    menu_container: {
        flex: 3
    },
    button_text: {
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center'

    },
    bottom_icons_wr: {
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    menu_button: {
        marginBottom: 35,
        borderRadius: 9,
        height: 45,
        alignSelf: 'center',
        justifyContent: 'center',
        width:'60%',
        backgroundColor:'#98BBCE4D'

    },
    bottom_menu_wr: {
        flex: 1,
        justifyContent: 'flex-end'
    }
});
