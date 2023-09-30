import IColumn from "../interfaces/IColumn";
import { useEffect, useState } from "react";
import JsonColumnService from "../services/JsonColumnService";


const Column = (props: any) => {

    const [columns, setColumns] = useState<IColumn[] | null>(null);

    useEffect(() => { 
        const columnService = JsonColumnService.getInstance();
        const loadColumn = async () => {
            const loadedColumns = await columnService.loadColumns();
            setColumns(loadedColumns);
        }
        loadColumn();
    }, []);

    //const columns: any = useLoaderData();
    console.log('column component : columns :', props.columns);
    return (
        <div className="">
        <h4 className="text-center">Colonnes</h4>
        <div className="d-flex gap-3">
            { 
            columns?.map((c: IColumn) => {
                return <button key={c.id} className="btn btn-success">{c.label}</button>
            })
        }
        </div>
        </div>
    );
}

export default Column;