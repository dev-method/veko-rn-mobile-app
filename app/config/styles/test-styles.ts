import {ImageStyle, StyleSheet, TextStyle, ViewStyle} from "react-native";
import {ElectroStyle} from "./electro-styles";

export interface TestStyle {
    box: ViewStyle
}
export const Test_styles = StyleSheet.create<TestStyle>({
    box: {
        width: 100,
        height: 100,
        backgroundColor: "blue",
        shadowColor: "#000",
        shadowOffset: {
            width: 6,
            height: 11,
        },
        shadowOpacity: 0.57,
        shadowRadius: 15.19,

        elevation: 23,
    }
});