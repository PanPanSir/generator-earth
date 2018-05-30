import { withRouter } from 'react-router-dom'
import React from 'react';

class ScrollToTop extends React.PureComponent {
    componentDidUpdate(prevProps) {

        // todo: 登录之后的返回位置
        // 彩讯特殊处理
        if (this.props.location.pathname === '/site' && prevProps.location.pathname.indexOf('/site') > -1) {
            return
        }


        if (this.props.location !== prevProps.location) {
            window.scrollTo(0, 0)
        }

    }

    render() {

        // console.log('scroll-to-top')

        return this.props.children || null
    }
}

export default withRouter(ScrollToTop)
