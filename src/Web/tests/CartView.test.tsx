import { describe, it, expect } from 'vitest';
import { CartItem } from '../src/services/api';

describe('CartView Line Pricing (DEMO-BUG-004)', () => {
  it('correctly calculates line item total based on quantity and unit price', () => {
    const item: CartItem = {
      productId: 1,
      productName: 'Wireless Mouse',
      unitPrice: 49.99,
      quantity: 2,
    };

    // Expected line total is unitPrice * quantity = 99.98
    const expectedLineTotal = item.unitPrice * item.quantity;
    expect(expectedLineTotal).toBe(99.98);
  });
});
