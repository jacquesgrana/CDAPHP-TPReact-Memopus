import IColumn from "../interfaces/IColumn";

export default class Library {

    public static filterColumnsByTerm(columns: IColumn[], term: string): IColumn[] {

        if(term !== 'TOUS') {
          // faire tableau vide
        let result: IColumn[] = [];
        // boucle sur les colonnes de columns
        columns.forEach(column => {
            let columnToAdd: IColumn = {
                id: column.id,
                label: column.label,
                cards : [],
                terms : []
            }
            // si term present
            if(column.terms.some(t => t.name === term)) {
                // recuperer term
                const termToAdd = column.terms.filter(t => t.name === term)[0];
                // ajouter term à colonne dans copie
                columnToAdd.terms.push(termToAdd);
                // boucle sur cards de column.cards
                column.cards.forEach(card => {
                    // si card.tid = id term
                    if(card.tid === termToAdd.id) {
                        //ajouter card à colonne dans copie
                        columnToAdd.cards.push(card);
                    }
                        
                })
                    
            }
            result.push(columnToAdd);    
        });
            
        // renvoyer copie
        return result;  
        }
        else {
          return columns;  
        }
        
    }
}