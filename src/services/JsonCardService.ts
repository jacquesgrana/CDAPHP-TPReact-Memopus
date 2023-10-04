import ICard from "../interfaces/ICard";

/**
 * Classe gérant les accès au fichier json par json-server
 * concernant le table des cards
 * Utilise le pattern singleton
 */
export default class JsonCardService {
    private _url: string = "http://localhost:3001/";
    private _urlCards: string = this._url + "cards";

    private static _instance: JsonCardService | null = null;

    private constructor() {}

    public static getInstance(): JsonCardService {
        if (this._instance === null) {
          this._instance = new JsonCardService();
        }
        return this._instance;
      }

    /**
     * Fonction qui récupère et renvoi la liste des cards
     * @returns 
     */
    public async loadCards(): Promise<ICard[] | null> {
        try {
            const response = await fetch(this._urlCards, {
                headers: {
                  'Cache-Control': 'no-cache',
                }
              })
              
            const cards = await response.json();
            return cards;
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    /**
     * Fonction qui fait la requête d'insertion d'une card
     * @param card 
     * @returns 
     */
    public async addCard(card: ICard) {
      try {
        const response = await fetch(this._urlCards, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(card),
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
     * Fonction qui fait la requête PATCH pour mettre à jour 
     * column d'une card selon son id
     * @param id 
     * @param column 
     * @returns 
     */
    public async patchCardColumn(id: number, column: number) {
      try {
        const response = await fetch(`${this._urlCards}/${id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({column: column}),
          method: "PATCH"
        }).then(function (res) {
          //console.log('res requete', res);
        });
      } catch (e) {
        console.error(e);
        return null;
      }
    }

    /**
     * Fonction qui fait la requête DELETE d'une card 
     * selon son id
     * @param id 
     * @returns 
     */
    public async deleteCard(id: number) {
      try {
        const response = await fetch(`${this._urlCards}/${id}`, {
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