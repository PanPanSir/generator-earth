import React, { Component } from 'react'
import FooterBar from 'commons/FooterBar'
import {LoadingContext} from './loading-context';
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

                <div style={{
                    display: this.state.loadingShow ? 'flex' : 'none',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    zIndex: 100,
                    height: '100%',
                    width: '100%',
                    background: 'rgba(0,0,0,.3)',
                    textAlign: 'center',
                }}>
                    loading...
                </div>

            </LoadingContext.Provider>



        )

    }

}

export default App;
