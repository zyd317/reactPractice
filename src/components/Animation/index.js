/**
 * Created by yidi.zhao on 2018/5/11.
 * 创建一个animation组件，内部返回传入组件的包装，主要是为了包装组件的展示(animating)隐藏(删除animating)的动画
 */
import React, {Component} from 'react';
import Browser from './browser';
import './index.scss';

const STATUS_EMUN = {
    INIT: 'init',
    ANIMATING: 'animating'
};

const Animation = WrappedComponent => {
    class WrapperComponent extends Component {
        constructor(props) {
            super(props);
            this.state = {
                status: STATUS_EMUN.INIT // 默认
            }
        }

        /**
         * open操作，ANIMATING
         * @param config
         */
        open(config) {
            this.ref.open(config);
            let self = this;
            if (this.props.supportAnimate) {
                setTimeout(function () {
                    self.setState({
                        status: STATUS_EMUN.ANIMATING
                    })
                }, 50)
            }
        }

        /**
         * close操作，不支持动画，直接调用close。支持-》INIT
         */
        close() {
            if (!this.props.supportAnimate) {
                this.ref.close();
            } else {
                this.setState({
                    status: STATUS_EMUN.INIT
                })
            }
        }

        update() {
            this.ref.update(...arguments);
        }

        /**
         * ref，保存当前WrappedComponent的引用。此时this.ref即可指向当前组件的引用(不需要this.refs[comName])
         * @param ref - WrappedComponent
         */
        storeRef(ref) {
            this.ref = ref;
        }

        /**
         * 渲染被包装组件，并设置该组件的ref
         * @return {XML}
         * @private
         */
        _componentRender() {
            return <WrappedComponent
                {...this.props}
                ref = {this.storeRef.bind(this)}
            />
        }

        /**
         * 如果不支持动画直接render，如果支持-》wrapperClass = 'animate-init '+ ?'animate-start'？
         */
        render() {
            const {supportAnimate} = this.props;
            if (!supportAnimate) {
                return this._componentRender();
            } else {
                let wrapperClass = ['animate-init'],
                    {status} = this.state;
                if (STATUS_EMUN.ANIMATING === status) {
                    wrapperClass.push('animate-start')
                }
                wrapperClass = wrapperClass.join(' ');
                return (
                    <div className={wrapperClass}>
                        {this._componentRender()}
                    </div>
                )
            }

        }
    }

    WrapperComponent.defaultProps = {
        supportAnimate: Browser.ios || (Browser.android && Browser.osVersionN >= 6)
    };
    return WrapperComponent;
};

export default Animation;