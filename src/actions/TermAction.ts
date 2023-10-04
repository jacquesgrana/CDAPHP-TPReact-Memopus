import { ActionFunctionArgs, redirect } from "react-router-dom";
import JsonTermService from "../services/JsonTermService";
import ITerm from "../interfaces/ITerm";
import { toast } from "react-toastify";
import LoadTermObservable from "../observables/LoadTermObservable";

/**
 * Fonction 'action', déclenchée par la route '/addTerm'
 * qui récupère les données du formulaire, construit l'objet à insérer
 * et demande la requête d'insertion.
 * Avec, après, demande de notification par l'observable 
 * LoadTermObservable aux observers pour la mise à jour de l'affichage.
 * @param param0 
 * @returns 
 */
export const actionAddTerm = async({request}: ActionFunctionArgs) => {
    const formData = await request.formData();
    let name = formData.get("name") as string;
    name = name.trim().toUpperCase();
    const termService= JsonTermService.getInstance();
    const termObservable = LoadTermObservable.getInstance();
    const terms = await termService.loadTerms();
    if(terms !== undefined) {
        const map = terms?.map(t => t.id);
        if (map !== undefined) {
            const maxId = Math.max( ...map);
            const selected = false;
            const newTerm: ITerm = {
                id: maxId+1,
                name: name,
                selected: selected
            };
            await termService.addTerm(newTerm);
            toast.success('Nouveau Terme ajouté : ' + newTerm.name);
            termObservable.reloadTerms = true;
            termObservable.notifyListeners();
            return redirect("/home");
        }
    }
}