/*
 * @file: DisplayModel
 * @author: beichensky
 * @description: 用来存放 Display 界面相关数据的 Model
 */

import { observable, action, runInAction } from "mobx";

import { getMockData } from '../service/index';

export default class DisplayModel {
    // count 计数器次数
    @observable count = 0;

    // Table 是否处于加载中
    @observable loading = false;

    // Table 数据源
    @observable listData = []

    /**
     * 修改 count 计数器次数的方法
     */
    @action
    changeCount = (type) => {
        switch(type) {
            case 'increment':
                this.count ++;
                break;
            case 'decrement':
                this.count --;
                break;
        }
    }

    /**
     * 获取 listData 数据的方法
     */
    @action 
    getListData = async () => {
        this.loading = true;
        const response = await getMockData();
        runInAction(() => {
            this.loading = false;
            if(response && response.success) {
                this.listData = response.data.projects
            }
        })
    }
}