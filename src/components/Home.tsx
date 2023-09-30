import { useLoaderData } from "react-router-dom";
import IColumn from "../interfaces/IColumn";
import Column from "./Column";
import JsonColumnService from "../services/JsonColumnService";
import { useEffect, useState } from "react";


const Home = () => {

    return (
        <div className="div-container">
        <h3>Page Accueil</h3>
        <Column></Column>
        </div>
    );
}

export default Home;