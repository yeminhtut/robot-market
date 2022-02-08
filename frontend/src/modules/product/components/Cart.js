import React, { useState, useEffect } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    CardText,
    Button,
    CardFooter,
} from "reactstrap";

const Cart = (props) => {
    const { cartItems, editCartItem } = props;
    const [total, setTotal] = useState(0)
    useEffect(() => {
        setTotal(cartItems.reduce((a, b) => a + +b.price, 0))
    }, [cartItems])
    return (
        <div className="col-md-4">
            <Card>
                <CardHeader>Summary</CardHeader>
                <CardBody>
                    {cartItems.length == 0 && (
                        <CardText>Cart is empty.</CardText>
                    )}
                    
                    {cartItems && cartItems.length > 0 && cartItems.map((product, i) => (
                        <ShoppingCartItem
                            item={product}
                            key={i}
                            editCartItem={editCartItem}
                            index={i}
                        />
                    ))}
                </CardBody>
                <CardFooter>Total: ฿{total}</CardFooter>
            </Card>
        </div>
    );
};

const ShoppingCartItem = (props) => {
    const { item, editCartItem, index } = props;
    const { stock } = item
    const handleCartItemAction = type => editCartItem(item, type, index)
    return (
        <div className="row border-bottom py-4">
            <div className="row main align-items-center">
                <div className="col-2">
                    <img className="img-fluid" src={item.image} />
                </div>
                <div className="col">
                    <div className="row text-muted">{item.name}</div>
                </div>
                <div className="col">
                    ฿ {item.price} 
                </div>
                <div className="col">
                    {stock > 0 && (
                        <Button className="mr-4" color="primary" outline onClick={() => handleCartItemAction('add')}>
                        +
                    </Button>
                    )}
                    <Button color="danger" outline onClick={() => handleCartItemAction('remove')}>
                        -
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
