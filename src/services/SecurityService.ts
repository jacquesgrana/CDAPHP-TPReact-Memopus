export default class SecurityService{
    private _isLogged: boolean = false;

    private static _instance: SecurityService | null= null;

    private constructor() {}

    public static getIntance(): SecurityService {
        return this._instance === null ? new SecurityService() : this._instance;
    }

    public get isLogged(): boolean {
        return this._isLogged;
    }

    public set isLogged(value: boolean) {
        this._isLogged = value;
    }
}