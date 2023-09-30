import IColumn from "../interfaces/IColumn";

export default class JsonColumnService {
    private _url: string = "http://localhost:3001/";
    //private _urlUsers: string = this._url + "users";
    private _urlColumns: string = this._url + "columns";
    //private _urlTerms: string = this._url + "terms";
    //private _urlCards: string = this._url + "cards";

    private static _instance: JsonColumnService | null = null;

    private constructor() {}

    public static getInstance(): JsonColumnService {
        return this._instance === null ? new JsonColumnService() : this._instance;
    }

    public async loadColumns(): Promise<IColumn[] | null> {
        try {
            const response = await fetch(this._urlColumns);
            const columns = await response.json();
            return columns;
        } catch (e) {
            console.error(e);
            return null;
        }
    }
    
}