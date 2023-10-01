import { useLoaderData } from "react-router-dom";
import IColumn from "../interfaces/IColumn";
import Columns from "./Columns";
import JsonColumnService from "../services/JsonColumnService";
import { useEffect, useState } from "react";
import Term from "./Term";


const Home = () => {

    const [term, setTerm] = useState<string>("TOUS");

    function setTermFilter(term: string) {
        setTerm(term);
        console.log('callback home');
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