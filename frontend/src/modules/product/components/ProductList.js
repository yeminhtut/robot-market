import React, { useState, useEffect } from "react";
import map from "lodash/map";
import Select from "react-select";
import filter from "lodash/filter";
import uniqBy from "lodash/uniqBy";
import { Alert, Container } from "reactstrap";
import Header from "./Header";
import Cart from "./Cart";
import ProductItem from "./ProductItem";

const ProductList = (props) => {
    const { getAllProduct, productList } = props;
    const [productType, setProductType] = useState([
        { label: "All Material", value: "None" },
    ]);
    const [cartItem, setCartItem] = useState([]);
    const [renderProductList, setRenderProductList] = useState([]);
    const [maxProductError, setMaxProductError] = useState(false);

    useEffect(() => {
        getAllProduct();
    }, [getAllProduct]);

    useEffect(() => {
        if (productList.length > 0 && productType.length === 1) {
            const materialType = uniqBy(
                map(productList, (item) => ({
                    label: item.material,
                    value: item.material,
                })),
                (e) => e.value
            );
            setProductType(productType.concat(materialType));
            setRenderProductList(productList);
        }
    }, [productList]);

    const handleCartItem = (item) => {
        const uniqueProduct = uniqBy(cartItem, e => {
            return e.id;
        });
        if (uniqueProduct.length < 5) {
            let addedItem = filter(renderProductList, o => {
                return o.id == item.id;
            })[0];
            const { stock } = addedItem;
            if (addedItem.stock > 0) {
                addedItem.stock = stock - 1;
            }
            setCartItem(cartItem.concat(item));
        } else {
            setMaxProductError(true);
        }
    };

    const editCartItem = (item, type, index) => {
        const { stock } = item;
        let actionItem = filter(renderProductList, o => {
            return o.id == item.id;
        })[0];
        if (type == "remove") {
            //increment stock
            actionItem.stock = stock + 1;
            let filteredArray = cartItem.filter((item, i) => i !== index);
            setCartItem(filteredArray);
        } else {
            handleCartItem(item);
        }
    };

    const handleMaterialChange = (e) => {
        if (e.value !== "None") {
            const filterProducts = filter(productList, (p) => {
                return p.material == e.value;
            });
            setRenderProductList(filterProducts);
        } else {
            setRenderProductList(productList);
        }
    };

    return (
        <>
            <Header />
            {maxProductError && (
                <Alert color="info" toggle={() => setMaxProductError(false)}>
                    You can add up to 5 different robots to cart, but you can
                    select as much as you want in the same type until it runs
                    out of stock.
                </Alert>
            )}

            <Container className="main-content">
                <div className="row">
                    <div className="col-md-4 mb-20">
                        <Select
                            className="basic-single"
                            classNamePrefix="select"
                            defaultValue={productType[0]}
                            name="color"
                            options={productType}
                            onChange={handleMaterialChange}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-8">
                        <div className="row">
                            {renderProductList.map((product) => (
                                <ProductItem
                                    item={product}
                                    key={product.name}
                                    handleCartItem={handleCartItem}
                                />
                            ))}
                        </div>

                        <div className="back-to-shop">
                            <a href="#">&leftarrow;</a>
                            <span className="text-muted">Back to shop</span>
                        </div>
                    </div>
                    <Cart cartItems={cartItem} editCartItem={editCartItem} />
                </div>
            </Container>
        </>
    );
};
export default ProductList;
