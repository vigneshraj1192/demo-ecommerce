using Xunit;
using Cart.Api.Services;

namespace Cart.Api.Tests;

public class CartServiceTests
{
    [Fact]
    public void AddItem_ValidQuantity_AddsSuccessfully()
    {
        var cart = new CartService();
        cart.AddItem(1, "Laptop Pro", 1299.99m, 1);

        var items = cart.GetItems();
        Assert.Single(items);
        Assert.Equal(1, items[0].Quantity);
        Assert.Equal(1299.99m, cart.GetTotal());
    }

    [Theory]
    [InlineData(0)]
    [InlineData(-1)]
    [InlineData(-5)]
    public void AddItem_ZeroOrNegativeQuantity_ThrowsArgumentOutOfRangeException(int invalidQuantity)
    {
        // DEMO-BUG-002 Test: Zero or negative quantity must throw ArgumentOutOfRangeException
        var cart = new CartService();

        Assert.Throws<ArgumentOutOfRangeException>(() =>
        {
            cart.AddItem(1, "Laptop Pro", 1299.99m, invalidQuantity);
        });
    }

    [Fact]
    public void AddItem_ExistingProduct_IncrementsQuantityInsteadOfDuplicateLine()
    {
        // DEMO-BUG-003 Test: Adding same product twice must increment quantity, not duplicate lines
        var cart = new CartService();
        cart.AddItem(1, "Laptop Pro", 1299.99m, 1);
        cart.AddItem(1, "Laptop Pro", 1299.99m, 2);

        var items = cart.GetItems();
        Assert.Single(items); // Fails on unfixed code (which has 2 items)
        Assert.Equal(3, items[0].Quantity);
    }
}
