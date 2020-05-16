import {ImageStyle, StyleSheet, TextStyle, ViewStyle, Platform} from "react-native";

export interface CatalizatorStyle {
    top_bar_container: ViewStyle,
    bottombar_container: ViewStyle,
    bottombar_arrow_wrapper: ViewStyle,
    bottombar_icons_wrapper: ViewStyle,
    bar_wrapper: ViewStyle,
    bar_button_wrapper: ViewStyle,
    bar_logo_wrapper: ViewStyle,
    bar_text_wrapper: ViewStyle,
    bar_back_button: ImageStyle,
    bar_logo: ImageStyle,
    bar_text: TextStyle,
    components_container: ViewStyle,
    component_item: ViewStyle,
    component_title_wr: ViewStyle,
    component_title: TextStyle,
    disclaimer_wrapper: ViewStyle,
    disclaimer: TextStyle,
    price_blocks_container: ViewStyle,
    price_blocks_item_wr: ViewStyle,
    top_block_wr: ViewStyle,
    middle_block_wr: ViewStyle,
    middle_block_title_wr: ViewStyle,
    middle_block_title: TextStyle,
    middle_block_text_wr: ViewStyle,
    middle_block_text: TextStyle,
    bottom_block_wr: ViewStyle,
    bottom_block_price: TextStyle,
    laboratory_container: ViewStyle,
    laboratory_item_wr: ViewStyle,
    laboratory_item_title_wr: ViewStyle,
    laboratory_item_title: TextStyle,
    laboratory_item_image: ViewStyle,
    laboratory_item_text_wr: ViewStyle,
    laboratory_item_text: TextStyle,
    methods_container: ViewStyle,
    methods_item_wr: ViewStyle,
    methods_item_text_wr: ViewStyle,
    methods_item_number_wr: ViewStyle,
    methods_item_number: TextStyle,
    methods_item_title_wr: ViewStyle,
    methods_item_title: TextStyle,
    regions_container: ViewStyle,
    regions_item_wr: ViewStyle,
    regions_item_image: ViewStyle,
    regions_item_text_wr: ViewStyle,
    regions_item_text: TextStyle,
    advant_container: ViewStyle,
    advant_item_wr: ViewStyle,
    advant_item_image: ViewStyle,
    advant_item_text_wr: ViewStyle,
    advant_item_text: TextStyle,
    catalog_topbar: ViewStyle,
    catalog_topbar_title_wr: ViewStyle,
    catalog_topbar_title: TextStyle,
    catalog_topbar_icon_wr: ViewStyle,
    catalog_container: ViewStyle,
    catalog_category_container: ViewStyle,
    catalog_title: TextStyle,
    catalog_item_container: ViewStyle,
    catalog_item_model: TextStyle,
    catalog_item_param: TextStyle
}

export const Catalizator_styles = StyleSheet.create<CatalizatorStyle>({
    top_bar_container:{
        ...Platform.select({
            ios:{
                height: 100
            },
            android: {
                height: 70
            }
        })

    },
    bottombar_container: {
        zIndex: 10,
        backgroundColor: "#939090",
        flex:0.4,
        flexDirection: "row"

    },
    bottombar_arrow_wrapper: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1
    },
    bottombar_icons_wrapper: {
        flex: 4,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    },
    bar_wrapper: {
        ...Platform.select({
            ios: {
                paddingTop: 30
            }
        }),
        flexDirection:'row'
    },
    bar_button_wrapper: {
        flex: 1,
        height: '100%',
        justifyContent:"center",
        alignItems: "center"
    },
    bar_logo_wrapper: {
        flex: 1,
        height: '100%',
        justifyContent: "center",
        alignItems: "center",
        alignSelf: 'center'
    },
    bar_text_wrapper: {
        height: '100%',
        justifyContent:"center",
        flex: 3
    },
    bar_back_button: {
        width: 40,
        height: 35
    },
    bar_logo: {
        justifyContent: "center",
        alignItems: "center",
        alignSelf: 'center',
        width: 70,
        height: 60
    },
    bar_text: {
        fontSize: 18,
        color: 'white',
        fontWeight: "bold",
        textAlign: 'center'
    },
    components_container: {
        width: "100%",
        alignItems: "center"
    },
    component_item: {
        paddingTop: 40,
        width: "100%",
        alignItems: "center"
    },
    component_title_wr: {
        paddingTop: 10,
        paddingBottom: 10,
        width: "100%",
        borderTopColor: "grey",
        borderTopWidth: 1,
        borderBottomColor: "grey",
        borderBottomWidth: 1
    },
    component_title: {
        width: '100%',
        fontSize: 24,
        color: "black",
        fontWeight: "bold",
        textAlign: "center"
    },
    disclaimer_wrapper: {
        paddingTop: 30,
        paddingLeft: 15,
        paddingRight: 15
    },
    disclaimer: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center"
    },
    price_blocks_container: {
        paddingTop: 30,
        width: "80%",
        justifyContent: "center"
    },
    price_blocks_item_wr: {
        marginBottom: 30,
        width: "100%",
        borderWidth: 1,
        borderColor: "grey",
        borderRadius: 9
    },
    top_block_wr: {

    },
    middle_block_wr: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 15
    },
    middle_block_title_wr: {
        paddingTop: 10,
        paddingBottom: 10,
    },
    middle_block_title: {
        fontWeight: "bold",
        fontSize: 20,
        color: "#465B90"
    },
    middle_block_text_wr: {

    },
    middle_block_text: {
        fontWeight: "bold",
        fontSize: 18
    },
    bottom_block_wr: {
        borderTopColor: "grey",
        borderTopWidth: 1,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10
    },
    bottom_block_price: {
        fontSize: 20,
        color: "#6C74A2"
    },
    laboratory_container: {
        marginTop: 30,
        marginBottom: 30,
        width: "70%",
        justifyContent: "center"
    },
    laboratory_item_wr: {
        marginTop: 30
    },
    laboratory_item_title_wr: {
        paddingBottom: 15,
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    laboratory_item_title: {
        color: "black",
        textAlign: "center",
        fontSize: 18,
        fontWeight: "bold"
    },
    laboratory_item_image: {
        paddingTop: 10,
        paddingBottom: 20,
        justifyContent: "center",
        alignItems: "center"

    },
    laboratory_item_text_wr: {
        alignItems: "center"
    },
    laboratory_item_text: {
        textAlign: "center",
        fontSize: 16,
        fontWeight: "bold"
    },
    methods_container: {
        paddingTop: 40
    },
    methods_item_wr: {
        marginBottom: 30
    },
    methods_item_text_wr: {
        paddingTop: 30,
        paddingLeft: 10,
        paddingRight: 30,
        flexDirection: "row"
    },
    methods_item_number_wr: {

    },
    methods_item_number: {
        fontSize: 18,
        color: "#26A3C4",
        fontWeight: "bold"

    },
    methods_item_title_wr: {

    },
    methods_item_title: {
        fontWeight: "bold",
        fontSize: 18,
        color: "white"
    },
    regions_container: {
        paddingTop: 30,
        width: "70%",

    },
    regions_item_wr: {
        marginBottom: 35

    },
    regions_item_image: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
    },
    regions_item_text_wr: {

    },
    regions_item_text: {
        fontWeight: "bold",
        fontSize: 18,
        textAlign: "center"
    },
    advant_container: {
        paddingTop: 40,
        width: "75%"
    },
    advant_item_wr: {
        marginBottom: 35
    },
    advant_item_image: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 30
    },
    advant_item_text_wr: {

    },
    advant_item_text: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 18
    },
    catalog_topbar: {
        position: 'absolute',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    catalog_topbar_title_wr: {
        flex: 4,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 15
    },
    catalog_topbar_title: {
        fontWeight: 'bold',
        fontSize: 20
    },
    catalog_topbar_icon_wr: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 15
    },
    catalog_container: {
        paddingTop: 50,
        margin: 20,
        width: '80%'
    },
    catalog_category_container: {
        width: '100%'
    },
    catalog_title: {
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 30,
        fontSize: 20,
        color: "#465B90"
    },
    catalog_item_container: {
        marginBottom: 20
    },
    catalog_item_model: {
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 15,
        fontSize: 18,
        color: 'black',
        textDecorationLine: 'underline'
    },
    catalog_item_param: {
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 15,
        fontSize: 16
    }
});