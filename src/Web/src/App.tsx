import React, { useState, useEffect } from 'react';
import { Product, CartItem, fetchProducts, searchProducts } from './services/api';
import { ProductList } from './components/ProductList';
import { CartView } from './components/CartView';
import { CheckoutModal } from './components/CheckoutModal';

export const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [lastCallInfo, setLastCallInfo] = useState<string>('Initializing...');

  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await fetchProducts();
      setProducts(data);
      setIsConnected(true);
      setLastCallInfo(`GET /api/products -> 200 OK (${data.length} items loaded from SQLite)`);
    } catch (err) {
      console.error('Failed to load products from backend:', err);
      setIsConnected(false);
      setLastCallInfo('GET /api/products -> FAILED. Backend (:5000) not responding.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      return loadProducts();
    }
    setLoading(true);
    try {
      const results = await searchProducts(searchQuery);
      setProducts(results);
      setIsConnected(true);
      setLastCallInfo(`GET /api/products/search?query=${searchQuery} -> 200 OK (${results.length} results)`);
    } catch (err) {
      console.error('Search failed:', err);
      setIsConnected(false);
      setLastCallInfo(`GET /api/products/search?query=${searchQuery} -> FAILED.`);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.productId === product.id);
      if (existing) {
        return prev.map((i) =>
          i.productId === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { productId: product.id, productName: product.name, unitPrice: product.price, quantity: 1 }];
    });
  };

  const handleRemoveItem = (productId: number) => {
    setCartItems((prev) => prev.filter((i) => i.productId !== productId));
  };

  const cartTotal = cartItems.reduce((acc, i) => acc + i.unitPrice * i.quantity, 0);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem', fontFamily: 'sans-serif', color: '#c9d1d9' }}>
      <header style={{ marginBottom: '1.5rem', borderBottom: '1px solid #30363d', paddingBottom: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ margin: 0, color: '#58a6ff' }}>DevStream Store</h1>
            <p style={{ margin: '0.25rem 0 0', color: '#8b949e', fontSize: '0.9rem' }}>
              Dual-Stack Monorepo: ASP.NET Core 8 Backend + React 18 / Vite Frontend
            </p>
          </div>
          <div style={{
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            backgroundColor: isConnected ? '#1f6feb22' : '#da363322',
            border: `1px solid ${isConnected ? '#238636' : '#da3633'}`,
            fontSize: '0.85rem'
          }}>
            <span style={{ fontWeight: 'bold' }}>{isConnected ? '🟢 Backend Connected' : '🔴 Backend Offline'}</span>
            <div style={{ color: '#8b949e', fontSize: '0.75rem', marginTop: '2px' }}>{lastCallInfo}</div>
          </div>
        </div>

        {/* Real Backend Search Form */}
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
          <input
            type="text"
            placeholder="Search products in backend SQLite (e.g. Laptop, Mouse)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              flex: 1,
              padding: '0.6rem 1rem',
              backgroundColor: '#0d1117',
              border: '1px solid #30363d',
              borderRadius: '6px',
              color: '#c9d1d9',
              fontSize: '0.9rem'
            }}
          />
          <button
            type="submit"
            style={{
              padding: '0.6rem 1.2rem',
              backgroundColor: '#238636',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Search API
          </button>
          {searchQuery && (
            <button
              type="button"
              onClick={() => { setSearchQuery(''); loadProducts(); }}
              style={{
                padding: '0.6rem 1rem',
                backgroundColor: '#21262d',
                color: '#c9d1d9',
                border: '1px solid #30363d',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              Reset
            </button>
          )}
        </form>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        <main>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2 style={{ margin: 0 }}>Products Catalog</h2>
            {loading && <span style={{ color: '#58a6ff', fontSize: '0.85rem' }}>Fetching from /api/products...</span>}
          </div>

          {products.length === 0 && !loading ? (
            <div style={{ padding: '2rem', textAlign: 'center', border: '1px dashed #30363d', borderRadius: '8px' }}>
              No products found matching your search.
            </div>
          ) : (
            <ProductList products={products} onAddToCart={handleAddToCart} />
          )}
        </main>

        <aside>
          <CartView items={cartItems} onRemoveItem={handleRemoveItem} onCheckout={() => setIsCheckoutOpen(true)} />
        </aside>
      </div>

      <CheckoutModal
        isOpen={isCheckoutOpen}
        total={cartTotal}
        onClose={() => setIsCheckoutOpen(false)}
        onConfirm={() => {
          setCartItems([]);
          setIsCheckoutOpen(false);
          alert('Order placed successfully!');
        }}
      />
    </div>
  );
};
