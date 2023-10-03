import ICard from "../interfaces/ICard";

export default class JsonCardService {
    private _url: string = "http://localhost:3001/";
    //private _urlUsers: string = this._url + "users";
    //private _urlColumns: string = this._url + "colums";
    //private _urlTerms: string = this._url + "terms";
    private _urlCards: string = this._url + "cards";

    private static _instance: JsonCardService | null = null;

    private constructor() {}

    public static getInstance(): JsonCardService {
        if (this._instance === null) {
          this._instance = new JsonCardService();
        }
        return this._instance;
      }


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

    public async addCard(card: ICard) {
      try {
        //card.column = Number(card.column);
        //card.tid = Number(card.tid);
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

    public async patchCardColumn(id: number, column: number) {
      try {
        //card.column = Number(card.column);
        //card.tid = Number(card.tid);
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
}