import { useRef, useState } from "react";
import ReactModal from "react-modal";
import { toast } from "react-toastify";
import LoadDataObservable from "../observables/LoadDataObservable";
import JsonCardService from "../services/JsonCardService";

/**
 * 
 * @param props Composant Card représentant une question 
 * et ses propriétés.
 * @returns 
 */
const Card = (props: any) => {
  const [isModalQuestionOpen, setIsModalQuestionOpen] = useState(false);
  const [answer, setAnswer] = useState("");
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
  const answerRef = useRef<HTMLInputElement>(null);
  const dataObservable = LoadDataObservable.getInstance();
  const cardService = JsonCardService.getInstance();

  function openModalCard() {
    setIsModalQuestionOpen(true);
  }

  function closeModalCard() {
    setIsModalQuestionOpen(false);
  }
  
  const deleteCard = () => {
    setIsDeleteConfirmationOpen(true);
  };

  const confirmDelete = async () => {
    const id = props.card.id;

    try {
      await cardService.deleteCard(id);
      toast.success('Carte supprimée avec succès');
      setIsDeleteConfirmationOpen(false);
      dataObservable.reloadDatas = true; //
      dataObservable.notifyListeners(); //
    } catch (error) {
      toast.error('Erreur lors de la suppression de la carte');
    }
  };

  const cancelDelete = () => {
    setIsDeleteConfirmationOpen(false);
  };

  async function goToLeft() {
    // récupérer l'id de la card
    const id = props.card.id;
    // calculer la nouvelle valeur de column
    const column = props.card.column - 1;
    // faire requete de patch sur column
    await cardService.patchCardColumn(id, column);
    // dataObservable.loadData = true;
    // appel fonction notify
    dataObservable.reloadDatas = true; //
    dataObservable.notifyListeners(); //
    // navigate ? --> non
  }

  async function goToRight() {
    const id = props.card.id;
    const column = props.card.column + 1;
    await cardService.patchCardColumn(id, column);
    dataObservable.reloadDatas = true; //
    dataObservable.notifyListeners(); //
  }

  // TODO améliorer
  function evaluateAnswer() {
    if (answerRef.current !== null) {
      const answerValue = answerRef.current.value;
      if (answerValue === props.card.answer) {
        //console.log("La réponse est correcte");
        toast.success("La réponse est correcte");
      } else {
        //console.log("La réponse est incorrecte");
        toast.error("La réponse est incorrecte");
      }
    }
  }

  // TODO faire interface pour typer les props
  // useRef et useState pour la card ?
  return (
    <>
      <div key={props.card.id} className="div-card">
        <div className="d-flex justify-content-center w-100 mb-0">
        <p className="p-card-question">{props.card.question}</p>
        <button className="btn btn-danger btn-sm mb-1 btn-card-sm py-0 ms-2" onClick={deleteCard}>X</button>
        </div>
        <div className="d-flex justify-content-center gap-2 w-100">
          {props.card.column !== 1 ? (
            <button className="btn btn-success btn-card btn-sm" onClick={goToLeft}>←</button>
          ) : (
            ""
          )}

          <button className="btn btn-success btn-card" onClick={openModalCard}>
            Répondre
          </button>
          {props.card.column !== 4 ? (
            <button className="btn btn-success btn-card btn-sm" onClick={goToRight}>→</button>
          ) : (
            ""
          )}
        </div>
      </div>

      <ReactModal
        isOpen={isModalQuestionOpen}
        onRequestClose={closeModalCard}
        contentLabel="Créer une nouvelle question"
        className="modal-card"
      >
        <div className="form-card">
          <h2 className="text-center h3 mt-1 mb-3">Répondre à une question</h2>
          <div className="div-form-input-term form-group">
            <label className="div-form-input-label-term" htmlFor="question">
              Question :
            </label>
            <input
              className="form-control div-form-input-input-term"
              type="text"
              name="question"
              id="question"
              disabled
              defaultValue={props.card.question}
            />
          </div>
          <div className="div-form-input-term form-group">
            <label className="div-form-input-label-term" htmlFor="answer">
              Réponse :
            </label>
            <input
              ref={answerRef}
              className="form-control div-form-input-input-term"
              type="text"
              name="answer"
              id="answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
          </div>
          <div className="d-flex justify-content-center gap-3 mt-3 mb-1">
            <button
              className="btn btn-success btn-sm btn-modal"
              type="button"
              onClick={evaluateAnswer}
              disabled={!answer}
            >
              valider
            </button>
            <button className="btn btn-warning btn-sm btn-modal" onClick={closeModalCard}>
              Annuler
            </button>
          </div>
        </div>
      </ReactModal>
      <ReactModal
        isOpen={isDeleteConfirmationOpen}
        onRequestClose={cancelDelete}
        contentLabel="Confirmation de suppression"
        className="modal-card"
        
      >
        <div className="form-card">
          <p className="text-center mt-1 mb-3">Voulez-vous vraiment supprimer cette carte ?</p>
          <div className="d-flex w-100 gap-2 justify-content-center">
          <button className="btn btn-success btn-sm btn-modal" onClick={confirmDelete}>Valider</button>
          <button className="btn btn-warning btn-sm btn-modal" onClick={cancelDelete}>Annuler</button>
          </div>
        </div>
      </ReactModal>
    </>
  );
};

export default Card;
