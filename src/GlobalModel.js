/*
 * @file: GlobalModel
 * @author: beichensky
 * @description: 用来存放全局数据的 Model
 */

import { observable, action } from 'mobx';

export default class GlobalModel {

    @observable username = '小明';

    /**
     * 修改 username 的方法
     */
    @action
    changeUserName = (name) => {
        this.username = name;
    }

}
