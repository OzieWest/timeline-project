/// <reference path="jquery/jquery.d.ts" />
/// <reference path="angularjs/angular.d.ts" />
/// <reference path="angularjs/angular-route.d.ts" />
/// <reference path="toastr/toastr.d.ts" />
/// <reference path="underscore/underscore.d.ts" />

interface IBaseModel {
    _id?: string;
    _created?: string;
    _updated?: string;
}

interface IUser extends IBaseModel {
    username: string;
    displayName: string;
    password: string;
    salt: string;
    role: string;
}

interface ITask extends IBaseModel {
    userId?: string;
    message: string;
    status: string;
    remove?: Function;
}