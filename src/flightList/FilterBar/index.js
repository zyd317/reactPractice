import React, {Component} from 'react';
import {connect} from 'react-redux';
import { updateFlightList } from '../reducer/Home/action';
import { updateQuery } from '../reducer/QueryParam/action';
import { getSortTip } from '../dataModule/dataModule';
import './index.scss';

class Filter extends Component{
    constructor(props){
        super(props);
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
                    <div>{getSortTip(this.props.queryParam.sort)}</div>
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
        let sort = 1 - this.props.queryParam.sort;
        this.setState({
            sortClick: true
        });

        this.props.dispatch(updateQuery({
            sort : sort
        }));
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