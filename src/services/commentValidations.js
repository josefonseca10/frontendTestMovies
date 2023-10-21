import Validations from "@/services/validations";

export default class CommentValidations {
    constructor(comment, qualification) {
        this.comment = comment;
        this.qualification = qualification;
    }

    checkValidations() {
        let errors = [];

        if (!Validations.minLength(this.comment, 1)){
            errors['comment'] = 'comment should be 1 characters min length';
        }

        if (!Validations.maxLength(this.comment, 50)){
            errors['comment'] = 'name should be 50 characters max length';
        }

        if (!Validations.minNumber(this.qualification)){
            errors['qualification'] = 'qualification should be more 0';
        }
        return errors;
    }
}