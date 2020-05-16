var RNFS = require('react-native-fs');
import {Platform} from "react-native";

export async function saveComMetImage(data) {
    const extension = (Platform.OS === 'android') ? 'file://' : '';
    data.map((index) => {
        const img_part = index.photo_amp_1.slice(12);
        const uri = "https://www.vekomet.ru" + index.photo_amp_1;
        const path = `${extension}${RNFS.DocumentDirectoryPath}${img_part}`;
        RNFS.exists(path).then(exist => {
            if (!exist) {
                RNFS.downloadFile({fromUrl: uri, toFile: path}).promise
                    .then(res => {
                    })
            }
        })
    });
}

export async function saveElectroImage(data) {
    const extension = (Platform.OS === 'android') ? 'file://' : '';
    data.map((index) => {
        const img_part = index.foto_app.slice(12);
        const uri = "https://vekolom.ru" + index.foto_app;
        const path = `${extension}${RNFS.DocumentDirectoryPath}${img_part}`;
        RNFS.exists(path).then(exist => {
            if (!exist) {
                RNFS.downloadFile({fromUrl: uri, toFile: path}).promise
                    .then(res => {
                    })
            }
        })
    });
}



export async function saveAdvantImage(data) {
    const extension = (Platform.OS === 'android') ? 'file://' : '';
    data.map((index) => {
        const img_part = index.icon_image.slice(12);
        const uri = "https://vekokat.ru" + index.icon_image;
        const path = `${extension}${RNFS.DocumentDirectoryPath}${img_part}`;
        RNFS.exists(path).then(exist => {
            if (!exist) {
                RNFS.downloadFile({fromUrl: uri, toFile: path}).promise
                    .then(res => {
                    })
            }
        })
    });
}

export async function saveLaborImage(data) {
    const extension = (Platform.OS === 'android') ? 'file://' : '';
    data.map((index) => {
        const img_part = index.icon_image.slice(12);
        const uri = "https://vekokat.ru" + index.icon_image;
        const path = `${extension}${RNFS.DocumentDirectoryPath}${img_part}`;
        RNFS.exists(path).then(exist => {
            if (!exist) {
                RNFS.downloadFile({fromUrl: uri, toFile: path}).promise
                    .then(res => {
                    })
            }
        })
    });
}

export async function saveRegionImage(data) {
    const extension = (Platform.OS === 'android') ? 'file://' : '';
    data.map((index) => {
        const img_part = index.icon_image.slice(12);
        const uri = "https://vekokat.ru" + index.icon_image;
        const path = `${extension}${RNFS.DocumentDirectoryPath}${img_part}`;
        RNFS.exists(path).then(exist => {
            if (!exist) {
                RNFS.downloadFile({fromUrl: uri, toFile: path}).promise
                    .then(res => {
                    })
            }
        })
    });
}

export async function savePriceImage(data) {
    const extension = (Platform.OS === 'android') ? 'file://' : '';
    data.map((index) => {
        const img_part = index.image.slice(12);
        const uri = "https://vekokat.ru" + index.image;
        const path = `${extension}${RNFS.DocumentDirectoryPath}${img_part}`;
        RNFS.exists(path).then(exist => {
            if (!exist) {
                RNFS.downloadFile({fromUrl: uri, toFile: path}).promise
                    .then(res => {
                    })
            }
        })
    });
}

export async function saveMethodImage(data) {
    const extension = (Platform.OS === 'android') ? 'file://' : '';
    data.map((index) => {
        const img_part = index.image.slice(12);
        const uri = "https://vekokat.ru" + index.image;
        const path = `${extension}${RNFS.DocumentDirectoryPath}${img_part}`;
        RNFS.exists(path).then(exist => {
            if (!exist) {
                RNFS.downloadFile({fromUrl: uri, toFile: path}).promise
                    .then(res => {
                    })
            }
        })
    });
}