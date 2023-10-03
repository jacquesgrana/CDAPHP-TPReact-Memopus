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

  public get reloadTerms() {
    return this._reloadDatas;
  }

  public set reloadTerms(value : boolean) {
    this._reloadDatas = value;
  }
}