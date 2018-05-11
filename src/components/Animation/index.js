/**
 * Created by yidi.zhao on 2018/5/11.
 * 创建一个animation组件，内部返回传入组件的包装
 */
import React, {Component} from 'react';
import Browser from './browser';
import './index.scss';

const STATUS_EMUN = {
    INIT: 'init',
    ANIMATING: 'animating',
    ANIMATED: 'animated'
};

const Animation = WrappedComponent => {
    class WrapperComponent extends Component {
        constructor(props) {
            super(props);

            this.state = {
                status: STATUS_EMUN.INIT
            }
        }

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
         * ref，保存当前WrappedComponent的引用
         * @param ref - WrappedComponent
         */
        storeRef(ref) {
            this.ref = ref;
        }

        _componentRender() {
            return <WrappedComponent
                {...this.props}
                ref = {this.storeRef.bind(this)}
            />
        }

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