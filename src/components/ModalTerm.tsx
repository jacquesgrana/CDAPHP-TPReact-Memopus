import { useState } from "react";
import ReactModal from "react-modal";
import { useFetcher } from "react-router-dom";

/**
 * TODO A supprimer ? ou utiliser ?
 * @returns 
 */
const ModalTerm = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const fetcher = useFetcher();


    function openModalTerm() {
        setIsModalOpen(true);
      }
    
      function closeModalTerm() {
        setIsModalOpen(false);
      }

    return (
        <ReactModal
        isOpen={isModalOpen}
        onRequestClose={closeModalTerm}
        contentLabel="Créer un nouveau terme"
        className="modal-term" 
      >
        <fetcher.Form className="form-term" action="/addTerm" method="POST">
        <h2 className="text-center h3 mt-1 mb-3">Créer un nouveau terme</h2>
        <div className="div-form-input-term form-group">
            <label className="div-form-input-label-term" htmlFor="name">Nom du terme :</label>
            <input className="form-control div-form-input-input-term" type="text" name="name" id="name" placeholder="Saisir le nom du terme" />
        </div>
        <div className="d-flex justify-content-center gap-3 mt-3 mb-1">
            <button className="btn btn-success btn-sm" type="submit">Valider</button>
            <button className="btn btn-warning btn-sm" onClick={closeModalTerm}>Annuler</button>
        </div>
        </fetcher.Form>
      </ReactModal>
    );
}

export default ModalTerm;