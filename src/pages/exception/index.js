/*
 * @file: NotFound
 * @author: beichensky
 * @description: 路由不匹配时错误信息展示界面
 */

import React from 'react'
import { Button } from "antd";

export default ({ history }) => {
    return (
        <div>
            <h2>404</h2>
            <Button type="primary" onClick={ () => history.replace('/') }>返回首页</Button>
        </div>
    )
}