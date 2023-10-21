export default class Validations {
    static checkEmail(email) {
        return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
    }

    static minLength(name, minLength) {
        return name.length >= minLength;
    }

    static maxLength(name, maxLength) {
        return name.length <= maxLength;
    }

    static minNumber(name) {
        return name > 0;
    }
}