import {ImageStyle, StyleSheet, TextStyle, ViewStyle, Platform} from "react-native";

export interface ElectroStyle {
    top_bar_container:ViewStyle,
    top_bar_wrapper:ViewStyle,
    top_bar_back_button:ImageStyle
    bar_button_wrapper: ViewStyle,
    top_bar_logo: ImageStyle,
    bar_logo_wrapper:ViewStyle,
    top_bar_text: TextStyle,
    bar_text_wrapper:ViewStyle,
    comm_list_container: ViewStyle,
    bottom_bar_container: ViewStyle,
    list_container: ViewStyle,
    list_item_top: ViewStyle,
    list_item_bottom: ViewStyle,
    list_item_bottom_text: ViewStyle,
    list_item_wrapper: ViewStyle,
    list_image_wrapper: ViewStyle,
    list_image: ImageStyle,
    list_text_block_container: ViewStyle,
    list_title_wrapper: ViewStyle,
    multi_list_title_wrapper: ViewStyle,
    list_title: TextStyle,
    price_wrapper: ViewStyle,
    multi_price_wrapper: ViewStyle,
    multi_list_price_icon: ImageStyle,
    list_price_icon: ImageStyle,
    list_price_text: TextStyle,
    multi_list_price_text: TextStyle
}

export const Electro_styles = StyleSheet.create<ElectroStyle>({
    top_bar_container:{
        ...Platform.select({
            ios:{
                flex:1.3
            },
            android:{
                flex:1
            },
        })

    },
    top_bar_wrapper:{
        ...Platform.select({
            ios:{
                paddingTop: 30
            }
        }),
        flexDirection:'row'
    },
    top_bar_back_button: {
        width: 40,
        height: 35
    },
    bar_button_wrapper:{
        flex: 1,
        height: '100%',
        justifyContent:"center",
        alignItems: "center"
    },
    top_bar_logo:{
        width: 60,
        height: 60
    },
    bar_logo_wrapper: {
        flex: 1,
        height: '100%',
        justifyContent: "center",
        alignItems: "center"
    },
    top_bar_text: {
        fontSize: 18,
        color: 'white',
        fontWeight: "bold",
        textAlign: 'center'
    },
    bar_text_wrapper: {
        height: '100%',
        justifyContent:"center",
        flex: 3
    },
    comm_list_container: {
        flex:8,
        justifyContent: "center",
        alignItems: "center"
    },
    bottom_bar_container: {
        backgroundColor: "#B0C1CD",
        alignItems: "center",
        justifyContent: "space-around",
        flex:0.8,
        flexDirection: "row"
    },
    list_container: {
        paddingTop: 30,
        alignItems: 'center'
    },
    list_item_top: {
        flex: 1,
        flexDirection: "row"
    },
    list_item_bottom: {
        flex: 1,
        marginTop: 10
    },
    list_item_bottom_text: {
        paddingLeft: 10,
        borderLeftColor: '#96AAB0',
        borderLeftWidth: 2.5
    },
    list_item_wrapper: {
        marginBottom: 30,
        paddingLeft: 20,
        paddingRight: 20
    },
    list_image_wrapper: {
        flex: 1,
        marginRight: 15
    },
    list_image: {
        borderRadius: 9,
        width: 80,
        height: 80

    },
    list_text_block_container: {
        flex: 3
    },
    list_title_wrapper: {
        flex: 1,
        flexDirection: "column",
    },
    multi_list_title_wrapper: {

    },
    list_title: {
        flex: 1,
        fontSize: 13,
        fontWeight: "bold"
    },
    price_wrapper: {
        flex:1,
        paddingBottom: 2,
        alignItems: "flex-end",
        flexDirection: "row"

    },
    multi_price_wrapper: {
        flex:1,
        flexDirection: "row"
    },
    multi_list_price_icon: {
        marginRight: 5,
        width: 15,
        height:15
    },
    list_price_icon: {
        marginRight: 10,
        width: 20,
        height:20

    },
    list_price_text: {
        flex: 1,
        fontSize: 16,
        fontWeight: "bold",
        color: "#1A658E"
    },
    multi_list_price_text: {
        flex: 1,
        fontSize: 14,
        fontWeight: "bold",
        color: "#1A658E"
    }

});