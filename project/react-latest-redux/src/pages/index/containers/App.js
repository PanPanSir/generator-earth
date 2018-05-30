import React, { Component } from 'react'
import { connect } from 'react-redux'

class App extends Component {


    componentDidMount () {

        console.log('in this stage you can setState safe');

    }

    componentWillUnmount () {

        console.log('dont forget clear timer or remove listener');

    }


    render () {


        return (

            <div style={{
                display: this.props.showState ? 'flex' : 'none',
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


        )

    }

}


const mapStateToProps = (state) => {

    return {

        showState: state.toastData.showState

    }

};

export default connect(mapStateToProps)(App);
