import IColumn from "../interfaces/IColumn";
import { useEffect, useState } from "react";
import JsonColumnService from "../services/JsonColumnService";
import JsonTermService from "../services/JsonTermService";
import ITerm from "../interfaces/ITerm";
import JsonCardService from "../services/JsonCardService";
import ICard from "../interfaces/ICard";

const Columns = () => {
  const [columns, setColumns] = useState<IColumn[] | null>(null);
  const [cards, setCards] = useState<ICard[] | null>(null);

  useEffect(() => {
    const columnService = JsonColumnService.getInstance();
    const loadColumn = async () => {
      const loadedColumns = await columnService.loadColumns();
      setColumns(loadedColumns);
    };
    //loadColumn();

    const cardService = JsonCardService.getInstance();
    const loadCard = async () => {
      const loadedCards = await cardService.loadCards();
      setCards(loadedCards);
    };
    //loadCard();

    Promise.all([loadColumn(), loadCard()]).then(() => {
      if (columns !== null && cards !== null) {

        // creation set id des cards
        const addedIdCards: Set<number> = new Set();

        // creation copy columns
        const columnsCopy = [...columns];

        // boucle sur les cards
        cards.forEach(card => {
            // boucle sur les columns
            columnsCopy.forEach(column => {
                // si count === card.column
                if(Number(column.id) === Number(card.column)) {
                    console.log('id et column match !');
                    if(!addedIdCards.has(card.id)) {
                        // si card pas dans set
                        console.log('pas dans set !!');
                    
                        // ajout card a column.cards
                        column.cards.push(card);
                        // ajouter card à set
                        addedIdCards.add(card.id);
                    }
                    
                }
                    
            })
                
        });
            

        setColumns(columnsCopy);
        console.log("columns :", columns);
        console.log("cards :", cards);

      }
    });
  }, []);
  console.log("columns :", columns);

  //const columns: any = useLoaderData();
  //console.log('column component : columns :', props.columns);

  return (
    <div className="">
      <h4 className="text-center my-3">Colonnes</h4>
      <div className="d-flex gap-3">
        {columns?.map((c: IColumn) => {
          return (
            <div key={c.id} className="">
              <button key={c.id} className="btn btn-primary">
                {c.label}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Columns;
