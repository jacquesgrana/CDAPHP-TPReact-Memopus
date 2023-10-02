import { toast } from "react-toastify";
import IUser from "../interfaces/IUser";
import JsonUserService from "./JsonUserService";
import { redirect } from "react-router-dom";

export default class SecurityService {
  private _isLogged: boolean = false;
  private _id: string | null = null;
  private _username: string | null = null;
  private listeners: Function[] = [];

  private static _instance: SecurityService | null = null;

  private constructor() {}

  /*
  public static getInstance(): SecurityService {
    return this._instance === null ? new SecurityService() : this._instance;
  }*/

  public static getInstance(): SecurityService {
    if (this._instance === null) {
      this._instance = new SecurityService();
    }
    return this._instance;
  }

  public notifyListeners() {
    //console.log('notify :');
    //console.log('listeners :', this.listeners)
    this.listeners.forEach((listener) => {
      listener(this._isLogged);
      
    });
  }

  public addListener(listener: Function): void {
    //console.log('add listener')
    this.listeners.push(listener);
  }

  public removeListener(listener: Function) {
    const index = this.listeners.indexOf(listener);
    if (index !== -1) {
      this.listeners.splice(index, 1);
    }
  }

  public get isLogged(): boolean {
    return this._isLogged;
  }

  public set isLogged(value: boolean) {
    this._isLogged = value;
  }

  public get id(): string | null {
    return this._id;
  }

  public set id(idToSet: string | null) {
    this._id = idToSet;
  }

  public get username(): string | null {
    return this._username;
  }

  public set username(usernameToSet: string | null) {
    this._username = usernameToSet;
  }

  public async connect(username: string, pwd: string): Promise<boolean | void> {
    //console.log('SecuServ : username :', username);
    //console.log('SecuServ : pwd :', pwd);
    const userService = JsonUserService.getInstance();
    // charger liste utilisateur
    // appeler fonction JsonUserService qui renvoie la liste
    const users = (await userService.loadUsers()) as IUser[];
    // faire un some sur la liste
    const isUserMatch = users.some(
      (u) => u.username === username && u.pwd === pwd
    );
    this._isLogged = isUserMatch;
    //console.log('SecuServ : isUserMatch :', isUserMatch);
    return isUserMatch ? true : false;
    // si filter renvoie une valeur --> ok
    // si filter renvoie rien --> ko
    // set isLogged a la fin
  }
  
  public async disconnect(callback: () => void) {
    this._isLogged = false;
    this.notifyListeners();
    toast.success('Déconnexion');
    callback();
  }
/*
  public async disconnect() {
    this._isLogged = false; //
    this.notifyListeners(); //
    toast.success('Déconnexion');
    return redirect("/connect");
  }*/
}
