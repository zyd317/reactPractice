/**
 * Created by yidi.zhao on 2018/6/8.
 */
import React, {Component} from 'react';
export default function Error(props) {
    return (
        <section className="m-error-flight">
            <img src="//s.qunarzz.com/flight_dynamic/dynamic/newDynamic/error.png" />
            <div className="tips">网络异常，请稍后重试</div>
            <span className="button-reload" onClick={props.updateFlight}>重新加载</span>
        </section>
    )
}