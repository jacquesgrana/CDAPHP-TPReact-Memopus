/**
 * Classe utilisant les design patterns 'singleton' et 'observer'
 * utilisée pour provoquer la mise à jour des données et des 
 * affichages
 */
export default class LoadDataObservable {
    private _reloadDatas: boolean = false;
    
    private static _instance: LoadDataObservable | null = null;

    private listeners: Function[] = [];

    private constructor() {}

  /**
   * Design pattern singleton
   * @returns LoadTermObservable
   */
  public static getInstance(): LoadDataObservable {
    if (this._instance === null) {
      this._instance = new LoadDataObservable();
    }
    return this._instance;
  }

  /**
   * Design pattern observer pour répercuter _reloadDatas
   * qui provoque la mise à jour des données et de l'affichage
   */
  public notifyListeners() {
    this.listeners.forEach((listener) => {
      listener(this._reloadDatas);
    });
    this._reloadDatas = false;
  }

  public addListener(listener: Function): void {
    this.listeners.push(listener);
  }

  public removeListener(listener: Function) {
    const index = this.listeners.indexOf(listener);
    if (index !== -1) {
      this.listeners.splice(index, 1);
    }
  }

  public get reloadDatas() {
    return this._reloadDatas;
  }

  public set reloadDatas(value : boolean) {
    this._reloadDatas = value;
  }
}