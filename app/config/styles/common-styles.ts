import {ImageStyle, StyleSheet, TextStyle, ViewStyle, Platform} from "react-native";

export interface CommonStyle {
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
    list_item_wrapper: ViewStyle,
    list_image_wrapper: ViewStyle,
    list_image: ImageStyle,
    list_text_block_container: ViewStyle,
    list_title_wrapper: ViewStyle,
    list_title: TextStyle,
    price_wrapper: ViewStyle,
    list_price_icon: ImageStyle,
    list_price_text: TextStyle,
    flatlist: ViewStyle,
    list_image_wr: ViewStyle
}

export const Common_styles = StyleSheet.create<CommonStyle>({
    top_bar_container:{
        ...Platform.select({
            ios:{
                flex:1.3,
            },
            android:{
                flex:1,
            }
        }),

        shadowColor: "#000",
        shadowOffset: {
            width: 6,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 24,
    },
    top_bar_wrapper:{
        ...Platform.select({
            ios: {
                paddingTop: 30
            }
        }),
        flexDirection:'row',
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
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
        flex:8
    },
    bottom_bar_container: {
        backgroundColor: "#B0C1CD",
        alignItems: "center",
        justifyContent: "space-around",
        flex:0.8,
        flexDirection: "row"
    },
    list_container: {
        paddingTop: 15,
        alignItems: "center"
    },
    list_item_wrapper: {
        marginBottom: 30,
        width: "70%",
        flexDirection: "row"

    },
    list_image_wrapper: {
        marginRight: 15,
    },
    list_image: {
        borderRadius: 9,
        width: 80,
        height: 80,
    },
    list_text_block_container: {

    },
    list_title_wrapper: {
        flex: 2

    },
    list_title: {
        fontSize: 18,
        fontWeight: "bold"
    },
    price_wrapper: {
        paddingBottom: 2,
        flex: 1,
        alignItems: "flex-end",
        flexDirection: "row"

    },
    list_price_icon: {
        marginRight: 10,
        width: 20,
        height:20

    },
    list_price_text: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#1A658E"
    },
    flatlist: {
    },
    list_image_wr: {

    }
});