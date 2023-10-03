
const Card = (props: any) => {
    // TODO faire interface pour typer les props
// useRef et useState pour la card ?
    return (
        <div key={props.card.id} className="div-card">
            <p className="p-card-question">{props.card.question}</p>
            <div className="d-flex justify-content-center gap-1 w-100">
                {(props.card.column !== 1 ? <button className="btn btn-success btn-card btn-sm">←</button> : "")}
                
                <button className="btn btn-success btn-card">Répondre</button>
                {(props.card.column !== 4 ? <button className="btn btn-success btn-card btn-sm">→</button> : "")}
            </div>
        </div>
    );
}

export default Card;