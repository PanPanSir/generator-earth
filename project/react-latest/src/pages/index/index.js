//import base&&tool
import 'whatwg-fetch'
import 'scss_mixin/reset.scss' //reset 样式
import '../../static/app.scss' // common 样式
import 'tools/polyfill'
import React from 'react'
import ReactDOM from 'react-dom'

import {
    HashRouter as Router,
} from 'react-router-dom'

// import containers
import App from './containers/App'

const rootElement = document.getElementById('root');

ReactDOM.render(

	<Router>
        <App/>
	</Router>,

    rootElement

)
