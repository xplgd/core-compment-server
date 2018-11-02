import { IEntity } from './ModelManager';

interface IModel {
    moduleName: string;
    entities: IEntity[];
}

class ModelStorage {
    private static modelStorage: ModelStorage;

    private constructor() {
    }

    public static getInstance = () => {
        if (!ModelStorage.modelStorage)
            ModelStorage.modelStorage = new ModelStorage();

        return ModelStorage.modelStorage;
    }

    readonly entities: { [key: string]: IEntity[] } = {};
    readonly modelList: IModel[] = [];

    public filterByModule = (moduleName: string) => {
        return this.modelList.find((model) => model.moduleName === moduleName);
    }

}

export const getModelStorage = () => {
    return ModelStorage.getInstance();
};
