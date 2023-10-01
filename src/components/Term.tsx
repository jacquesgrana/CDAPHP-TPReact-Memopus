import { useEffect, useRef, useState } from "react";
import ITerm from "../interfaces/ITerm";
import JsonTermService from "../services/JsonTermService";

// TODO passer terms dans props ?
const Term = (props: any) => {
    const [terms, setTerms] = useState<ITerm[] | null>(null);
    const term = useRef("TOUS");

    useEffect(() => { 
        const termService = JsonTermService.getInstance();
        const loadTerms = async () => {
            const loadedColumns = await termService.loadTerms();
            setTerms(loadedColumns);
        }
        loadTerms();
    }, []);

   

    //const columns: any = useLoaderData();
    //console.log('column component : columns :', props.columns);
    return (
        <div className="">
        <h4 className="text-center my-3">Termes</h4>
        <div className="d-flex gap-2">
            { 
            terms?.map((t: ITerm) => {
                return <button onClick={(e) =>  {
                    //setTerm(t.name);
                    props.setTerm(t.name);
                    term.current = t.name;
                }} key={t.id} className={"btn btn-warning btn-term "+ (t.name === term.current ? "term-selected" : "")}>{t.name}</button>
            })
            // + t.name ===
        } 
        <button key={0} className={"btn btn-warning btn-term "+ ("TOUS" === term.current ? "term-selected" : "")} onClick={(e) => {
             //setTerm("TOUS");
             props.setTerm("TOUS");
             term.current = "TOUS";
        }}>TOUS</button>
        <button className="btn btn-primary">+</button>
        </div>
        </div>
    );
}

export default Term;