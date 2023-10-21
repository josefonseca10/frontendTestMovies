import Validations from "@/services/validations";

export default class LoginValidations {
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }

    checkValidations() {
        let errors = [];
        if (!Validations.checkEmail(this.email)) {
            errors['email'] = 'Invalid Email';
        }

        if (!Validations.minLength(this.password, 6)){
            errors['password'] = 'Password should be 6 characters';
        }

        if (!Validations.minLength(this.email, 1)){
            errors['email'] = 'Email is required';
        }

        return errors;
    }
}