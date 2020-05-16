import {ImageStyle, StyleSheet, TextStyle, ViewStyle} from "react-native";

export interface ComDetailStyle {
    image_container: ViewStyle,
    image_logo: ImageStyle,
    image_text_wrapper: ViewStyle,
    image_text: TextStyle,
    image_bottom_container: ViewStyle,
    bottom_title_wrapper: ViewStyle,
    bottom_title: TextStyle,
    bottom_price_wrapper: ViewStyle,
    bottom_price: TextStyle,
    detail_text_wrapper: ViewStyle,
    detail_text: TextStyle
}

export const Com_detail_styles = StyleSheet.create<ComDetailStyle>({
    image_container: {
        flex: 1.9
    },
    image_logo: {
        zIndex: 999,
        bottom: 10,
        left: '42%',
        position: 'absolute',
        width: 60,
        height: 60
    },
    image_text_wrapper: {
        justifyContent: 'center',
        height: '100%'

    },
    image_text: {
        paddingLeft: 40,
        color: 'white',
        fontWeight: 'bold',
        fontSize: 26

    },
    image_bottom_container: {
        flexDirection: 'row',
        backgroundColor: '#6E9BC6',
        flex: 0.45,
        zIndex: 0
    },
    bottom_title_wrapper: {
        justifyContent: 'center',
        flex: 1,
        zIndex: 0

    },
    bottom_title: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
        zIndex: 0
    },
    bottom_price_wrapper: {
        justifyContent: 'center',
        flex: 1,
        zIndex: 0
    },
    bottom_price: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
        zIndex: 0
    },
    detail_text_wrapper: {
        flex: 4,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 5,
    },
    detail_text: {
        fontSize: 20,
        fontWeight: 'bold'
    }
});