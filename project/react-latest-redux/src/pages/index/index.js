// //import base&&tools
import 'whatwg-fetch'
import 'scss_mixin/reset.scss' //reset 样式
import 'tools/polyfill'
import React from 'react'
import ReactDOM from 'react-dom'

import store from './store/index'
import {Provider} from 'react-redux'
import {
    HashRouter as Router,
} from 'react-router-dom'

// // import containers
import App from './containers/App'
import MainRouter from './containers/MainRouter'
//
// import 'lm-ui-react'
//
// import List from './containers/Site/list'
// import Detail from './containers/Site/detail'
//
//

const rootElement = document.getElementById('root');

ReactDOM.render(

    <Provider store={store}>
        <Router>
            <div>
                <App/>
                <MainRouter/>
            </div>
        </Router>
    </Provider>,

    rootElement

)
