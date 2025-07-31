import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Product not found');
        }
        return response.json();
      })
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Loading product details...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!product) {
    return <div>No product found.</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>{product.name}</h1>
      <p><strong>Brand:</strong> {product.brand}</p>
      <p><strong>Retail Price:</strong> ${product.retail_price.toFixed(2)}</p>
      <p><strong>Cost:</strong> ${product.cost.toFixed(2)}</p>
      <p><strong>Category:</strong> {product.category}</p>
      <p><strong>Description:</strong> {product.description}</p>
      <Link to="/" style={{ display: 'block', marginTop: '20px' }}>Back to product list</Link>
    </div>
  );
};

export default ProductDetail;
