/**
 * Created by yidi.zhao on 2018/5/16.
 *
 * 路由管理simpleRouter
 */
import React, {Component} from 'react';
import {Router , Route} from '../../components/react-simpleRouter';
import Calendar from '../../components/Calendar/calendar';
import Home from '../Home'; // "／"路径下页面的渲染

class Touch extends Component {
    constructor(props) {
        super(props);
        //初始刷新页面,转到根路由
        if (location && location.hash) {
            history.replaceState('','','#/');
        }
    }
    render() {
        return (
            <Router path="/" component={Home} params={this.props} showTransition={false}>
               <Route path="/Calendar/:id" component={Calendar}/>
            </Router>
        );
    }
}
export default Touch;