import IColumn from "../interfaces/IColumn"
import ITerm from "../interfaces/ITerm"

export default interface ColumnProps {
    key: number
    column: IColumn
    terms: ITerm[] | null
  }