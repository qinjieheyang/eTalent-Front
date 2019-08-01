export abstract class AField {
    public name: string;
    public searchValue: any;
    public compare: CompareType;

    public constructor(name: string, searchValue: any, compare: CompareType) {
        this.name = name;
        this.searchValue = searchValue;
        this.compare = compare;
    }

    public abstract getFindFunc(): (row: object) => boolean;
}

export enum CompareType {
    Equal,
    Like,
    GreateThanEqual,
    LessThanEqual,
    GreateThan,
    LessThan
}
