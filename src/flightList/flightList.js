import React from "react";
import {render} from "react-dom";

import Home from './Home/index.js';
import Calendar from '../components/Calendar/calendar';
import Toast from '../components/Toast';
import './flightList.scss';

import Components from '../components/CooperateComponent/index.js';
import Animate from '../components/Animation/index.js';

const AnimateCalendar = Animate(Calendar);
const AnimateToast = Animate(Toast, true);

render((
    <Home />
), document.getElementById('app'));

render((
    <Components calendar={AnimateCalendar} toast={AnimateToast}/>
), document.getElementById('components'));

document.body.addEventListener('touchmove', function (e) {
    e.preventDefault(); //阻止默认的处理方式(阻止下拉滑动的效果)
}, {passive: false});