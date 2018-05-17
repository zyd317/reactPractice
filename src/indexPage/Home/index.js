/**
 * Created by yidi.zhao on 2018/5/11.
 */
import React from 'react';
import AbstractComponent from '../../abstract/abstractComponent';
import {connect} from 'react-redux';

import './index.scss';

class Home extends AbstractComponent {
    constructor(props) {
        super(props);
    }
    render() {
        let  {loading, error, data} = this.props.home.config;
        if(loading){
            return (
                <section>正在加载，请耐心等待…</section>
            )
        }else if(error){
            return (
                <section className="page on main m-error">系统繁忙，请稍候重试</section>
            )
        }else if(data){
            return (
                <section className="page on main">{data}</section>
            )
        }
    }
}

function mapStateToProps(state) {
    return  {
        home: state.home
    };
}

export default connect(mapStateToProps)(Home);