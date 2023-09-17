'use client';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Navbar } from '../components/navbar';
import { useCart } from '../context/cartContext';
import './receipt.css';
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCardText,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBInput,
    MDBRow,
    MDBTypography,
} from "mdb-react-ui-kit";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { useEffect } from 'react';
export default function Receipt(){
    const {cart, clearCart}= useCart();
    
    useEffect(() => {
        // Clear the cart when the Receipt component mounts
        clearCart();
    }, [clearCart]);

    return (
        <>
        <Navbar activePath='' /><section className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
            <MDBContainer className="py-5 h-100">
                <MDBRow className="justify-content-center align-items-center h-100">
                    <MDBCol size="12">
                        <MDBCard className="card-registration card-registration-2" style={{ borderRadius: "15px" }}>
                            <MDBCardBody className="p-0">
                                <MDBRow className="g-0">
                                        <div className="p-5">
                                            <div className="d-flex justify-content-between align-items-center mb-5">
                                                <MDBTypography tag="h1" className="fw-bold mb-0 text-black">
                                                    Order Confirmed
                                                </MDBTypography>
                                            </div>

                                            <hr className="my-4" />
                                        <Alert severity="success">
                                            <AlertTitle>Order Placed</AlertTitle>
                                            Your order has been confirmed and is being processed — <strong>Check your inbox for your receipt!</strong>
                                        </Alert>
                                            <hr className="my-4" />

                                            <div className="pt-5">
                                                <MDBTypography tag="h6" className="mb-0">
                                                    <MDBCardText tag="a" href="/products" className="text-body">
                                                        <MDBIcon fas icon="long-arrow-alt-left me-2" /> Back
                                                        to shop
                                                    </MDBCardText>
                                                </MDBTypography>
                                            </div>
                                        </div>
                                </MDBRow>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </section></>
    );
}