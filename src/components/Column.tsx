import { useState } from "react";
import ICard from "../interfaces/ICard";
import Card from "./Card";
import { useFetcher } from "react-router-dom";
import ReactModal from "react-modal";
import ITerm from "../interfaces/ITerm";

const Column = (props: any) => {
  const [isModalCardOpen, setIsModalCardOpen] = useState(false);
  const fetcher = useFetcher();

  // TODO utiliser un useState et un useEffect pour column ?

  // TODO faire interface pour typer les props
  function openModalCard() {
    setIsModalCardOpen(true);
    //console.log('clic');
  }

  function closeModalCard() {
    setIsModalCardOpen(false);
  }
  //console.log('props.terms :', props.terms);

  return (
    <>
      <div className="div-column">
        <div className="div-btn-column">
          <div className="btn-column">{props.column.label}</div>
          <button className="btn btn-success" onClick={openModalCard}>
            +
          </button>
        </div>
        {props.column.cards.map((c: ICard) => {
          return <Card key={c.id} card={c}></Card>;
        })}
      </div>
      <ReactModal
        isOpen={isModalCardOpen}
        onRequestClose={closeModalCard}
        contentLabel="Créer une nouvelle question"
        className="modal-card"
      >
        <fetcher.Form
          className="form-card"
          action="/addCard"
          method="POST"
          onSubmit={(e) => {
            //e.preventDefault();
            closeModalCard();
            //loadTerms();
          }}
        >
          <h2 className="text-center h3 mt-1 mb-3">
            Créer une nouvelle question
          </h2>
          <div className="div-form-input-term form-group">
            <label className="div-form-input-label-term" htmlFor="question">
              Question :
            </label>
            <input
              className="form-control div-form-input-input-term"
              type="text"
              name="question"
              id="question"
              placeholder="Saisir la question"
            />
          </div>
          <div className="div-form-input-term form-group">
            <label className="div-form-input-label-term" htmlFor="answer">
              Réponse :
            </label>
            <input
              className="form-control div-form-input-input-term"
              type="text"
              name="answer"
              id="answer"
              placeholder="Saisir la réponse"
            />
          </div>
          <div className="div-form-input-term form-group">
            <label className="div-form-input-label-term" htmlFor="columnDisplay">
              Colonne :
            </label>
            <input
              className="form-control div-form-input-input-term"
              type="text"
              name="columnDisplay"
              id="columnDisplay"
              disabled
              value={props.column.id}
            />
            <input
              type="hidden"
              name="column"
              id="column"
              value={props.column.id}
            />
          </div>

          <div className="div-form-input-term form-group">
            <label className="div-form-input-label-term" htmlFor="tid">
              Terme :
            </label>
            <select
              className="form-control div-form-input-input-term"
              name="tid"
              id="tid"
            >
              {props.terms.map((term: ITerm) => {
                return (
                  <option key={term.id} value={term.id}>
                    {term.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="d-flex justify-content-center gap-3 mt-3 mb-1">
            <button className="btn btn-success btn-sm" type="submit">
              Valider
            </button>
            <button className="btn btn-warning btn-sm" onClick={closeModalCard}>
              Annuler
            </button>
          </div>
        </fetcher.Form>
      </ReactModal>
    </>
  );
};

export default Column;
