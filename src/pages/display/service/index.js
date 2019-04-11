/*
 * @file: DisplayService
 * @author: beichensky
 * @description: 用来存放 Display 界面相关接口
 */

import { get } from 'utils/request';

/**
 * 获取 Mock 数据
 */
export const getMockData = () => {
    return get('https://easy-mock.com/mock/5c2dc9665cfaa5209116fa40/example/mock');
}