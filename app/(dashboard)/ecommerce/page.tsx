//import node module libraries
import { Metadata } from "next";
import { Fragment } from "react";

//import custom components
import EcommerceHeader from "components/ecommerce/EcommerceHeader";
import ProductListing from "components/ecommerce/ProductListing";

export const metadata: Metadata = {
  title: "Products | Dasher - Responsive Bootstrap 5 Admin Dashboard",
  description: "Dasher - Responsive Bootstrap 5 Admin Dashboard",
};

const Ecommerce = () => {
  return (
    <Fragment>
      <EcommerceHeader />
      <ProductListing />
    </Fragment>
  );
};

export default Ecommerce;
