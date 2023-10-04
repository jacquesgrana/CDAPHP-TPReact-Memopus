/**
 * Classe utilisant les design patterns 'singleton' et 'observer'
 * pour provoquer la mise à jour des terms et des affichages
 */
export default class LoadTermObservable {
    private _reloadTerms: boolean = false;
    
    private static _instance: LoadTermObservable | null = null;

    private listeners: Function[] = [];

    private constructor() {}

    /**
   * Design pattern singleton
   * @returns LoadTermObservable
   */
  public static getInstance(): LoadTermObservable {
    if (this._instance === null) {
      this._instance = new LoadTermObservable();
    }
    return this._instance;
  }

  /**
   * Design pattern observer pour répercuter _reloadTerms
   */
  public notifyListeners() {
    this.listeners.forEach((listener) => {
      listener(this._reloadTerms);
    });
    this._reloadTerms = false;
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

  public get reloadTerms() {
    return this._reloadTerms;
  }

  public set reloadTerms(value : boolean) {
    this._reloadTerms = value;
  }
}