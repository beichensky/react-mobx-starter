/*
 * @file: Settings
 * @author: beichensky
 * @description: 用来展示和修改全局 Model 数据使用方式的界面
 */

import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import { Card } from 'antd';

@inject('globalModel')
@observer
export default class Seetings extends Component {

    static propTypes = {
        globalModel: PropTypes.shape({
            username: PropTypes.string.isRequired,
            changeUserName: PropTypes.func.isRequired
        }).isRequired,
        history: PropTypes.shape({
            goBack: PropTypes.func.isRequired
        }).isRequired
    }

    constructor(props) {
        super(props);
        // 定义 val，让 input 成为受控组件
        this.state = {
            val: ''
        }
    }

    /**
     * input 值发生变化时触发该方法
     */
    handleValueChange = (e) => {
        this.setState({
            val: e.target.value
        })
    }

    /**
     * 按钮点击时触发该方法
     */
    handleClick = () => {
        const { val } = this.state;
        const { changeUserName } =  this.props.globalModel;
        if (val) {
            changeUserName(val);
            this.setState({
                val: ''
            })
        }
    }

    render () {
        const { username } = this.props.globalModel;
        const { val } = this.state;
        const title = "Settings 界面：展示以及修改全局 Model 中的属性"
        const actions = [
            <Button onClick={ () => this.props.history.goBack() }>返回</Button>
        ]
        return (
            <Card title={ title } actions={ actions } style={{ width: 600 }}>
                <div style={{ marginBottom: 30 }}>
                    <input placeholder="输入新的 username 值" value={ val } onChange={ this.handleValueChange } />
                    <Button style={{ marginLeft: 20 }} type="primary" onClick={ this.handleClick }>修改 username </Button>
                </div>
                <span>可以获取到 GlobalModel 中的 username: 
                    <span style={{ marginLeft: 20, background: 'pink' }}>{ username }</span>
                </span>
            </Card>
        )
    }
}