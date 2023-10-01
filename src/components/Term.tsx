import IColumn from "../interfaces/IColumn";
import { useEffect, useState } from "react";
import JsonColumnService from "../services/JsonColumnService";
import ITerm from "../interfaces/ITerm";
import JsonTermService from "../services/JsonTermService";

// TODO passer terms dans props ?
const Term = () => {
    const [terms, setTerms] = useState<ITerm[] | null>(null);


    useEffect(() => { 
        const termService = JsonTermService.getInstance();
        const loadTerm = async () => {
            const loadedColumns = await termService.loadTerms();
            setTerms(loadedColumns);
        }
        loadTerm();
    }, []);

   

    //const columns: any = useLoaderData();
    //console.log('column component : columns :', props.columns);
    return (
        <div className="">
        <h4 className="text-center my-3">Termes</h4>
        <div className="d-flex gap-3">
            { 
            terms?.map((t: ITerm) => {
                return <button key={t.id} className="btn btn-warning">{t.name}</button>
            })
            
        }
        <button key={0} className="btn btn-warning">TOUS</button>
        </div>
        </div>
    );
}

export default Term;