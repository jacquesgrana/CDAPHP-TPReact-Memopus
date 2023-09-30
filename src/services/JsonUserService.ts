import IUser from "../interfaces/IUser";

export default class JsonUserService {
    private _url: string = "http://localhost:3001/";
    private _urlUsers: string = this._url + "users";
    //private _urlColumns: string = this._url + "colums";
    //private _urlTerms: string = this._url + "terms";
    //private _urlCards: string = this._url + "cards";

    private static _instance: JsonUserService | null = null;

    private constructor() {}

    public static getInstance(): JsonUserService {
        return this._instance === null ? new JsonUserService() : this._instance;
    }

    public async loadUsers(): Promise<IUser[] | void> {
        return fetch(this._urlUsers)
        .then(response => {
            return response.json();
        })
        .then (users => {
            //console.log('UserServ : users :', users);
            return users;
        })
        .catch(e => {
            console.error(e);
        })
    }

    /** a tester, pas sur que ca marche */
    public async loadByUsername(username: string): Promise<IUser[] | void> {
        return fetch(`${this._urlUsers}?username=${username}`)
        .then(response => {
            return response.json();
        })
        .then (users => {
            //console.log('UserServ : users :', users);
            return users;
        })
        .catch(e => {
            console.error(e);
        })
    }
}