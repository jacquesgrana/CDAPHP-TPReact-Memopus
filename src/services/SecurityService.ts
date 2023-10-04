import { toast } from "react-toastify";
import IUser from "../interfaces/IUser";
import JsonUserService from "./JsonUserService";

/**
 * Classe qui gère la connexion d'un user
 * Utilise les patterns singleton et observer
 */
export default class SecurityService {
  private _isLogged: boolean = false;
  private _id: string | null = null;
  private _username: string | null = null;
  private listeners: Function[] = [];

  private static _instance: SecurityService | null = null;

  private constructor() {}

  /**
   * Design pattern singleton
   * @returns SecurityService
   */
  public static getInstance(): SecurityService {
    if (this._instance === null) {
      this._instance = new SecurityService();
    }
    return this._instance;
  }

  /**
   * Design pattern observer pour répercuter isLogged
   */
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

  /**
   * Fonction qui renvoi vrai si username/pwd sont reconnus dans la bd
   * @param username 
   * @param pwd 
   * @returns 
   */
  public async connect(username: string, pwd: string): Promise<boolean | void> {
    const userService = JsonUserService.getInstance();
    const users = (await userService.loadUsers()) as IUser[];
    const isUserMatch = users.some(
      (u) => u.username === username && u.pwd === pwd
    );
    this._isLogged = isUserMatch;
    return isUserMatch;
  }

  /**
   * Fonction fait la déconnexion et appelle une callback
   * @param callback 
   */
  public async disconnect(callback: () => void) {
    this._isLogged = false;
    this.notifyListeners();
    toast.success('Déconnexion');
    callback();
  }
}
