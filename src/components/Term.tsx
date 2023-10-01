import { useEffect, useState } from "react";
import ITerm from "../interfaces/ITerm";
import JsonTermService from "../services/JsonTermService";

// TODO passer terms dans props ?
const Term = (props: any) => {
    const [terms, setTerms] = useState<ITerm[] | null>(null);

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
        <div className="d-flex gap-3">
            { 
            terms?.map((t: ITerm) => {
                return <button onClick={(e) =>  {
                    //setTerm(t.name);
                    props.setTerm(t.name);
                }} key={t.id} className="btn btn-warning">{t.name}</button>
            })
        }
        <button key={0} className="btn btn-warning" onClick={(e) => {
             //setTerm("TOUS");
             props.setTerm("TOUS");
        }}>TOUS</button>
        </div>
        </div>
    );
}

export default Term;