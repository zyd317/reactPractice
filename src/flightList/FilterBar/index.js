import React, {Component} from 'react';
import {connect} from 'react-redux';
import { updateFlightList } from '../reducer/Home/action';
import { getSortTip } from '../dataModule/dataModule';
import './index.scss';

class Filter extends Component{
    constructor(props){
        super(props);
        this.state = {
            sort: 0
        }
    }

    render(){
        if(!this.props.queryParam.isShowFilter){
            return null;
        }
        return (
            <section className="m-filter">
                <div className={this.props.queryParam.filterClick ? 'm-filter-bar active' : 'm-filter-bar'} onClick={this._changeFilter}>
                    <i className="iconfont">&#xe3c9;</i>
                    <div>筛选</div>
                </div>
                <div className={'m-sort-bar active'} onClick={this._changeSort}>
                    <i className="iconfont">&#xe3c8;</i>
                    <div>{getSortTip(this.state.sort)}</div>
                </div>
            </section>
        )
    }

    _changeFilter = () => {
        this.props.showFilter();
    };
    /**
     * 时间排序
     */
    _changeSort = () => {
        let sort = 1-this.state.sort;
        this.setState({
            sort: sort,
            sortClick: true
        });
        // 重新渲染航班列表
        this.props.dispatch(updateFlightList({
            sort : sort
        }));
    }
}


function mapStateToProps(state) {
    return  {
        queryParam: state.queryParam,
        home: state.home
    };
}
export default connect(mapStateToProps)(Filter);