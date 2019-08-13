//  负责伪造后端 WebApi数据

import { ITreeBase } from "./State";

export class ServiceMock {
    public constructor() {}

    // 数据初始化
    public getInit = async (): Promise<ITreeBase> => {
        const  treeData: ITreeBase = {
            id: '0-0',
            name: '中国雄安投资集团',
            children: [
                {
                    id: '0-0-0',
                    name: '集团总部',
                    children: [
                    { name: '党委办公室', id: '0-0-0-0' },
                    { name: '集团领导', id: '0-0-0-1' },
                    { name: '集团董事会', id: '0-0-0-2' },
                    ],
                },
                {
                    id: '0-0-1',
                    name: '0-0-1',
                    children: [
                    { name: '0-0-1-0', id: '0-0-1-0' },
                    { name: '0-0-1-1', id: '0-0-1-1' },
                    { name: '0-0-1-2', id: '0-0-1-2' },
                    ],
                },
                {
                    id: '0-0-2',
                    name: '0-0-2'
                },
            ],
        } ;
        return treeData;
    };
}

export interface IService extends ServiceMock {}
