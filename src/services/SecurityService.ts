import IUser from "../interfaces/IUser";
import JsonUserService from "./JsonUserService";

export default class SecurityService{
    private _isLogged: boolean = false;
    private _id: string | null = null;
    private _username: string | null = null;

    private static _instance: SecurityService | null= null;

    private constructor() {}

    public static getInstance(): SecurityService {
        return this._instance === null ? new SecurityService() : this._instance;
    }

    public get isLogged(): boolean {
        return this._isLogged;
    }

    public set isLogged(value: boolean) {
        this._isLogged = value;
    }

    public get id(): string | null {
        return this._id;
    }

    public set id(idToSet: string | null) {
        this._id = idToSet;
    }

    public get username(): string | null {
        return this._username;
    }

    public set username(usernameToSet: string | null) {
        this._username = usernameToSet;
    }

    public async connect(username: string, pwd: string): Promise<boolean | void> {
        //console.log('SecuServ : username :', username);
        //console.log('SecuServ : pwd :', pwd);
        const userService = JsonUserService.getInstance();
        // charger liste utilisateur
        // appeler fonction JsonUserService qui renvoie la liste
        const users = await userService.loadUsers() as IUser[];
        // faire un some sur la liste
        const isUserMatch = users.some(u => u.username === username && u.pwd === pwd);
        this._isLogged = isUserMatch;
        //console.log('SecuServ : isUserMatch :', isUserMatch);
        return isUserMatch ? true : false;
        // si filter renvoie une valeur --> ok
        // si filter renvoie rien --> ko
        // set isLogged a la fin

    }
}