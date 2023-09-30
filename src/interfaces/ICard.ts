export default interface ICard {
    id: number;
    question: string;
    answer: string;
    column: number;
    selected: boolean;
    tid: number;
}