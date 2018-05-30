import React, { Component } from 'react'
import { connect } from 'react-redux'
import { changeToastState } from '../../actions/common_toast'
import ListItem from '../../components/ListItem'
import { createSelector } from 'reselect'

let scrollSite = 0;

const getListData = (listData) => listData;

// reselect的使用,减少重复计算
const reselectors = createSelector(
    [getListData],
    (listData) => {
        console.log('当listData有变化时才会回调该函数');
        return filterListData(listData)
    }
);

class List extends Component {

    constructor() {
        super();

        this.bindEvents();
    }

    /**
     * bind dom event
     */
    bindEvents() {
        this.showLoading = this.showLoading.bind(this)
    }

	componentDidMount () {

		window.scrollTo(0, scrollSite);

	}

	componentWillUnmount () {

		scrollSite = window.scrollY;

	}

    /**
     * btn toggle
     */
    showLoading() {
	    this.props.changeToastState();
    }

	render () {

		const { listData } = this.props;

		return (

			<div>

                <button onClick={ this.showLoading  }>click show loading: reselect test</button>

                <div style={{marginTop: 20}}>
                    {

                        listData.map((item) => {

                            return <ListItem key={item.id} title={item.title} id={item.id}/>

                        })

                    }
                </div>

			</div>

		)

	}

}

function filterListData(listData) {

    console.log('filterListData');

    return listData.map((list, index) => {
        // 更多复杂的操作
        if (index === 4) {
            return {"title":"新闻4444444","id":'new'+index}
        }
        return list
    })
}

const mapStateToProps = (state) => {

    return {
        listData: reselectors(state.listData)
        // listData: filterListData(state.listData)
    }

};

const mapDispatchToProps = (dispatch, ownProps) => {

	return {

        changeToastState: () => dispatch(changeToastState({

            showState: true,
            toastType: 'Loading'

        }))

	}

};

export default connect(mapStateToProps, mapDispatchToProps)(List);
