import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "../hooks/useDispatch";
import { useStore } from "../hooks/useStore";
import { formatCurrency } from "../utils/formatCurrency";
import Layout from "./Layout";
import PageHeader from "./PageHeader";

const INITIAL_FIELDS = {
  variant: "",
  quantity: 1,
};

function Product() {
  const { products, client, checkout } = useStore();
  const dispatch = useDispatch();
  // the product handle (slug) is provided in the URL
  // we can use this to filter out our list of products and retrieve the current product
  const { handle } = useParams();

  const [fields, setFields] = useState(INITIAL_FIELDS);
  const [isAdding, setAdding] = useState(false);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // products have been queried for earlier during app rendering
    // to prevent additional HTTP requests, we can simply filter out all products that do not match the given URL handle
    const product = products
      .filter((product) => product.handle === handle)
      .pop();

    if (product) {
      setFields((prevState) => {
        return {
          ...prevState,
          variant: product.variants[0].id,
        };
      });
    }

    setProduct(product);
  }, [handle, products]);

  const handleFieldChange = (e) => {
    setFields((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const handleAddToCart = async (e) => {
    e.preventDefault();
    if (!fields.variant.length) {
      return;
    }

    // Toggle a flag so that we can disable the form submit button (i.e. we want to prevent accidential "add to carts")
    setAdding(true);

    // shopify will throw an error if you don't coerce the quantity into a Number
    const payload = await client.checkout.addLineItems(checkout.id, [
      { variantId: fields.variant, quantity: Number(fields.quantity) },
    ]);

    dispatch({ type: "UPDATE_CHECKOUT", payload });

    // toggle submit button back to default state
    setAdding(false);
  };

  // prevent component rendering until all properties of current product have been assigned
  if (!product) {
    return null;
  }

  const { title, description, id, variants } = product;

  const variantsToDisplay = variants.filter(
    (variant) => variant.title !== "Default Title"
  );

  return (
    <Layout>
      <PageHeader pageTitle="Product page" />
      <section className="mt-5">
        <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
          {product.images && product.images.length && (
            <figure>
              <img
                src={product.images[0].src}
                alt={product.images[0].altText}
              />
            </figure>
          )}
          <div>
            <h2 className="text-lg leading-6 font-medium text-gray-900">
              {title}
            </h2>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              {description}
            </p>
            <form
              method="POST"
              onSubmit={handleAddToCart}
              className="max-w-md w-full mt-5"
            >
              {variantsToDisplay.map((variant) => {
                return (
                  <div key={variant.id} className="flex items-center mt-3">
                    <label
                      htmlFor={`variant-${variant.id}`}
                      className="mr-5 block text-sm font-medium text-gray-700"
                    >
                      <span className="text-gray-700 uppercase text-lg mt-3">
                        {formatCurrency(variant.priceV2)}
                      </span>{" "}
                      {variant.title}
                    </label>
                    <input
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                      id={`variant-${variant.id}`}
                      type="radio"
                      name="variant"
                      value={variant.id}
                      onChange={handleFieldChange}
                      checked={fields.variant === variant.id}
                    />
                  </div>
                );
              })}
              <div className="flex items-center mt-3 mb-3">
                <label
                  htmlFor={`item-${id}`}
                  className="mr-5 block text-sm font-medium text-gray-700"
                >
                  Quantity
                </label>
                <input
                  id={`item-${id}`}
                  type="number"
                  min="0"
                  max="5"
                  name="quantity"
                  value={fields.quantity}
                  step="1"
                  onChange={handleFieldChange}
                />
              </div>
              <button
                type="submit"
                disabled={isAdding}
                className="px-8 py-2 bg-indigo-600 text-white text-sm font-medium rounded hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500"
              >
                Add to cart
              </button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Product;
