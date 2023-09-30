export default class JsonCardService {
    private _url: string = "http://localhost:3001/";
    //private _urlUsers: string = this._url + "users";
    //private _urlColumns: string = this._url + "colums";
    //private _urlTerms: string = this._url + "terms";
    private _urlCards: string = this._url + "cards";

    private _instance: JsonCardService | null = null;

    private constructor() {}

    public getInstance(): JsonCardService {
        return this._instance === null ? new JsonCardService() : this._instance;
    }
}