using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Xunit;
using Catalog.Api.Controllers;
using Catalog.Api.Data;
using Catalog.Api.Models;

namespace Catalog.Api.Tests;

public class CatalogControllerTests
{
    private CatalogDbContext CreateInMemoryDbContext()
    {
        var options = new DbContextOptionsBuilder<CatalogDbContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;

        var context = new CatalogDbContext(options);
        context.Products.AddRange(
            new Product { Id = 1, Name = "Laptop Pro", Description = "Dev laptop", Price = 1299.99m, Category = "Electronics" },
            new Product { Id = 2, Name = "Wireless Mouse", Description = "Ergonomic mouse", Price = 49.99m, Category = "Accessories" }
        );
        context.SaveChanges();
        return context;
    }

    [Fact]
    public async Task Search_ExactCase_ReturnsProduct()
    {
        using var db = CreateInMemoryDbContext();
        var controller = new ProductsController(db);

        var result = await controller.Search("Laptop");
        var products = Assert.IsAssignableFrom<IEnumerable<Product>>(result.Value);

        Assert.Single(products);
        Assert.Equal("Laptop Pro", products.First().Name);
    }

    [Fact]
    public async Task Search_CaseInsensitive_ReturnsProduct()
    {
        // DEMO-BUG-001 Test: Lowercase "laptop" query must match "Laptop Pro"
        using var db = CreateInMemoryDbContext();
        var controller = new ProductsController(db);

        var result = await controller.Search("laptop");
        var products = Assert.IsAssignableFrom<IEnumerable<Product>>(result.Value);

        Assert.Single(products);
        Assert.Equal("Laptop Pro", products.First().Name);
    }
}
