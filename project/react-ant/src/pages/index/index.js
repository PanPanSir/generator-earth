import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Route } from 'react-router-dom'

import {Provider} from 'react-redux'
import store from 'ROOT_SOURCE/utils/store'

import App from './App.js'

import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');


ReactDOM.render(
    <LocaleProvider locale={zhCN}>
        <Provider store={store}>
            <HashRouter>
                <Route component={App} />
            </HashRouter>
        </Provider>
    </LocaleProvider>
    ,
    document.getElementById('root')
)

