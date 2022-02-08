import React, { useState, useEffect, useRef } from "react";
import map from "lodash/map";
import moment from 'moment';
import Select from 'react-select';
import groupBy from 'lodash/groupBy'
import filter from 'lodash/filter'
import uniqBy from 'lodash/uniqBy'
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
    NavbarBrand
} from "reactstrap";

const getDateFormat = date => (moment(date).format('DD-MM-YYYY '))

const ProductList = (props) => {
    const { getAllProduct, productList } = props;
    const [productType, setProductType] = useState([{ label: 'None', value: 'None'}])
    useEffect(() => {
        getAllProduct();
    }, [getAllProduct]);
    useEffect(() => {
        if (productList.length > 0 && productType.length === 1) {
            const materialType = uniqBy(map(productList, item => (
                {
                    label: item.material,
                    value: item.material
                }
            )), (e) => e.value)
            setProductType(productType.concat(materialType))
        }
    }, [productList])
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
                    />
                </div>
                
                </div>
            <div className="row">
                <div className="col-md-8 cart">
                    <div className="row">
                        {productList.map((product) => (
                            <ProductItem item={product} key={product.name} />
                        ))}
                    </div>

                    <div className="back-to-shop">
                        <a href="#">&leftarrow;</a>
                        <span className="text-muted">Back to shop</span>
                    </div>
                </div>
                <div className="col-md-4 summary">
                    <div>
                        <h5>
                            <b>Summary</b>
                        </h5>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col">ITEMS 3</div>
                        <div className="col text-right">&euro; 132.00</div>
                    </div>
                    <form>
                        <p>SHIPPING</p>{" "}
                        <select>
                            <option className="text-muted">
                                Standard-Delivery- &euro;5.00
                            </option>
                        </select>
                        <p>GIVE CODE</p>{" "}
                        <input id="code" placeholder="Enter your code" />
                    </form>
                    <div className="row">
                        <div className="col">TOTAL PRICE</div>
                        <div className="col text-right">&euro; 137.00</div>
                    </div>{" "}
                    <button className="btn">CHECKOUT</button>
                </div>
            </div>
        </Container>
        </>
        
    );
};

const ProductItem = (props) => {
    const { item } = props;
    const count = 0;
    const changeCart = () => {};
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
                            <li>Created Date: {getDateFormat(item.createdAt)}</li>
                            <li><label>Material</label> {item.material}</li>
                        </List>
                    </div>

                    <div className="cart-action">
                        <div
                            className="text-lg font-bold text-center pl-3 py-2 border-r border-gray-200 cursor-pointer select-none active:bg-blue-100"
                            onClick={() => {
                                changeCart({ type: "remove", item });
                            }}
                        >
                            -
                        </div>
                        <div className="text-lg text-center py-2 select-none">
                            {count}
                        </div>
                        <div
                            className="text-lg font-bold text-center pr-3 py-2 border-l border-gray-200 cursor-pointer select-none active:bg-blue-100"
                            onClick={() => {
                                changeCart({ type: "add", item });
                            }}
                        >
                            +
                        </div>
                    </div>
                </div>
            </Card>
        </Col>
    );
};

const Header = () => {
    return (
        <div>
  <Navbar
    color="light"
    expand="md"
    light
  >
    <NavbarBrand href="/">
      Robot Market
    </NavbarBrand>
  </Navbar>
</div>
    )
}

export default ProductList;
