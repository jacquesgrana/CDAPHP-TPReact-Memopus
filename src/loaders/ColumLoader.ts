import JsonColumnService from "../services/JsonColumnService";

const loaderColumns =async () => {
    const columnService = JsonColumnService.getInstance();
    //console.log('loader column : colums :', columnService.loadColumns())
    return columnService.loadColumns();
}

export default loaderColumns;