import { useEffect, useRef, useState } from "react";
import ITerm from "../interfaces/ITerm";
import JsonTermService from "../services/JsonTermService";
import ReactModal from "react-modal";
import { useFetcher } from "react-router-dom";
import LoadTermObservable from "../observables/LoadTermObservable";

// TODO passer terms dans props ?
const Term = (props: any) => {
  const [terms, setTerms] = useState<ITerm[] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const term = useRef("TOUS");
  const fetcher = useFetcher();
  const termService = JsonTermService.getInstance();
  const termObservable = LoadTermObservable.getInstance();

  useEffect(() => {
    const loadTerms = async () => {
      const loadedColumns = await termService.loadTerms();
      setTerms(loadedColumns);
    };
    loadTerms();
    termObservable.addListener(loadTerms);

    return () => {
      termObservable.removeListener(loadTerms);
    };
  }, []);

  useEffect(() => {}, [terms]);


  function openModalTerm() {
    setIsModalOpen(true);
  }

  function closeModalTerm() {
    setIsModalOpen(false);
  }

  const loadTerms = async (reload: boolean) => {
    if(reload) {
      const loadedColumns = await termService.loadTerms();
      setTerms(loadedColumns);
      //console.log("terms reload");
      //termObservable.reloadTerms = false;
    }
    
  };

  //const columns: any = useLoaderData();
  //console.log('column component : columns :', props.columns);
  return (
    <div className="">
      <h4 className="text-center my-3">Termes</h4>
      <div className="d-flex gap-2">
        {
          terms?.map((t: ITerm) => {
            return (
              <button
                onClick={(e) => {
                  //setTerm(t.name);
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
              </button>
            );
          })
          // + t.name ===
        }
        <button
          key={0}
          className={
            "btn btn-warning btn-term " +
            ("TOUS" === term.current ? "term-selected" : "")
          }
          onClick={(e) => {
            //setTerm("TOUS");
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
            //e.preventDefault();
            closeModalTerm();
            //loadTerms();
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
              placeholder="Saisir le nom du terme"
            />
          </div>
          <div className="d-flex justify-content-center gap-3 mt-3 mb-1">
            <button className="btn btn-success btn-sm" type="submit">
              Valider
            </button>
            <button className="btn btn-warning btn-sm" onClick={closeModalTerm}>
              Annuler
            </button>
          </div>
        </fetcher.Form>
      </ReactModal>
    </div>
  );
};

export default Term;
