import React from 'react';

interface CheckoutModalProps {
  isOpen: boolean;
  total: number;
  onClose: () => void;
  onConfirm: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, total, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#161b22', padding: '2rem', borderRadius: '8px', minWidth: '320px', border: '1px solid #30363d' }}>
        <h3>Confirm Order</h3>
        <p>Your total is: <strong>${total.toFixed(2)}</strong></p>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1.5rem' }}>
          <button onClick={onClose} style={{ padding: '0.5rem 1rem', background: '#30363d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Cancel</button>
          <button onClick={onConfirm} style={{ padding: '0.5rem 1rem', background: '#238636', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Place Order</button>
        </div>
      </div>
    </div>
  );
};
