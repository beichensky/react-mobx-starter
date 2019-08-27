/*
 * @file: NotFound
 * @author: beichensky
 * @description: 路由不匹配时错误信息展示界面
 */

import React from 'react';
import ProtoTypes from 'prop-types';
import { Button } from "antd";

Expection.propTypes = {
    history: ProtoTypes.shape({
        replace: ProtoTypes.func.isRequired
    }).isRequired
};
const Expection = ({ history }) => {
    return (
        <div>
            <h2>404</h2>
            <Button type="primary" onClick={ () => history.replace('/') }>返回首页</Button>
        </div>
    );
};

export default Expection;