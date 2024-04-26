import React from 'react';
import NavBar from "../features/navbar/NavBar";
import ProductList from "../features/product/components/ProductList";

function Home(props) {
    return (
        <>
            <NavBar>
                <ProductList/>
            </NavBar>
        </>
    );
}

export default Home;