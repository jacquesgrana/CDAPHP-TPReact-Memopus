import IColumn from "../interfaces/IColumn";
import { useEffect, useRef, useState } from "react";
import JsonColumnService from "../services/JsonColumnService";
import JsonCardService from "../services/JsonCardService";
import JsonTermService from "../services/JsonTermService";
import Column from "./Column";
import ITerm from "../interfaces/ITerm";
import Library from "../utils/Library";
import LoadTermObservable from "../observables/LoadTermObservable";
import LoadDataObservable from "../observables/LoadDataObservable";

const Columns = (props: any) => {
    const [columns, setColumns] = useState<IColumn[] | null>(null);
    const [terms, setTerms] = useState<ITerm[] | null>(null);
    const [term, setTerm] = useState<string>("TOUS");
    const [filteredColumns, setFilteredColumns] = useState<IColumn[] | null>(null);
    const dataLoaded = useRef(false);

    const columnService = JsonColumnService.getInstance();
    const cardService = JsonCardService.getInstance();
    const termService = JsonTermService.getInstance();
    const termObservable = LoadTermObservable.getInstance();
    const dataObservable = LoadDataObservable.getInstance();

    useEffect(() => {
      dataObservable.addListener(handleLoadTerms);
      setTerm(props.term);
  
      if (!dataLoaded.current) {
        loadDatasFctn();
      }
    }, [dataLoaded, term, props.term]);

    useEffect(() => {
      setTerm(props.term);
    }, [props.term]);

    useEffect(() => {}, [terms]);

    useEffect(() => {
      termObservable.addListener(handleLoadTerms);

      return () => {
        dataObservable.removeListener(handleLoadTerms);
        termObservable.removeListener(handleLoadTerms);
    };
    }, []);
   
    useEffect(() => {
      if (columns !== null) {
        const newFilteredColumns = Library.filterColumnsByTerm(columns, term);
        setFilteredColumns(newFilteredColumns);
      }
    }, [term, columns]);

    useEffect(() => {}, [filteredColumns]);

    useEffect(() => {}, [terms]);

    const handleLoadTerms = (loadTerms: boolean) => {
      if(loadTerms) {
        loadDatasFctn();
      }
    }

    const loadDatasFctn = async () => {
      const loadedColumns = await columnService.loadColumns();
      const loadedCards = await cardService.loadCards();
      const loadedTerms = await termService.loadTerms();

      if (loadedColumns !== null && loadedCards !== null) {
        const addedIdCards: Set<number> = new Set();
        const columnsCopy = [ ...loadedColumns];

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
          // TODO mettre ailleurs ?
          setTerms(loadedTerms);
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
                      if(!column.terms.some(t => t.id === termId)) {
                          // affecter dans terms le term obtenu
                          column.terms.push(term);
                      }
                          
                  });
                      
              }
              
          });
          
        }
        

        setColumns(columnsCopy);
        //filteredColumns.current = [ ...columnsCopy];
        setFilteredColumns([ ...columnsCopy]);
        dataLoaded.current = true;
        //console.log('terms :', loadedTerms);
        //console.log('cards :', loadedCards);
        //console.log('columns :', columnsCopy);
      }
    }
    return (
      <div className="">
        <h4 className="text-center my-3">Colonnes</h4>
        <h5 className="text-center my-2">Filtre : {term}</h5>
        <div className="d-flex gap-3">
          {filteredColumns?.map((c: IColumn) => {
            return (
              <Column key={c.id} column={c} terms={terms}></Column>
            );
            
          })}
        </div>
      </div>
    );
  };
  
  export default Columns;
