export interface InputField {
    value: string,
    required: boolean,
    blank: boolean
}

export interface  FormState {
    fields: {
        name: InputField,
        phone: InputField,
        mail: InputField,
        message: InputField
    },
    input_error: boolean,
    server_error: boolean
}