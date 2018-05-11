/**
 * 显示日历头部，title，返回键
 */
import React from 'react';
import './header.scss';
class Header extends React.Component {
    constructor(props) {
        super(props);
    }
    static defaultProps = {
        leftIconClass: 'icon i-arrow_left',
        extClass: 'header-ext'

    };
    render() {
        let {extClass = '', leftBtnTxt, leftIconClass = '', leftBtnClick, rightBtnTxt, rightIconClass = '', rightBtnClick, title = ''} = this.props;
        return (
            <header className={'page-header ' + extClass}>
                {this.isShowButton(leftBtnTxt, leftIconClass) &&
                    <div className={'left-action ' + leftIconClass} onClick={leftBtnClick}>
                        {leftBtnTxt && <div className="left-btn">{leftBtnTxt}</div>}
                    </div>
                }
                <div className="page-title" >{title}</div>
                {this.isShowButton(rightBtnTxt, rightIconClass) &&
                <div className={'right-action ' + rightIconClass} onClick={rightBtnClick}>
                    {rightBtnTxt && <div className="right-btn">{rightBtnTxt}</div>}
                </div>
                }
            </header>
        );
    }
    isShowButton = (txt, icon) => {
        return !!(txt || icon);
    }
}

export default Header