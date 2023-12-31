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
import ColumnsProps from "../props/ColumnsProps";

/**
 * Composant Columns représentant une liste de 4 colonnes 
 * et ses propriétés, dont une liste de column
 * @param props 
 * @returns 
 */
const Columns = (props: ColumnsProps) => {
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
   
    /**
     * Appele la fonction de filtrage de la librairie
     */
    useEffect(() => {
      if (columns !== null) {
        const newFilteredColumns = Library.filterColumnsByTerm(columns, term);
        setFilteredColumns(newFilteredColumns);
      }
    }, [term, columns]);

    useEffect(() => {}, [filteredColumns]);

    useEffect(() => {}, [terms]);

    /**
     * Fonction callback déclenchée par un observable 
     * si le booleen est à true qui appelle la fonction de 
     * chargement/peuplement des données
     * @param loadTerms
     */
    const handleLoadTerms = (loadTerms: boolean) => {
      if(loadTerms) {
        loadDatasFctn();
      }
    }

    /**
     * Fonction qui charge les différentes tables 
     * et peuple les column avec leur cards et leur terms
     */
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
              if (!addedIdCards.has(card.id)) {
                column.cards.push(card);
                addedIdCards.add(card.id);
              }
            }
          });
        });


        if(loadedColumns !== null && loadedTerms !== null && columnsCopy.length > 0) {
          setTerms(loadedTerms);
          columnsCopy.forEach(column => {
              if(column.cards.length > 0) {
                  column.cards.forEach(card => {
                      const termId = card.tid;
                      const term = loadedTerms.filter(t => t.id === termId)[0];
                      if(!column.terms.some(t => t.id === termId)) {
                          column.terms.push(term);
                      }     
                  });      
              }
          });
        }
        
        setColumns(columnsCopy);
        setFilteredColumns([ ...columnsCopy]);
        dataLoaded.current = true;
      }
    }
    return (
      <div className="d-flex flex-column flex-wrap justify-content-center">
        <h4 className="text-center mt-4">Colonnes</h4>
        <h5 className="text-center mt-2 mb-4">Filtre : {term}</h5>
        <div className="d-flex justify-content-center gap-3 flex-wrap">
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
