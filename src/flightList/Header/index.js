import React, {Component} from 'react';

import './index.scss'

export default function Header(props) {
    let {startCity, endCity, isAirCode, airCode=""} = props;
    airCode = airCode.toUpperCase();
    return (
        <header className="m-header">
            <i className="back iconfont" onClick={back}>&#xf3cd;</i>
            {
                isAirCode ?
                    <div className="air-code">{airCode}</div>
                    :
                    <div className="info">
                        <span className="start-city">{startCity}</span>
                        <i className="iconfont">&#xf173;</i>
                        <span className="end-city">{endCity}</span>
                    </div>
            }
        </header>
    )

    function back() {
        window.history.back();
    }
}