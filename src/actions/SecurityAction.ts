import { ActionFunctionArgs } from "react-router-dom";
import SecurityService from "../services/SecurityService";
import { redirect } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import JsonUserService from "../services/JsonUserService";
import IUser from "../interfaces/IUser";


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
    //return { redirect: isConnected ? '/home' : '/connect' };
}
