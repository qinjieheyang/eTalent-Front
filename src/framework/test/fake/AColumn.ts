export interface IColumn {
    title: string;
    name: string;

    make: (index: number) => any;
}
/** 列 */
export abstract class AColumn implements IColumn {
    public name: string;

    public title: string;

    public abstract make: (index: number) => any;
}
