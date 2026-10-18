// Patched by CodePilot Temporal Workflow Engine
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors(options => {
    options.AddDefaultPolicy(p => p.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
});
var app = builder.Build();
app.UseCors();
app.MapGet("/api/products", () => new[] { new { Id = 1, Name = "Product A", Price = 9.99 } });
app.Run();
