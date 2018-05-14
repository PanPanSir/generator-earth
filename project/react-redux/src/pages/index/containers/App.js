import React from 'react'
import Loading from 'lm-loading'
import { connect } from 'react-redux'
import FooterBar from 'commons/FooterBar'

const App = (props) => {

    return (

        <div>

            { props.children }

            <FooterBar />
            <Loading
                isShow={props.loadingData}
                opacity={0.3}
            />

        </div>

    )

};

const mapStateToProps = (state) => {

    return {

        loadingData: state.loadingData

    }

};

export default connect(mapStateToProps)(App);
