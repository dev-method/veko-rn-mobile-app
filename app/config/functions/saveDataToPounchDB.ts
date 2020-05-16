import { catalogInterface } from '../../config/interfaces/catalizators/catalogInterface'
export async function saveDataToPounchDB(db, data) {
    data.map((index) =>
        (
            db.get(index.slug).catch(function (error) {
                if (error.name === 'not_found') {
                    return {
                        _id: index.slug,
                        title: index.title,
                        price: index.price,
                        description_amp: index.description_amp,
                        description_clear: index.description_clear,
                        group: index.group,
                        photo_amp_1: index.photo_amp_1,
                        photo_amp_2: index.photo_amp_2,
                        photo_amp_3: index.photo_amp_3
                    };
                }
            }).then(function (doc) {
                doc._id = index.slug;
                doc.title = index.title;
                doc.price = index.price;
                doc.description_amp = index.description_amp;
                doc.description_clear = index.description_clear;
                doc.group = index.group;
                doc.photo_amp_1 = index.photo_amp_1;
                doc.photo_amp_2 = index.photo_amp_2;
                doc.photo_amp_3 = index.photo_amp_3;
                return db.put(doc);
            })
        ));
}

export async function saveAdvantToPounchDB(db, data) {
    data.map((index) =>
        (
            db.get(index.icon_image).catch(function (error) {
                if (error.name === 'not_found') {
                    return {
                        _id: index.icon_image,
                        text: index.text,
                        icon_image: index.icon_image,
                        group: index.group
                    };
                }
            }).then(function (doc) {
                doc._id = index.icon_image;
                doc.text = index.text;
                doc.icon_image = index.icon_image;
                doc.group = index.group;
                return db.put(doc);
            })
        ));
}

export async function saveLaborToPounchDB(db, data) {
    data.map((index) =>
        (
            db.get(index.icon_image).catch(function (error) {
                if (error.name === 'not_found') {
                    return {
                        _id: index.icon_image,
                        icon_image: index.icon_image,
                        text: index.text,
                        group: index.group
                    };
                }
            }).then(function (doc) {
                doc._id = index.icon_image;
                doc.icon_image = index.icon_image;
                doc.text = index.text;
                doc.group = index.group;
                return db.put(doc);
            })
        ));
}

export async function saveRegionToPounchDB(db, data) {
    data.map((index) =>
        (
            db.get(index.icon_image).catch(function (error) {
                if (error.name === 'not_found') {
                    return {
                        _id: index.icon_image,
                        icon_image: index.icon_image,
                        text: index.text,
                        group: index.group
                    };
                }
            }).then(function (doc) {
                doc._id = index.icon_image;
                doc.icon_image = index.icon_image;
                doc.text = index.text;
                doc.group = index.group;
                return db.put(doc);
            })
        ));
}

export async function savePriceToPounchDB(db, data) {
    data.map((index) =>
        (
            db.get(index.image).catch(function (error) {
                if (error.name === 'not_found') {
                    return {
                        _id: index.image,
                        image: index.image,
                        title: index.title,
                        text: index.text,
                        price: index.price,
                        group: index.group
                    };
                }
            }).then(function (doc) {
                doc._id = index.image;
                doc.image = index.image;
                doc.title = index.title;
                doc.text = index.text;
                doc.price = index.price;
                doc.group = index.group;
                return db.put(doc);
            })
        ));
}
export async function saveMethodToPounchDB(db, data) {
    data.map((index) =>
        (
            db.get(index.image).catch(function (error) {
                if (error.name === 'not_found') {
                    return {
                        _id: index.image,
                        number: index.number,
                        text: index.text,
                        image: index.image,
                        group: index.group
                    };
                }
            }).then(function (doc) {
                doc._id = index.image;
                doc.number = index.number;
                doc.text = index.text;
                doc.image = index.image;
                doc.group = index.group;
                return db.put(doc);
            })
        ));
}

export async function saveMessToPounchDB(db, state) {
    db.get(state.fields.message.value).catch(function (error) {
        if (error.name === 'not_found') {
            return {
                _id: state.fields.message.value,
                name: state.fields.name.value,
                phone: state.fields.phone.value,
                mail: state.fields.mail.value,
                message: state.fields.message.value,
            };
        }
    }).then(function (doc) {
        doc._id = state.fields.message.value;
        doc.name = state.fields.name.value;
        doc.phone = state.fields.phone.value;
        doc.mail = state.fields.mail.value;
        doc.message = state.fields.message.value;
        return db.put(doc);
    });
}

export async function saveElectroToPounchDB(db, data) {
    data.map((index) =>
        (
            db.get(index.name+index.foto_app).catch(function (error) {
                if (error.name === 'not_found') {
                    return {
                        _id: index.name+index.foto_app,
                        category: index.category,
                        description: index.description,
                        foto_app: index.foto_app,
                        name: index.name,
                        order: index.order,
                        price: index.price,
                        price_title: index.price_title,
                        price_2: index.price_2,
                        price2_title: index.price2_title,
                        price_3: index.price_3,
                        price3_title: index.price3_title,
                        rules: index.rules,
                        title: index.title
                    };
                }
            }).then(function (doc) {
                    doc._id = index.name+index.foto_app;
                    doc.category = index.category;
                    doc.description = index.description;
                    doc.foto_app = index.foto_app;
                    doc.name = index.name;
                    doc.order = index.order;
                    doc.price = index.price;
                    doc.price_title = index.price_title;
                    doc.price_2 = index.price_2;
                    doc.price2_title = index.price2_title;
                    doc.price_3 = index.price_3;
                    doc.price3_title = index.price3_title;
                    doc.rules = index.rules;
                    doc.title = index.title;
                    return db.put(doc);
            })
        ));
}

export async function saveCatalogToPounchDB(db, data:catalogInterface[]) {
    data.map((index) =>
        (
            db.get(index.auto_model+index.year).catch(function (error) {
                if (error.name === 'not_found') {
                    return {
                        _id: index.auto_model+index.year,
                        auto_model: index.auto_model,
                        year: index.year,
                        weight: index.weight,
                        price_kg: index.price_kg,
                        sum: index.sum,
                        category: index.category
                    };
                }
            }).then(function (doc) {
                doc._id = index.auto_model+index.year;
                doc.auto_model = index.auto_model;
                doc.year = index.year;
                doc.weight = index.weight;
                doc.price_kg = index.price_kg;
                doc.sum = index.sum;
                doc.category = index.category;
                return db.put(doc);
            })
        ));
}