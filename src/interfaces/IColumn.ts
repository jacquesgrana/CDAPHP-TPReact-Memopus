import ICard from "./ICard";
import ITerm from "./ITerm";

export default interface IColumn {
    id: number;
    label: string;
    cards: ICard[];
    terms: ITerm[];
}