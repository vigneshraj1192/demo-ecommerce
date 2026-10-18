using Cart.Api.Models;

namespace Cart.Api.Services;

public interface ICartService
{
    IReadOnlyList<CartItem> GetItems();
    void AddItem(int productId, string productName, decimal unitPrice, int quantity);
    void RemoveItem(int productId);
    decimal GetTotal();
    void Clear();
}

public class CartService : ICartService
{
    private readonly List<CartItem> _items = new();

    public IReadOnlyList<CartItem> GetItems() => _items.AsReadOnly();

    public void AddItem(int productId, string productName, decimal unitPrice, int quantity)
    {
        // DEMO-BUG-002: Allows zero or negative quantities without validation
        // (Fix requires: if (quantity <= 0) throw new ArgumentOutOfRangeException(nameof(quantity));)

        // DEMO-BUG-003: Always appends a new item instead of updating existing quantity
        // (Fix requires: var existing = _items.FirstOrDefault(i => i.ProductId == productId); if (existing != null) existing.Quantity += quantity; else _items.Add(...);)
        _items.Add(new CartItem
        {
            ProductId = productId,
            ProductName = productName,
            UnitPrice = unitPrice,
            Quantity = quantity,
        });
    }

    public void RemoveItem(int productId)
    {
        _items.RemoveAll(i => i.ProductId == productId);
    }

    public decimal GetTotal()
    {
        return _items.Sum(i => i.UnitPrice * i.Quantity);
    }

    public void Clear()
    {
        _items.Clear();
    }
}
