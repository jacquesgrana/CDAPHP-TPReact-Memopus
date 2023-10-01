import IColumn from "../interfaces/IColumn";
import { useEffect, useRef, useState } from "react";
import JsonColumnService from "../services/JsonColumnService";
import JsonCardService from "../services/JsonCardService";
import ICard from "../interfaces/ICard";
import JsonTermService from "../services/JsonTermService";

const Columns = () => {
    const [columns, setColumns] = useState<IColumn[] | null>(null);
    const dataLoaded = useRef(false);
  
    useEffect(() => {
      const columnService = JsonColumnService.getInstance();
      const cardService = JsonCardService.getInstance();
      const termService = JsonTermService.getInstance();
  
      const loadData = async () => {
        const loadedColumns = await columnService.loadColumns();
        const loadedCards = await cardService.loadCards();
        const loadedTerms = await termService.loadTerms();
  
        if (loadedColumns !== null && loadedCards !== null) {
          const addedIdCards: Set<number> = new Set();
          const columnsCopy = [...loadedColumns];
  
          loadedCards.forEach(card => {
            columnsCopy.forEach(column => {
              if (Number(column.id) === Number(card.column)) {
                //console.log('columns match !!');
                if (!addedIdCards.has(card.id)) {
                  //console.log('pas dans set !!');
                  column.cards.push(card);
                  addedIdCards.add(card.id);
                }
              }
            });
          });

          // affecter les terms des colonnes en travaillant sur columnsCopy

          // si les tableaux loadedTerms et loadedColumns sont non null
          if(loadedColumns !== null && loadedTerms !== null && columnsCopy.length > 0) {
            // boucle sur les columnsCopy

            columnsCopy.forEach(column => {
                
                if(column.cards.length > 0) {
                    // boucle sur les cards de la colonne en cours 
                    column.cards.forEach(card => {
                        // recuperer card.tid 
                        const termId = card.tid;
                        // chercher dans loadedTerms le term avec id=tid
                        const term = loadedTerms.filter(t => t.id === termId)[0];

                        // si term pas dans terms
                        if(column.terms.filter(t => t.id === termId).length === 0) {
                            // affecter dans cards le term obtenu
                            column.terms.push(term);
                        }
                            
                    });
                        
                }
                
            });
            
          }
          
  
          setColumns(columnsCopy);
          dataLoaded.current = true;
          console.log('terms :', loadedTerms);
          console.log('cards :', loadedCards);
          console.log('columns :', columnsCopy);
        }
      };
  
      if (!dataLoaded.current) {
        loadData();
      }
    }, [dataLoaded]);
  
    //console.log('columns :', columns);
    
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
  
