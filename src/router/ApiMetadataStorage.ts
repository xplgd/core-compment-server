import { Exception } from '..';
import RouterException from '../exception/router';
import { IApiMetadata } from './IApiMetadata';

class ApiMetadataStorage {
    private static apiMetadataStorage: ApiMetadataStorage;

    private constructor() { }

    public static getInstance = () => {
        if (!ApiMetadataStorage.apiMetadataStorage)
            ApiMetadataStorage.apiMetadataStorage = new ApiMetadataStorage();

        return ApiMetadataStorage.apiMetadataStorage;
    }

    /**
     * api函数
     */
    readonly apiMetadatas: IApiMetadata[] = [];
    readonly apiRouterList: Array<{ moduleName: string, prefix: string, target: Function }> = [];

    /**
     * 根据taget 过滤apimethod
     */
    public filterByTarget = (target: (Function | string)) => {
        return this.apiMetadatas.filter((metadata) => metadata.target === target);
    }

    public findByName = (moduleName: string) => {
        return this.apiRouterList.find((item) => item.moduleName === moduleName);
    }

    public addApiRouter = (moduleName: string, apiRootPath: string, target: Function) => {
        const prefix = apiRootPath + '/' + moduleName;
        if (this.apiRouterList.some((item) => item.prefix === prefix))
            throw new Exception(RouterException.PREFIX_DUPLICATE_REGIST, prefix);
        this.apiRouterList.push({ moduleName, prefix, target });
    }

    public getApiRouter = () => {
        return this.apiRouterList;
    }
}

export const getApiMetadataStorage = () => {
    return ApiMetadataStorage.getInstance();
};
