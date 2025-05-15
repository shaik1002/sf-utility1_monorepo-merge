
import { HTTP_RESULT_TYPE, MIME_TYPE } from "../enums";
import { HTTP_STATUS_CODE } from "../enums/http_status_code";
import { IHttpResult } from "../interfaces";

export const jsonResult = (value: any, statusCode?: HTTP_STATUS_CODE) => {
    return {
        contentType: MIME_TYPE.Json,
        responseData: value,
        statusCode: statusCode || HTTP_STATUS_CODE.Ok,
        type: HTTP_RESULT_TYPE.Default
    } as IHttpResult;
};