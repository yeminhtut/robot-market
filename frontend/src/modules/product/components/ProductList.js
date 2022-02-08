import React, { useState, useEffect } from "react";
import map from "lodash/map";
import moment from "moment";
import Select from "react-select";
import filter from "lodash/filter";
import uniqBy from "lodash/uniqBy";
import {
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Alert,
    Label,
    Container,
    Row,
    Col,
    Spinner,
    CardImg,
    CardTitle,
    CardText,
    Badge,
    Button,
    List,
    Navbar,
    NavbarBrand,
    CardFooter,
} from "reactstrap";
import Cart from "./Cart";

const getDateFormat = (date) => moment(date).format("DD-MM-YYYY ");

const ProductList = (props) => {
    const { getAllProduct, productList } = props;
    const [productType, setProductType] = useState([
        { label: "All Material", value: "None" },
    ]);
    const [cartItem, setCartItem] = useState([]);
    const [renderProductList, setRenderProductList] = useState([]);

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
        let addedItem = filter(renderProductList, function (o) {
            return o.id == item.id;
        })[0];
        const { stock } = addedItem;
        if (addedItem.stock > 0) {
            addedItem.stock = stock - 1;
        }
        setCartItem(cartItem.concat(item));
    };

    const editCartItem = (item, type, index) => {
        const { stock } = item;
        let actionItem = filter(renderProductList, function (o) {
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
            <Container>
                <div className="row">
                    <div className="col-md-4 cart">
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
                    <div className="col-md-8 cart">
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

const ProductItem = (props) => {
    const { item, handleCartItem } = props;
    const addToCart = () => {
        handleCartItem(item);
    };
    return (
        <Col lg="4">
            <Card className="card-lift--hover shadow border-0 mb-4">
                <div>
                    <img src={item.image} style={{ width: "100%" }} />
                    <div className="px-3">
                        <h6 className="text-primary text-uppercase mt-4">
                            {item.name}
                        </h6>
                        <List type="unstyled">
                            <li>Price: ฿{item.price}</li>
                            <li>Stock: {item.stock}</li>
                            <li>
                                Created Date: {getDateFormat(item.createdAt)}
                            </li>
                            <li>Material: {item.material}</li>
                        </List>
                    </div>

                    <Button
                        className="w-100 mb-0 br-0"
                        color={item.stock > 0 ? "primary" : "secondary"}
                        disabled={item.stock > 0 ? false : true}
                        onClick={addToCart}
                    >
                        Add to cart
                    </Button>
                </div>
            </Card>
        </Col>
    );
};

const Header = () => {
    return (
        <div>
            <Navbar color="light" expand="md" light>
                <NavbarBrand href="/">Robot Market</NavbarBrand>
            </Navbar>
        </div>
    );
};

export default ProductList;
