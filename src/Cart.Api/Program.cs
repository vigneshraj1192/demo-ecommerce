using Cart.Api.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddSingleton<ICartService, CartService>();

var app = builder.Build();

app.UseRouting();
app.MapControllers();

app.Run();
