import React, { Component } from "react";
import { connect } from 'react-redux'
import map from 'lodash/map'
import { actions } from '../../../AppActions.js'
import ProductList from '../components/ProductList'

class ProductListContainer extends Component {
    render() {
        return <ProductList {...this.props} />;
    }
}

const mapStateToProps = (state) => ({
    productList: map(state.product.productList, (p,i) => {
        return {id: i + 1, ...p}
    })
})

const mapDispatchToProps = (dispatch) => ({
    getAllProduct: () => {
        dispatch(actions.PRODUCT.PRODUCT_GET_ALL_REQUEST())
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductListContainer);