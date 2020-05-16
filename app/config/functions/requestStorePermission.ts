import {  Alert, PermissionsAndroid } from 'react-native';

export async function requestStorePermission() {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
                'title': 'Разрешение на загрузку изображений',
                'message': 'Приложению требуется доступ к хранилищу для сохранения изображений',
                 buttonPositive: 'OK',
            }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            return true;
        }
        else {
            Alert.alert("Права не предоставлены");
            return false
        }
    } catch (err) {
        console.warn(err);
        return false
    }
}