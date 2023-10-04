import { useState } from "react";
import ICard from "../interfaces/ICard";
import Card from "./Card";
import { useFetcher } from "react-router-dom";
import ReactModal from "react-modal";
import ITerm from "../interfaces/ITerm";
import ColumnProps from "../props/ColumnProps";

/**
 * Composant Column représentant une colonne 
 * et ses propriétés, dont une liste de card
 * @param props 
 * @returns 
 */
const Column = (props: ColumnProps) => {
  const [isModalCardOpen, setIsModalCardOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const fetcher = useFetcher();

  /**
   * Fonction qui ouvre la modale de création d'une question (card)
   */
  function openModalCard() {
    setIsModalCardOpen(true);
  }

   /**
   * Fonction qui ferme la modale de création d'une question (card)
   */
  function closeModalCard() {
    setIsModalCardOpen(false);
  }

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
            closeModalCard();
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
              placeholder="saisir la question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
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
              placeholder="saisir la réponse"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
          </div>
          <div className="div-form-input-term form-group">
            <label
              className="div-form-input-label-term"
              htmlFor="columnDisplay"
            >
              Colonne :
            </label>
            <input
              className="form-control div-form-input-input-term"
              type="text"
              name="columnDisplay"
              id="columnDisplay"
              disabled
              value={props.column.label}
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
              {props.terms?.map((term: ITerm) => {
                return (
                  <option key={term.id} value={term.id}>
                    {term.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="d-flex justify-content-center gap-3 mt-3 mb-1">
            <button
              className="btn btn-success btn-sm btn-modal"
              type="submit"
              disabled={!question || !answer}
            >
              valider
            </button>

            <button className="btn btn-warning btn-sm btn-modal" onClick={closeModalCard}>
              Annuler
            </button>
          </div>
        </fetcher.Form>
      </ReactModal>
    </>
  );
};

export default Column;
