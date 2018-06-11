/**
 * Created by yidi.zhao on 2018/6/8.
 */
import React, {Component} from 'react';
export default function Loading() {
    return (
        <section className="loading-container">
            <div className="loading-wave"/>
            <div className="camel-loading"/>
            <span className="text">努力加载中...</span>
        </section>
    )
}