import React, {Component} from 'react';
import {connect} from 'react-redux';
import { updateFlightList } from '../reducer/flightList/action';
import FlightItem from './FlightItem';
import Loading from './components/Loading';
import Error from './components/Error';
import NoResult from './components/NoResult';
import './index.scss'

class FlightList extends Component{
    constructor(props){
        super(props);
        this.hasScroll = false; // 保存是否以及滚动
    }
    render(){
        let { error, loading, flightList } = this.props.flightList;
        // 加载中
        if(loading){
            return <Loading />
        }
        // 出错
        if(error){
            return <Error updateFlight={this.props.dispatch(updateFlightList)}/>
        }
        if(flightList && flightList.length){
            return (
                <section className="m-flight-list wrapper" ref='wrapper'>
                    <div className="content" ref='content'>
                        {flightList.map((item) => {
                            return <FlightItem
                                {...item}
                            />
                        })}
                        <li className="m-last-flight"/>
                    </div>
                </section>
            )
        } else {
            return <NoResult />
        }
    }

    /**
     * 改变页面滚动位置, 只需要在第一次进来的时候scroll
     */
    componentDidUpdate(){
        if(!this.hasScroll && this.refs.lastCut){
            this.hasScroll = true;
            let lastCut = this.refs.lastCut.refs.scrollItem;
            let dom = document.getElementsByClassName("m-flight-list")[0];
            if(lastCut.offsetTop > dom.offsetTop + dom.offsetHeight){
                this.refs.wrapper.scrollTo = -lastCut.offsetTop + lastCut.clientHeight/2;
            }
        }
    }
}

function mapStateToProps(state) {
    return  {
        flightList: state.flightList
    };
}
export default connect(mapStateToProps)(FlightList);