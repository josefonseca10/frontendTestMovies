import Validations from "@/services/validations";

export default class MovieValidations {
    constructor(name, description, image) {
        this.name = name;
        this.description = description;
        this.image = image;
    }

    checkValidations() {
        let errors = [];

        if (!Validations.minLength(this.name, 1)){
            errors['name'] = 'name should be 1 characters min length';
        }

        if (!Validations.maxLength(this.name, 20)){
            errors['name'] = 'name should be 20 characters max length';
        }

        if (!Validations.minLength(this.description, 1)){
            errors['description'] = 'description should be 1 characters min length';
        }

        if (!Validations.maxLength(this.description, 90)){
            errors['description'] = 'description should be 90 characters max length';
        }

        if (this.image === null){
            errors['image'] = 'image is requerid';
        }

        return errors;
    }
}