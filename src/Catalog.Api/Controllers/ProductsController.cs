using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Catalog.Api.Data;
using Catalog.Api.Models;

namespace Catalog.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly CatalogDbContext _db;

    public ProductsController(CatalogDbContext db)
    {
        _db = db;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Product>>> GetAll()
    {
        return await _db.Products.ToListAsync();
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<Product>> GetById(int id)
    {
        var product = await _db.Products.FindAsync(id);
        if (product == null) return NotFound();
        return product;
    }

    [HttpGet("search")]
    public async Task<ActionResult<IEnumerable<Product>>> Search([FromQuery] string query)
    {
        if (string.IsNullOrWhiteSpace(query))
        {
            return await _db.Products.ToListAsync();
        }

        // DEMO-BUG-001: Case-sensitive string matching breaks lowercase queries
        var results = await _db.Products
            .Where(p => p.Name.Contains(query))
            .ToListAsync();

        return results;
    }
}
