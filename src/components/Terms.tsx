import { useEffect, useRef, useState } from "react";
import ITerm from "../interfaces/ITerm";
import JsonTermService from "../services/JsonTermService";
import ReactModal from "react-modal";
import { useFetcher } from "react-router-dom";
import LoadTermObservable from "../observables/LoadTermObservable";
import { toast } from "react-toastify";
import TermsProps from "../props/TermsProps";

/**
 * Composant des termes, appelle une callback de Home qui 
 * met à jour les filtre choisi
 * @returns 
 */
const Term = (props: TermsProps) => {
  const [terms, setTerms] = useState<ITerm[] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
  const term = useRef("TOUS");
  const idTerm = useRef(0);

  const fetcher = useFetcher();
  const termService = JsonTermService.getInstance();
  const termObservable = LoadTermObservable.getInstance();
  
  useEffect(() => {
    loadTerms(true);
    termObservable.addListener(loadTerms);

    return () => {
      termObservable.removeListener(loadTerms);
    };
  }, []);

  useEffect(() => {}, [terms]);

  /**
   * Fonction qui ouvre la modale d'ajout d'un term
   */
  function openModalTerm() {
    setIsModalOpen(true);
  }

   /**
   * Fonction qui ferme la modale d'ajout d'un term
   */
  function closeModalTerm() {
    setIsModalOpen(false);
  }

  /**
   * Fonction qui ouvre la modale de confirmation 
   * et stocke l'id dans un useRef
   * @param id 
   */
  const deleteTerm = (id: number) => {
    idTerm.current = id;
    setIsDeleteConfirmationOpen(true);
  };

  /**
   * Fonction qui demande la requete de suppression
   */
  const confirmDelete = async () => {
    try {
      await termService.deleteTerm(idTerm.current);
      toast.success('Terme supprimé avec succès');
      setIsDeleteConfirmationOpen(false);
      term.current = "TOUS";
      props.setTerm(term.current);
      termObservable.reloadTerms = true;
      termObservable.notifyListeners();
    } 
    catch (error) {
      toast.error('Erreur lors de la suppression du terme');
    }
  };

  /**
   * Fonction qui ferme la modale de confirmation
   */
  const cancelDelete = () => {
    setIsDeleteConfirmationOpen(false);
  };

  /**
   * Fonction qui charge la liste des terms si reload est à true
   * @param reload 
   */
  const loadTerms = async (reload: boolean) => {
    if (reload) {
      const loadedTerms = await termService.loadTerms();
      setTerms(loadedTerms);
    }
  };

  return (
    <div className="">
      <h4 className="text-center my-3">Termes</h4>
      <div className="d-flex gap-2 flex-wrap justify-content-center">
        {
          terms?.map((t: ITerm) => {
            return (
              <button
                onClick={(e) => {
                  props.setTerm(t.name);
                  term.current = t.name;
                }}
                key={t.id}
                className={
                  "btn btn-warning btn-term " +
                  (t.name === term.current ? "term-selected" : "")
                }
              >
                {t.name}
                <div className="btn btn-danger btn-sm mb-1 btn-card-sm py-0 ms-2" onClick={(e) => deleteTerm(t.id)}>
              X
                </div>
              </button>
            );
          })
        }
        <button
          key={0}
          className={
            "btn btn-warning btn-term " +
            ("TOUS" === term.current ? "term-selected" : "")
          }
          onClick={(e) => {
            props.setTerm("TOUS");
            term.current = "TOUS";
          }}
        >
          TOUS
        </button>
        <button className="btn btn-success" onClick={openModalTerm}>
          +
        </button>
      </div>
      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={closeModalTerm}
        contentLabel="Créer un nouveau terme"
        className="modal-term"
      >
        <fetcher.Form
          className="form-term"
          action="/addTerm"
          method="POST"
          onSubmit={(e) => {
            closeModalTerm();
          }}
        >
          <h2 className="text-center h3 mt-1 mb-3">Créer un nouveau terme</h2>
          <div className="div-form-input-term form-group">
            <label className="div-form-input-label-term" htmlFor="name">
              Nom du terme :
            </label>
            <input
              className="form-control div-form-input-input-term"
              type="text"
              name="name"
              id="name"
              placeholder="saisir le nom du terme"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="d-flex justify-content-center gap-3 mt-3 mb-1">
            <button
              className="btn btn-success btn-sm btn-modal"
              type="submit"
              disabled={!name}
            >
              valider
            </button>
            <button className="btn btn-warning btn-sm btn-modal" onClick={closeModalTerm}>
              Annuler
            </button>
          </div>
        </fetcher.Form>
      </ReactModal>
      <ReactModal
        isOpen={isDeleteConfirmationOpen}
        onRequestClose={cancelDelete}
        contentLabel="Confirmation de suppression"
        className="modal-card"
        
      >
        <div className="form-card">
          <p className="text-center mt-1 mb-3">Voulez-vous vraiment supprimer ce terme ?</p>
          <div className="d-flex w-100 gap-2 justify-content-center">
          <button className="btn btn-success btn-sm btn-modal" onClick={confirmDelete}>Valider</button>
          <button className="btn btn-warning btn-sm btn-modal" onClick={cancelDelete}>Annuler</button>
          </div>
        </div>
      </ReactModal>
    </div>
  );
};

export default Term;
