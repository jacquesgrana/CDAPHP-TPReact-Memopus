import { ActionFunctionArgs, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import JsonCardService from "../services/JsonCardService";
import ICard from "../interfaces/ICard";
import LoadDataObservable from "../observables/LoadDataObservable";

/**
 * Fonction 'action', déclenchée par la route '/addCard'
 * qui récupère les données du formulaire, construit l'objet à insérer
 * et demande la requête d'insertion.
 * Avec, après, demande de notification par l'observable LoadDataObservable
 * aux observers pour la mise à jour de l'affichage.
 * @param param0 
 * @returns 
 */
export const actionAddCard = async({request}: ActionFunctionArgs) => {
    const cardService = JsonCardService.getInstance();
    const dataObservable = LoadDataObservable.getInstance();

    const formData = await request.formData();
    let question = formData.get("question") as string;
    question = question.trim();
    let answer = formData.get("answer") as string;
    answer = answer.trim();
    const column = formData.get("column") as unknown as number;
    const selected = false;
    const tid = formData.get("tid") as unknown as number; 

    const cards = await cardService.loadCards();

    if(cards !== undefined) {
        const map = cards?.map(c => c.id);
        if (map !== undefined) {
            const maxId = Math.max(...map);

            const newCard: ICard = {
                id: maxId+1,
                question: question,
                answer: answer,
                column: Number(column),
                selected: selected,
                tid: Number(tid)
            };

            await cardService.addCard(newCard);
            toast.success('Nouvelle Card ajoutée');
            dataObservable.reloadDatas = true; //
            dataObservable.notifyListeners(); //
            return redirect("/home");
        }
    }


    return null;
}