import { useLoaderData } from "react-router-dom";
import IColumn from "../interfaces/IColumn";
import Columns from "./Columns";
import JsonColumnService from "../services/JsonColumnService";
import { useEffect, useState } from "react";
import Term from "./Term";


const Home = () => {

    return (
        <div className="div-container">
        <h3>Page Accueil</h3>
        <Term></Term>
        <Columns></Columns>
        </div>
    );
}

export default Home;