import ITerm from "../interfaces/ITerm";

/**
 * Classe gérant les accès au fichier json par json-server
 * concernant le table des terms
 * Utilise le pattern singleton
 */
export default class JsonTermService {
  private _url: string = "http://localhost:3001/";
  private _urlTerms: string = this._url + "terms";

  private static _instance: JsonTermService | null = null;

  private constructor() {}

  public static getInstance(): JsonTermService {
    if (this._instance === null) {
      this._instance = new JsonTermService();
    }
    return this._instance;
  }

     /**
     * Fonction qui récupère et renvoi la liste des terms
     * @returns 
     */
  public async loadTerms(): Promise<ITerm[] | null> {
    try {
      const response = await fetch(this._urlTerms, {
        headers: {
          "Cache-Control": "no-cache",
        },
      });
      const terms = await response.json();
      return terms;
    } catch (e) {
      console.error(e);
      return null;
    }
  }

    /**
     * Fonction qui fait la requête d'insertion d'un term
     * @param term 
     * @returns 
     */
  public async addTerm(term: ITerm) {
    try {
      const response = await fetch(this._urlTerms, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(term),
        method: "POST"
      }).then(function (res) {
        //console.log('res requete', res);
      });
    } catch (e) {
      console.error(e);
      return null;
    }
  }

      /**
     * Fontcion qui fait la requête DELETE d'un term 
     * selon son id
     * @param id 
     * @returns 
     */
  public async deleteTerm(id: number) {
    try {
      const response = await fetch(`${this._urlTerms}/${id}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },method: "DELETE"
      }).then(function (res) {
        //console.log('res requete', res);
      });
    } catch (e) {
      console.error(e);
      return null;
    }
  }
}
