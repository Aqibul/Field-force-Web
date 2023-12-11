import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../Redux/Slice/ProductsSlice";

export default function Products() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.data);
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  console.log("Products:", JSON.stringify(products));
  console.log("Loading:", loading);
  console.log("Error:", error);

  // Loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Error state
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Check if products is an array and has data
  if (!Array.isArray(products) || products.length === 0) {
    return <div>No products available</div>;
  }

  // Render the products
  return (
    <div>
      <h2>Products</h2>
      {products.map((product) => (
        <div key={product.id}>
          <h3>{product.title}</h3>
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
          <img
            src={product.image}
            alt={product.title}
            style={{ maxWidth: "100px" }}
          />
          {/* Add more details as needed */}
        </div>
      ))}
    </div>
  );
}
