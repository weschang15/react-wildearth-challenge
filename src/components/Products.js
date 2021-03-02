import React from "react";
import { Link } from "react-router-dom";
import Layout from "./Layout";
import PageHeader from "./PageHeader";

function Products({ products }) {
  return (
    <Layout>
      <PageHeader pageTitle="Product Listings" />
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
            <Link
              className="block"
              to={{
                pathname: `/products/${product.handle}`,
              }}
            >
              {product.images && product.images.length ? (
                <figure>
                  <img
                    src={product.images[0].src}
                    alt={product.images[0].altText}
                  />
                </figure>
              ) : (
                ""
              )}
              <h2>{product.title}</h2>
            </Link>
          </article>
        ))}
      </div>
    </Layout>
  );
}

export default Products;
