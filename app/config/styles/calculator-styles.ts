import {ImageStyle, StyleSheet, TextStyle, ViewStyle, Platform} from "react-native";

export interface CalculateStyle {
    calc_main_container: ViewStyle,
    calc_topbar_container: ViewStyle,
    topbar_arrow_wrapper: ViewStyle,
    topbar_icons_wrapper: ViewStyle,
    calc_display_container: ViewStyle,
    display_title_wrapper: ViewStyle,
    display_title: TextStyle,
    display_draw_wrapper: ViewStyle,
    top_display_weight_wrapper: ViewStyle,
    bottom_display_weight_wrapper: ViewStyle,
    weight_top_text: TextStyle,
    weight_bottom_text: TextStyle,
    calc_profiles_container: ViewStyle,
    profileimage: ImageStyle,
    profileimage_wr: ViewStyle,
    profileimage_wr_active: ViewStyle,
    calc_workarea_container: ViewStyle,
    material_change_wrapper: ViewStyle,
    select_material_wr: ViewStyle,
    material_change_title: TextStyle,
    select_type_wr: ViewStyle,
    dimensions_change_wrapper: ViewStyle,
    inputscontainer: ViewStyle,
    inputtitle: ViewStyle,
    inputwrapper: ViewStyle,
    inputtitle_text: TextStyle,
    calc_button_container: ViewStyle,
    calc_button_text: TextStyle,
    calculator_picker: TextStyle,
    calculator_picker_item: ViewStyle,
    text_input: TextStyle
}

export const Calc_styles = StyleSheet.create<CalculateStyle>({
    calc_main_container: {
        flex: 1
    },
    calc_topbar_container: {
        zIndex: 10,
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",

        ...Platform.select({
            ios:{
                height: 70,
                paddingTop: 20
            },
            android: {
                height: 50,
            }
        }),
        backgroundColor: "#939090",
        flexDirection: "row"

    },
    topbar_arrow_wrapper: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1
    },
    topbar_icons_wrapper: {
        flex: 4,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    },
    calc_display_container: {
        paddingTop: 70,
        backgroundColor: "#6B8793",
        height: 350,
    },
    display_title_wrapper: {
        flex: 0.35,
        zIndex: 20,
        paddingLeft: 25
    },
    display_title: {
        ...Platform.select({
            ios:{
                paddingTop: 10
            }
        }),
        fontWeight: "bold",
        fontSize: 20,
        color: "#346980"
    },
    display_draw_wrapper: {
        flex: 2,
        justifyContent: "center",
        alignItems: "center"
    },
    top_display_weight_wrapper: {
        flex: 0.35,
        zIndex: 20,
        paddingLeft: 25
    },
    bottom_display_weight_wrapper: {
        flex: 0.35,
        zIndex: 20,
        paddingLeft: 10
    },
    weight_top_text: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold"
    },
    weight_bottom_text: {
        color: "#717e82",
        fontSize: 20,
        fontWeight: "bold"
    },
    calc_profiles_container: {
        height: 83,
        backgroundColor: "rgba(159,159,159,0.31)",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
        alignItems: "center",
        alignSelf: "center"
    },
    profileimage: {
        width: 35,
        height: 35

    },
    profileimage_wr: {
        paddingBottom: 3,
        paddingTop: 3,
        justifyContent: "center",
        alignItems: "center",
        width: '20%',
    },
    profileimage_wr_active: {
        borderRadius: 2,
        backgroundColor: "#a5b1b5",
        paddingBottom: 3,
        paddingTop: 3,
        justifyContent: "center",
        alignItems: "center",
        width: '20%',
    },
    calc_workarea_container: {
        flex: 4,
        paddingTop: 10,
        paddingBottom: 15,
        paddingLeft: 20,
        paddingRight: 20
    },
    material_change_wrapper: {
    },
    select_material_wr: {

    },
    material_change_title: {
        color: "#6398b9",
        fontWeight: "bold",
        fontSize: 20,
        paddingTop: 20,
        paddingBottom: 5,
        paddingLeft: 7

    },
    select_type_wr: {
    },
    dimensions_change_wrapper: {
        paddingTop: 20,
        paddingLeft: 10

    },
    inputscontainer: {

    },
    inputtitle: {

    },
    inputwrapper: {
        marginTop: 25,
        marginBottom: 25
    },
    inputtitle_text: {
        fontWeight: "bold",
        fontSize: 16

    },
    calc_button_container: {
        marginLeft: 5,
        marginTop: 30,
        borderRadius: 6,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#6B8793",
        height: 50,
        width: "100%"
    },
    calc_button_text: {
        fontWeight: "bold",
        fontSize: 20,
        color: "white"

    },
    calculator_picker: {
        color: "black",
        fontSize: 20
    },
    calculator_picker_item: {
        paddingLeft: 40
    },
    text_input: {
        ...Platform.select({
            ios:{
                paddingTop: 11,
                paddingBottom: 11
            }
        }),
        paddingLeft: 20,
        backgroundColor: "#e1e6e8",
        fontSize: 24,
        borderWidth: 1,
        borderColor: "grey",
        borderRadius: 13,
        fontWeight: "bold",
        color: "#68848c",
    }
});