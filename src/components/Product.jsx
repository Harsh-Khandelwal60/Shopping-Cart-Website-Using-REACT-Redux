import React, {  useEffect } from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useDispatch ,useSelector} from "react-redux";
import { add } from "../Store/cartSlice";
import { getProducts } from "../Store/productSlice";
import statusCode from "../utils/StatusCode";
import  Alert  from "react-bootstrap/Alert";


const Product = () => {
    const dispatch = useDispatch();
     
    useEffect(() => {
        // fetch('https://fakestoreapi.com/products')
        //     .then(data => data.json())
        //     .then(result => getProducts(result));
        dispatch(getProducts());
    }, []);
     const {data:products,status} = useSelector(state => state.products);

    //  console.log(products);
   

    const addToCart = (product)=> {
        dispatch(add(product));
    }
    if(status===statusCode.LOADING) {
        return <p> Loading.... </p>
    }
    if(status===statusCode.ERROR) {
        return <Alert varient="danger" key="danger">
            Something went wrong... Try again Later
        </Alert>
    }

    const cards = products.map(product => (
        <div key={product.id} className="col-md-3" style={{ marginBottom: "10px" }}>
            <Card className="h-100">
                <div className="text-center">
                    <Card.Img variant="top" src={product.image} style={{ width: "100px", height: "130px" }} />
                </div>
                <Card.Body>
                    <Card.Title>{product.title}</Card.Title>
                    <Card.Text>INR : {product.price}</Card.Text>
                </Card.Body>
                <Card.Footer style={{backgroundColor:'white'}}>
                        <Button variant="primary" onClick={() => addToCart(product)}>Add to Cart</Button>
                </Card.Footer>
            </Card>
        </div>
    ));

    return (
        <>
            <h1>Product Dashboard</h1>
            <div className="row">
                {cards} 
            </div>
        </>
    );
}

export default Product;
