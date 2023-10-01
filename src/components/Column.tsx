import ICard from "../interfaces/ICard";
import Card from "./Card";

const Column = (props: any) => {
    // TODO utiliser un useState et un useEffect pour column ?
    
    // TODO faire interface pour typer les props
    return (
        <div className="div-column">
          <div className="div-btn-column">
          <div key={props.column.id} className="btn btn-warning btn-column">
            {props.column.label}
          </div>
          <button className="btn btn-primary">+</button>
          </div>
          {
            props.column.cards.map((c: ICard) => {
                return(
                    <Card key={c.id} card={c}></Card> 
                )
            })
          }
        </div>
      );
}

export default Column;

/*
<div key={c.id} className="div-card">
                        <p className="p-card-question">{c.question}</p>
                    </div>
                    */