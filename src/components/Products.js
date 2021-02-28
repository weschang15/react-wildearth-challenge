import React from "react";
import { Link } from "react-router-dom";
import Layout from "./Layout";

function Products({ products }) {
  return (
    <Layout>
      <h1>Product Listings</h1>
      <div
        style={{
          display: "grid",
          gap: "1em",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        }}
      >
        {products.map((product) => (
          <article
            key={product.id}
            style={{
              padding: "1em",
              boxShadow:
                "0 4px 14px rgb(128 128 128 / 8%), 0 3px 6px rgb(128 128 128 / 6%)",
            }}
          >
            <h2>
              <Link
                to={{
                  pathname: `/products/${product.handle}`,
                }}
              >
                {product.title}
              </Link>
            </h2>
          </article>
        ))}
      </div>
    </Layout>
  );
}

export default Products;
