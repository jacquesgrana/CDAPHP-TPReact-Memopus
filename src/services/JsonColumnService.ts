import Config from "../configs/Config";
import IColumn from "../interfaces/IColumn";

/**
 * Classe gérant les accès au fichier json par json-server
 * concernant le table des columns
 * Utilise le pattern singleton
 */
export default class JsonColumnService {
    private _urlColumns: string = Config.SERVER_URL + "/columns";

    private static _instance: JsonColumnService | null = null;

    private constructor() {}

    public static getInstance(): JsonColumnService {
        if (this._instance === null) {
          this._instance = new JsonColumnService();
        }
        return this._instance;
      }

          /**
     * Fonction qui récupère et renvoie la liste des columns
     * @returns 
     */
    public async loadColumns(): Promise<IColumn[] | null> {
        try {
            const response = await fetch(this._urlColumns, {
                headers: {
                  'Cache-Control': 'no-cache',
                }
              });
            const columns = await response.json();
            return columns;
        } catch (e) {
            console.error(e);
            return null;
        }
    }
    
}