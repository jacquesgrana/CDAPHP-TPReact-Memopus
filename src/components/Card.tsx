import ICard from "../interfaces/ICard";

const Card = (props: any) => {
    // TODO faire interface pour typer les props
// useRef et useState pour la card ?
    return (
        <div key={props.card.id} className="div-card">
            <p className="p-card-question">{props.card.question}</p>
            <div className="d-flex justify-content-center w-100">
                <button className="btn btn-success">Répondre</button>
            </div>
        </div>
    );
}

export default Card;