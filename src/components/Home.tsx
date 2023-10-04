import Columns from "./Columns";
import { useState } from "react";
import Term from "./Terms";

/**
 * Composant de la homepage appelé par le routeur
 * @returns 
 */
const Home = () => {

    const [term, setTerm] = useState<string>("TOUS");

    /**
     * Fonction callback appelée par le composant enfant Term
     * en cas de changement du term (pour faire le tri selon sa valeur)
     * @param term 
     */
    function setTermFilter(term: string) {
        setTerm(term);
    }

    return (
        <div className="div-container">
        <h3>Page Accueil</h3>
        <Term setTerm={setTermFilter}></Term>
        <Columns term={term}></Columns>
        </div>
    );
}

export default Home;