import { Controller, HttpCookie, worker, HTTP_METHOD, textResult, jsonResult, route, HTTP_STATUS_CODE } from "fortjs";

export class CookieController extends Controller {

    @worker(HTTP_METHOD.Post)
    @route('/{cookieName}')
    async setCookie() {
        const cookieName = this.param.cookieName;
        const cookieValue = this.body.cookieValue;
        const cookie = new HttpCookie(cookieName, cookieValue);
        cookie.maxAge = 5000;
        this.cookie.addCookie(cookie);
        return jsonResult(cookie);
    }

    @worker(HTTP_METHOD.Get)
    @route('/{cookieName}')
    async getCookie() {
        console.log("cookies all inside get cookie", this.cookie.cookieCollection);
        const cookieName = this.param.cookieName;
        if (this.cookie.isExist(cookieName)) {
            const cookie = this.cookie.getCookie(cookieName);
            return jsonResult(cookie);
        }
        else {
            return textResult('cookie not found', HTTP_STATUS_CODE.NotFound);
        }

    }


    @worker(HTTP_METHOD.Put)
    @route('/{cookieName}')
    async updateCookie() {
        const cookieName = this.param.cookieName;
        const cookieValue = this.body.cookieValue;
        // const savedCookie = this.cookie.getCookie(cookieName);
        // this.cookie.removeCookie(savedCookie);
        const cookie = new HttpCookie(cookieName, cookieValue);
        this.cookie.addCookie(cookie);
        return jsonResult(cookie);
    }

    @worker(HTTP_METHOD.Delete)
    @route('/{cookieName}')
    async removeCookie() {
        const cookieName = this.param.cookieName;
        const cookie = this.cookie.getCookie(cookieName);
        this.cookie.removeCookie(cookie);
        return textResult('deleted');
    }
}