import { ActionFunctionArgs } from "react-router-dom";
import SecurityService from "../services/SecurityService";
import { redirect } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import JsonUserService from "../services/JsonUserService";
import IUser from "../interfaces/IUser";

/**
 * Fonction 'action', déclenchée par la route '/login'
 * qui récupère les données du formulaire et fait la demande
 * de connexion.
 * Avec, après, demande de notification par l'observable 
 * SecurityService aux observers pour la mise à jour de 
 * l'affichage du header.
 * Et redirection vers la homepage en cas de succès
 * ou vers la page de login sinon.
 * @param param0 
 * @returns 
 */
export const actionLogin = async({request}: ActionFunctionArgs) => {
    const formData = await request.formData();
    const username = formData.get("username") as string;
    const pwd = formData.get("pwd") as string;

    const security = SecurityService.getInstance();
    const isConnected = await security.connect(username, pwd);

    if (isConnected) {
        security.username = username;
        security.isLogged = true; //
        security.notifyListeners(); //
        const users = await JsonUserService.getInstance().loadByUsername(username) as IUser[];
        if(users.length > 0) {
            security.id = users[0].id;
        }
        toast.success('Connexion réussie');
        return redirect("/home");
    } else {
        security.isLogged = false; //
        security.notifyListeners(); //
        toast.error('Utilisateur non reconnu');
        return redirect("/connect");
    }
}
