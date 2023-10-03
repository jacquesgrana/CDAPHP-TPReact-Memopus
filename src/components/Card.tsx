import { useRef, useState } from "react";
import ReactModal from "react-modal";
import { toast } from "react-toastify";

const Card = (props: any) => {
  const [isModalQuestionOpen, setIsModalQuestionOpen] = useState(false);
  const [answer, setAnswer] = useState("");
  const answerRef = useRef<HTMLInputElement>(null);

  function openModalCard() {
    setIsModalQuestionOpen(true);
    //console.log('clic');
  }

  function closeModalCard() {
    setIsModalQuestionOpen(false);
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
        <p className="p-card-question">{props.card.question}</p>
        <div className="d-flex justify-content-center gap-1 w-100">
          {props.card.column !== 1 ? (
            <button className="btn btn-success btn-card btn-sm">←</button>
          ) : (
            ""
          )}

          <button className="btn btn-success btn-card" onClick={openModalCard}>
            Répondre
          </button>
          {props.card.column !== 4 ? (
            <button className="btn btn-success btn-card btn-sm">→</button>
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
              className="btn btn-success btn-sm"
              type="button"
              onClick={evaluateAnswer}
              disabled={!answer}
            >
              valider
            </button>
            <button className="btn btn-warning btn-sm" onClick={closeModalCard}>
              Annuler
            </button>
          </div>
        </div>
      </ReactModal>
    </>
  );
};

export default Card;
