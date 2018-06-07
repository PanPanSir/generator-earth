import React, { Component } from 'react'

import Loading from 'lm-loading'

import FooterBar from 'commons/FooterBar'
import {LoadingContext} from 'commons/LoadingContext';

import MainRouter from './MainRouter';

class App extends Component {


    constructor (props) {

        super(props);

        this.state = {
            loadingShow: false
        };

        this.loadingChangeHandle = this.loadingChangeHandle.bind(this);

    }


    componentDidMount () {

        console.log('in this stage you can setState safe');

    }

    componentWillUnmount () {

        console.log('dont forget clear timer or remove listener');

    }


    loadingChangeHandle (showState) {

        this.setState({
            loadingShow: showState
        });

    }

    render () {

        return (

            <LoadingContext.Provider value={{
                loadingChangeHandle: this.loadingChangeHandle
            }}>

                <MainRouter/>

                <FooterBar/>

                <Loading isShow={ this.state.loadingShow }/>

            </LoadingContext.Provider>



        )

    }

}

export default App;
