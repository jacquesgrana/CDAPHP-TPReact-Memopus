import ITerm from "../interfaces/ITerm";

export default class JsonTermService {
    private _url: string = "http://localhost:3001/";
    //private _urlUsers: string = this._url + "users";
    //private _urlColumns: string = this._url + "colums";
    private _urlTerms: string = this._url + "terms";
    //private _urlCards: string = this._url + "cards";

    private static _instance: JsonTermService | null = null;

    private constructor() {}

    public static getInstance(): JsonTermService {
        return this._instance === null ? new JsonTermService() : this._instance;
    }

    public async loadTerms(): Promise<ITerm[] | null> {
        try {
            const response = await fetch(this._urlTerms, {
                headers: {
                  'Cache-Control': 'no-cache',
                }
              });
            const terms = await response.json();
            return terms;
        } catch (e) {
            console.error(e);
            return null;
        }
    }
}