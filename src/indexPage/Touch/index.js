/**
 * Created by yidi.zhao on 2018/5/16.
 *
 * 路由管理simpleRouter
 */
import React, {Component} from 'react';
// import {Router , Route} from '@qnpm/react-simpleRouter';
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
            <Home {...this.props}/>
            // <Router path="/" component={Home} params={hideLoading} transitionTime='250' showTransition={true}>
            //     <Route path="/contacterFiller/:id" component={ContacterFiller}/>
            // </Router>
        );
    }
}
export default Touch;