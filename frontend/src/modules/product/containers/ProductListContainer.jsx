import React, { Component } from "react";
import { connect } from 'react-redux'
import { actions } from '../../../AppActions.js'
import ProductList from '../components/ProductList'

class ProductListContainer extends Component {
    render() {
        return <ProductList {...this.props} />;
    }
}

const mapStateToProps = (state) => ({
    productList: state.product.productList
})

const mapDispatchToProps = (dispatch) => ({
    getAllProduct: () => {
        dispatch(actions.PRODUCT.PRODUCT_GET_ALL_REQUEST())
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductListContainer);