export interface IRelationship {
    name: string;
    startNode: {
        name: string,
        condition: { [key: string]: any }
    };
    endNode: {
        name: string,
        condition: { [key: string]: any }
    };
}
