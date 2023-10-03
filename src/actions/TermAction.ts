import { ActionFunctionArgs, redirect } from "react-router-dom";
import JsonTermService from "../services/JsonTermService";
import ITerm from "../interfaces/ITerm";
import { toast } from "react-toastify";
import LoadTermObservable from "../observables/LoadTermObservable";

export const actionAddTerm = async({request}: ActionFunctionArgs) => {
    const formData = await request.formData();
    let name = formData.get("name") as string;
    name = name.trim().toUpperCase();
    const termService= JsonTermService.getInstance();
    const termObservable = LoadTermObservable.getInstance();

    // determiner id : max de id + 1 ?
    // faire requete pour recuperer les terms
    const terms = await termService.loadTerms();
    // recuperer max des id
    if(terms !== undefined) {
        const map = terms?.map(t => t.id);
        if (map !== undefined) {
            const maxId = Math.max(...map);
            // set le booleen selected
            const selected = false;

            const newTerm: ITerm = {
                id: maxId+1,
                name: name,
                selected: selected
            };
            //console.log('new term :', newTerm);

            // ajouter term dans bd
            await termService.addTerm(newTerm);
            toast.success('Nouveau Terme ajouté : ' + newTerm.name);
            termObservable.reloadTerms = true; //
            termObservable.notifyListeners(); //
            return redirect("/home");
            //return null;
        }
    }

}