import React from "react";
import moment from "moment";
import {
    Card,
    Col,
    Button,
    List,
} from "reactstrap";

const getDateFormat = (date) => moment(date).format("DD-MM-YYYY ");

const ProductItem = (props) => {
    const { item, handleCartItem } = props;
    const addToCart = () => handleCartItem(item);
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

export default ProductItem;
