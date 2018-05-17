/**
 * Created by yidi.zhao on 2018/5/11.
 */
'use strict';
import React, {Component} from 'react';
class AbstractComponent extends Component{
    constructor(props){
        super(props);
    }
    isLogin(){
        return false
    }
}

export default AbstractComponent;