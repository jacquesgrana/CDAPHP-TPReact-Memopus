import ICard from "../interfaces/ICard";

const Column = (props: any) => {
    // TODO utiliser un useState et un useEffect pour column ?
    
    // TODO faire interface pour typer les props
    return (
        <div className="div-column">
          <div key={props.column.id} className="btn btn-primary div-btn-column">
            {props.column.label}
          </div>
          {
            props.column.cards.map((c: ICard) => {
                return(
                    <div key={c.id} className="div-card">
                        <p className="p-card-question">{c.question}</p>
                    </div>
                )
            })
          }
        </div>
      );
}

export default Column;