/**
 * toast组件
 */
import React, {Component} from 'react';
import './index.scss';

class Toast extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: false,
            text: '',
            hide: false
        };
    }

    /**
     * 组件更新时，1000ms内设置隐藏动画
     * 1700ms，隐藏动画之后，hide toast组件避免遮挡页面
     */
    componentDidUpdate() {
        const {isShow} = this.state;
        if(isShow){
            clearTimeout(this.timeOutId1);
            clearTimeout(this.timeOutId2);
            this.timeOutId1 = setTimeout(() => {
                this.setState({
                    isShow: false
                });
            }, this.props.delay || 1000);
            this.timeOutId2 = setTimeout(() => {
                window.COMPONENT && window.COMPONENT.close('toast');
            }, this.props.delay+700 || 1700);
        }
    }

    render() {
        const {hide, isShow, text} = this.state;
        if(!text){
            return null;
        }
        return (
            <div className={isShow ? "m-toast on" : (hide ? "hide" : "m-toast off")}>
                <span>{text}</span>
            </div>
        );
    }

    open = ()=>{
        this.setState({
            hide: false // open的时候重置页面，display出来dom
        })
    };
    close = ()=>{
        this.setState({
            hide: true // close的时候重置页面，hide出来dom
        })
    };

    update = (config) => {
        window.COMPONENT && window.COMPONENT.open('toast');
        const {text, delay} = config;
        this.setState({
            isShow: true,
            text: text,
            delay: delay
        });
    }
}

export default Toast;