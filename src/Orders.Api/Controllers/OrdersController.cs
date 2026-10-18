using Microsoft.AspNetCore.Mvc;
using Orders.Api.Models;

namespace Orders.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrdersController : ControllerBase
{
    private static readonly List<Order> _orders = new();

    [HttpGet]
    public ActionResult<IEnumerable<Order>> GetAll()
    {
        return Ok(_orders);
    }

    [HttpPost]
    public ActionResult<Order> CreateOrder([FromBody] Order order)
    {
        order.Id = Guid.NewGuid();
        order.CreatedAt = DateTime.UtcNow;
        order.Status = "Completed";
        _orders.Add(order);
        return CreatedAtAction(nameof(GetAll), new { id = order.Id }, order);
    }
}
