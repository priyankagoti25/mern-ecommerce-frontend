import React from 'react';
import NavBar from "../features/navbar/NavBar";
import ProductDetails from "../features/product/components/ProductDetails";
function Home(props) {
    return (
        <>
            <NavBar>
                <ProductDetails/>
            </NavBar>
        </>
    );
}

export default Home;