using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using QafenAkullAPI.Core.Implementations.Repositories;
using QafenAkullAPI.Core.Implementations.Services;
using QafenAkullAPI.Core.Interfaces.Repositories;
using QafenAkullAPI.Core.Interfaces.Services;
using QafenAkullAPI.Domain.Entities;
using QafenAkullAPI.Infrastructure.Persistence;
using System.Text;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

var connString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<QafenAkullDbContext>(options =>
{
    options.UseSqlServer(connString);
});

builder.Services.AddIdentityCore<ApiUser>()
    .AddRoles<IdentityRole>()
    .AddTokenProvider<DataProtectorTokenProvider<ApiUser>>("QafenAkullApi")
    .AddEntityFrameworkStores<QafenAkullDbContext>()
    .AddDefaultTokenProviders();

builder.Services.AddScoped<IAuthManager, AuthManager>();

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ClockSkew = TimeSpan.Zero,
        ValidIssuer = builder.Configuration["JwtSettings:Issuer"],
        ValidAudience = builder.Configuration["JwtSettings:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JwtSettings:Key"]))
    };
});



//Service Registrations
builder.Services.AddScoped<IStorageManager>(provider =>
{
    // Set the base storage path to "QafenAkullAPI\\Assets"
    //return new StorageManager("QafenAkullAPI\\Assets");
    //string baseStoragePath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "QafenAkullAPI", "Assets");
    string baseStoragePath = Path.Combine(@"C:\Lik\Projects\qafenakullore\QafenAkullAPI\QafenAkullAPI", "Assets");
    return new StorageManager(baseStoragePath);
});

builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<IOrderRepository, OrderRepository>();

builder.Services.AddControllers().AddJsonOptions(_ =>
    _.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", x => x.AllowAnyHeader().AllowAnyOrigin().AllowAnyMethod());
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowAll");

app.UseAuthentication();
app.UseAuthorization();

//Seed the data
//using (var scope = app.Services.CreateScope())
//{
//    var services = scope.ServiceProvider;
//    var dbContext = services.GetRequiredService<QafenAkullDbContext>();
//    dbContext.SeedData();
//}

app.MapControllers();

app.Run();
