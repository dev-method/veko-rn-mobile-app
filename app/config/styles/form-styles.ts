import {StyleSheet, TextStyle, ViewStyle, Platform} from "react-native";

export interface FormStyle {
    top_bar_container: ViewStyle,
    arrow_icon_wrapper: ViewStyle,
    icon_wrapper: ViewStyle,
    header_container: ViewStyle,
    header_image: ViewStyle,
    header_text_wrapper: ViewStyle,
    header_text: TextStyle,
    form_container: ViewStyle,
    form_wrapper: ViewStyle,
    form: ViewStyle,
    input_error_wr: ViewStyle,
    input_error_text: TextStyle,
    form_input_container: ViewStyle,
    form_input_label_wrapper: ViewStyle,
    form_input_label: TextStyle,
    form_text_input: ViewStyle,
    form_text_input_blank: ViewStyle,
    form_input_field_wrapper: ViewStyle,
    form_input_icon_wrapper: ViewStyle,
    form_input_wrapper: ViewStyle,
    form_textarea_container: ViewStyle,
    form_textarea_label_wrapper: ViewStyle,
    form_textarea_label: TextStyle,
    form_textarea_wrapper: ViewStyle,
    button_container: ViewStyle,
    button: ViewStyle,
    button_text: TextStyle
}

export const Form_styles = StyleSheet.create<FormStyle>({
    top_bar_container:{
        flexDirection: 'row',
        backgroundColor: '#C4C4C4',
        ...Platform.select({
            ios: {
                flex: 0.1,
                paddingTop: 25
            },
            android: {
                height: 50,
            }
        }),

    },
    arrow_icon_wrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginLeft: 10
    },
    icon_wrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    header_container: {
        zIndex: 10,
        flex: 0.2,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,

        elevation: 16,
    },
    header_image: {
        height:'100%',
        width: '100%'

    },
    header_text_wrapper: {
        paddingLeft: 20,
        height: '100%',
        justifyContent: 'center'
    },
    header_text: {
        color: '#636e72',
        fontSize: 20,
        fontWeight: 'bold'
    },
    form_container: {
    },
    form_wrapper: {
        flex: 1,
        width: '80%',
    },
    form: {
        paddingBottom: 100,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center'
    },
    input_error_wr: {
        paddingTop: 15,
        paddingBottom: 15
    },
    input_error_text: {
        fontWeight: 'bold',
        fontSize: 20
    },
    form_input_container: {
        flex: 1,
        marginTop: 20
    },
    form_input_label_wrapper: {
    },
    form_input_label: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#647585',
        marginBottom: 10
    },
    form_text_input: {
        fontWeight: 'bold',
        ...Platform.select({
            ios: {
                fontSize: 18,
                paddingTop: 11,
                paddingBottom: 11
            }
        }),
        borderWidth: 1.5,
        borderColor: '#A5A1A1',
        borderRadius: 9,
        backgroundColor: '#D0CFCF80'
    },
    form_text_input_blank: {
        borderWidth: 1.5,
        borderColor: '#a50e0e',
        borderRadius: 9,
        backgroundColor: '#D0CFCF80'
    },
    form_input_field_wrapper: {
        flexDirection: 'row'
    },
    form_input_icon_wrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#C4C4C4',
        borderRadius: 9,
        width: 50,
    },
    form_input_wrapper: {
        height: 48,
        flex: 4.5,
        marginLeft: 10
    },
    form_textarea_container: {
        flex: 3,
        marginTop: 20
    },
    form_textarea_label_wrapper: {

    },
    form_textarea_label: {

    },
    form_textarea_wrapper: {
    },
    button_container: {
        borderRadius: 9,
        marginTop: 30,
        paddingTop: 15,
        paddingBottom: 15,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#929FA4',
        flex: 1
    },
    button: {

    },
    button_text: {
        fontSize: 20,
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold'
    }
});