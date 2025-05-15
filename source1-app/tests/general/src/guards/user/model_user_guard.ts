import { Guard, HTTP_STATUS_CODE, assign, textResult } from "fortjs";
import { User } from "../../models/user";
import { validate } from "class-validator";

export class ModelUserGuard extends Guard {
    constructorValue: string;
    constructor(@assign('hello') value: string) {
        super();
        this.constructorValue = value;
    }

    async check(@assign('injection ok in guard') value: string) {
        // throw new Error("thrown by guard");
        console.log("data", this.data);
        if (this.query.guard_injection_test != null) {
            return textResult(`${this.constructorValue} ${value}`, 200);
        }
        if (this.request.headers['throwexceptionbyguard'] != null) {
            throw new Error("thrown by guard");
        }
        const params = this.param;
        const query = this.query;
        const data = this.data;
        // const user: User = new User().init(this.body);
        const user: User = new User(this.body);
        const errors = await validate('User', user);
        if (errors.length === 0) {
            // pass this to method, so that they dont need to parse again
            this.data.user = user;
            return null;
        }
        else {
            const error = errors[0];
            const constraint = Object.keys(error.constraints)[0];
            const errMessage = error.constraints[constraint];
            return textResult(errMessage, HTTP_STATUS_CODE.BadRequest)
        }
    }
}