"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpResponse = void 0;
var HttpResponse;
(function (HttpResponse) {
    HttpResponse[HttpResponse["SUCCESS"] = 200] = "SUCCESS";
    HttpResponse[HttpResponse["CREATED"] = 201] = "CREATED";
    HttpResponse[HttpResponse["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    HttpResponse[HttpResponse["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    HttpResponse[HttpResponse["FORBIDDEN"] = 403] = "FORBIDDEN";
    HttpResponse[HttpResponse["NOT_FOUND"] = 404] = "NOT_FOUND";
    HttpResponse[HttpResponse["NOT_ACCEPTABLE"] = 406] = "NOT_ACCEPTABLE";
    HttpResponse[HttpResponse["REQUEST_TIMEOUT"] = 408] = "REQUEST_TIMEOUT";
    HttpResponse[HttpResponse["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
})(HttpResponse = exports.HttpResponse || (exports.HttpResponse = {}));
