/*
 * @file: request
 * @author: beichensky
 * @description: 用来进行网络请求的工具类
 */

import 'whatwg-fetch';
import { stringify } from 'qs';

/**
 * 使用 Get 方式进行网络请求
 * @param {*} url 
 * @param {*} data 
 */
export const get = (url, data) => {
    const newUrl = url + '?' + stringify(data) + (stringify(data) === '' ? '' : '&') +'_random=' + Date.now();
    return fetch(newUrl, {
            cache: 'no-cache',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=utf-8'
            },
            method: 'GET',
        })
        .then(response => response.json());
}

/**
 * 进行 Post 方式进行网络请求
 * @param {*} url 
 * @param {*} data 
 */
export const post = (url, data) => {
    return fetch(url, {
        body: JSON.stringify(data), 
        cache: 'no-cache',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf-8'
        },
        method: 'POST',
    })
    .then(response => response.json()) // parses response to JSON
}

