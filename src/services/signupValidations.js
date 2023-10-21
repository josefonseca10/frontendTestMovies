import Validations from "@/services/validations";

export default class SignupValidations {
    constructor(email, password, firstName, lastName, username) {
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
    }

    checkValidations() {
        let errors = [];
        if (!Validations.checkEmail(this.email)) {
            errors['email'] = 'Invalid Email';
        }

        if (!Validations.minLength(this.password, 6)){
            errors['password'] = 'Password should be 6 characters';
        }

        if (!Validations.minLength(this.firstName, 1)){
            errors['firstName'] = 'FirstName is required';
        }

        if (!Validations.minLength(this.lastName, 1)){
            errors['lastName'] = 'LastName is required';
        }

        if (!Validations.minLength(this.username, 1)){
            errors['username'] = 'Username is required';
        }

        if (!Validations.minLength(this.email, 1)){
            errors['email'] = 'Email is required';
        }

        return errors;
    }
}