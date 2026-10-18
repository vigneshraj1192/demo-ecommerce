using Microsoft.EntityFrameworkCore;
using Catalog.Api.Models;

namespace Catalog.Api.Data;

public class CatalogDbContext : DbContext
{
    public CatalogDbContext(DbContextOptions<CatalogDbContext> options) : base(options)
    {
    }

    public DbSet<Product> Products => Set<Product>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<Product>().HasData(
            new Product { Id = 1, Name = "Laptop Pro", Description = "High-performance dev laptop", Price = 1299.99m, Category = "Electronics" },
            new Product { Id = 2, Name = "Wireless Mouse", Description = "Ergonomic bluetooth mouse", Price = 49.99m, Category = "Accessories" },
            new Product { Id = 3, Name = "Mechanical Keyboard", Description = "RGB mechanical keyboard", Price = 99.99m, Category = "Accessories" }
        );
    }
}
