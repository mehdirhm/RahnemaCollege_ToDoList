export interface Task {
    id: number;
    title: string;
    state: State;
    date: string;
    description: string;
    color: Lable[];
}

export type Lable = "Green" | "Blue" | "Red" | "Yellow";
export type State = "todo" | "doing" | "done";
