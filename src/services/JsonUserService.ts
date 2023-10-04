import Config from "../configs/Config";
import IUser from "../interfaces/IUser";

/**
 * Classe gérant les accès au fichier json par json-server
 * concernant le table des users
 * Utilise le pattern singleton
 */
export default class JsonUserService {
    //private _url: string = "http://localhost:3001/";
    private _urlUsers: string = Config.SERVER_URL + "/users";

    private static _instance: JsonUserService | null = null;

    private constructor() {}

    public static getInstance(): JsonUserService {
        if (this._instance === null) {
          this._instance = new JsonUserService();
        }
        return this._instance;
      }
    
    /**
     * Fonction qui récupère et renvoi la liste des users
     * @returns 
     */
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

    /**
     * Fonction qui récupère un user par son username
     * @param username 
     * @returns 
     */
    public async loadByUsername(username: string): Promise<IUser[] | void> {
        return fetch(`${this._urlUsers}?username=${username}`, {
            headers: {
              'Cache-Control': 'no-cache',
            }
          })
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