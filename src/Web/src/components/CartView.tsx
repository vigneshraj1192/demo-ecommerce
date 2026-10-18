import React from 'react';
import { CartItem } from '../services/api';

interface CartViewProps {
  items: CartItem[];
  onRemoveItem: (productId: number) => void;
  onCheckout: () => void;
}

export const CartView: React.FC<CartViewProps> = ({ items, onRemoveItem, onCheckout }) => {
  // DEMO-BUG-004: In calculating subtotal per item line, displays item.unitPrice instead of (item.unitPrice * item.quantity)
  return (
    <div className="cart-view" style={{ border: '1px solid #30363d', padding: '1rem', borderRadius: '8px' }}>
      <h2>Shopping Cart</h2>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {items.map((item) => (
              <li key={item.productId} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #21262d' }}>
                <div>
                  <strong>{item.productName}</strong> x {item.quantity}
                </div>
                <div>
                  {/* DEMO-BUG-004: Outdated line total bug - displays unit price instead of line subtotal */}
                  <span className="line-total" style={{ marginRight: '1rem' }}>
                    ${item.unitPrice.toFixed(2)}
                  </span>
                  <button
                    onClick={() => onRemoveItem(item.productId)}
                    style={{ background: '#da3633', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <strong>
              Total: ${items.reduce((acc, i) => acc + i.unitPrice * i.quantity, 0).toFixed(2)}
            </strong>
            <button
              onClick={onCheckout}
              style={{ padding: '0.5rem 1rem', background: '#1f6feb', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
