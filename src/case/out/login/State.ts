class State {
    public message: string = "";
}

// tslint:disable-next-line:no-empty-interface
export interface IState extends State {}

export const initState: IState = new State();
