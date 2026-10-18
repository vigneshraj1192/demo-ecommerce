import React from 'react';
import { Product } from '../services/api';

interface ProductListProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export const ProductList: React.FC<ProductListProps> = ({ products, onAddToCart }) => {
  return (
    <div className="product-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1rem' }}>
      {products.map((product) => (
        <div key={product.id} className="product-card" style={{ border: '1px solid #30363d', padding: '1rem', borderRadius: '8px' }}>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 'bold' }}>${product.price.toFixed(2)}</span>
            <button
              onClick={() => onAddToCart(product)}
              style={{ padding: '0.5rem 1rem', background: '#238636', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
