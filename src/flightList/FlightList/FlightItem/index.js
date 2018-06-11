import React, {Component} from 'react';
import { getDetailHref } from '../../../common/utils';
import { delAttention, addAttention } from '../../../common/request';

import './index.scss';

export default class FlightItem extends Component{
    constructor(props){
        super(props);
        this.state = {
            isFavor: this.props.flightValue.addAttention
        }
    }

    render(){
        let {
            carrier,
            name,
            airCode,
            depTime,
            depAirport,
            depTerminal,
            pageStatus,
            status,
            crossDay,
            arrTime,
            arrAirport,
            arrTerminal
        } = this.props.flightValue;
        return (
            <li className='m-flight-item' {...this.props.itemRef}>
                <div className="m-left" onClick={this.goDetail}>
                    <div className="m-item-header">
                        <img src={carrier} alt="航司图标" className="m-flight-icon"/>
                        <span>{name} {airCode}</span>
                    </div>
                    <div className="m-item-detail">
                        <div className="m-flight-info">
                            <p className="m-start-time">{depTime}</p>
                            <p className="m-start-place">{depAirport}{depTerminal}</p>
                        </div>
                        <div className={pageStatus}>
                            <div className="status-before">.</div>
                            <div className='status'>{status}</div>
                            <div className="status-after">.</div>
                        </div>
                        <div className="m-flight-info end-info">
                            <span className="m-crossDay">{crossDay}</span>
                            <p className="m-end-time">{arrTime}</p>
                            <p className="m-end-place">{arrAirport}{arrTerminal}</p>
                        </div>
                    </div>
                </div>
                <div className="m-right" onClick={this.doFavor}>
                {this.state.isFavor ?
                    <div className="right-container">
                        <i className="iconfont has-favor">&#xe3da;</i>
                        <span>已关注</span>
                    </div>
                     :
                    <div className="right-container">
                        <i className="iconfont">&#xe3c7;</i>
                        <span>关注</span>
                    </div>
                }
                </div>
            </li>
        )
    }

    goDetail = () => {
        window.location.href = getDetailHref(this.props.flightValue);
    };

    /**
     * 直接dom中判断，容易点击两次
     */
    doFavor = () => {
        if(this.state.isFavor){
            this.cancelFavor();
        } else {
            this.clickFavor();
        }
    };

    /**
     * 关注-先登陆
     */
    clickFavor = () => {
        this.goAttention();
    };

    /**
     * supportAttention的时候才能被关注
     */
    goAttention(){
        let flightValue = this.props.flightValue;
        if(flightValue.supportAttention){
            addAttention({
                "depCity": flightValue.depCity,
                "arrCity": flightValue.arrCity,
                "date": flightValue.date,
                "flightNo": flightValue.airCode,
                "depAirport": flightValue.depAirport,
                "arrAirport": flightValue.arrAirport,
                "depAirportCode": flightValue.depAirportCode,
                "arrAirportCode": flightValue.arrAirportCode,
                "depTime": flightValue.depTime,
                "arrTime": flightValue.arrTime,
                "arrTimeStamp": flightValue.arrTimeStamp,
                "depTimeStamp": flightValue.depTimeStamp,
                "arrTerminal": flightValue.arrTerminal,
                "depTerminal": flightValue.depTerminal,
                "airCompanyShortName": flightValue.airCompanyShortName
            }).then((data)=>{
                if(data && data.data && data.data.id){
                    this.attentionId = data.data.id;
                }
            });
            this.setState({
                isFavor: true
            });
            window.COMPONENT.update('toast', {
                text: '关注成功'
            });
        } else {
            window.COMPONENT.update('toast', {
                text: '航班已取消、到达或备降，不能再关注'
            });
        }
    }

    /**
     * 取消关注-所有航班均可取消关注
     */
    cancelFavor = () => {
        let id = this.attentionId || this.props.flightValue.attentionId;
        if(id){
            delAttention({
                id: id
            });
        }
        window.COMPONENT.update('toast', {
            text: '取消关注成功'
        });
        this.setState({
            isFavor: false
        });
    }
}