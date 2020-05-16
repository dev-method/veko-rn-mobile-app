import {ImageStyle, StyleSheet, TextStyle, ViewStyle,Platform} from "react-native";

export interface MapStyle {
    bottom_bar_container: ViewStyle,
    bottom_icons_wr: ViewStyle,
    map_container: ViewStyle,
    map: ViewStyle,
    contact_box: ViewStyle,
    hidden_contact_box: ViewStyle

}

export const Map_styles = StyleSheet.create<MapStyle>({
    bottom_bar_container: {
        backgroundColor: "#C4C4C4",
        flex: 1,
        width: "100%",
        bottom: 0,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    },
    bottom_icons_wr: {


    },
    map_container: {
       zIndex: 1,
       flex: 10
    },
    map: {
        flex: 1
    },
    contact_box: {
        backgroundColor: "rgba(196,196,196,0.6)",
        width: "80%",
        height: "auto",
        position: "absolute",
        ...Platform.select({
            ios: {
                top: "10%",
            },
            android: {
                top: "5%",
            }
        }),
        left: "10%",

        zIndex: 2,
        padding: 10
    },
    hidden_contact_box: {
        backgroundColor: "rgba(108,153,196,0.89)",
        height: 'auto',
        position: "absolute",
        width: "80%",
        padding: 20,
        left: '10%',
        top: '6%',
        zIndex: 3
    }
});