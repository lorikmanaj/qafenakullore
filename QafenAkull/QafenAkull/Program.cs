using Application.Interfaces.Generic;
using Application.Interfaces.Repositories;
using Application.Interfaces.Services;
using Application.Middlewares;
using Application.Repositories;
using Application.Repositories.Generic;
using Application.Services;
using Domain.Entities;
using Infrastructure.Persistence;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using QafenAkull.Configurations;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

builder.Services.Configure<JwtConfig>(builder.Configuration.GetSection(key: "JwtConfig"));
// Add services to the container.
builder.Services.AddDbContext<QADb>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

//builder.Services.AddCors(options =>
//{
//    options.AddPolicy("AllowAll",
//        b => b.AllowAnyHeader()
//            .AllowAnyOrigin()
//            .AllowAnyMethod());
//});
builder.Services.AddCors(options =>
{
    options.AddPolicy("QAClient", policy =>
    {
        policy.WithOrigins("http://localhost:4200").AllowAnyMethod().AllowAnyHeader();
    });
});

//Generics
builder.Services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));

//Services
builder.Services.AddScoped<IPasswordHasher<User>, PasswordHasher<User>>();

builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IJwtService, JwtService>();

//Repositories
builder.Services.AddScoped<IUserRepository, UserRepository>();

builder.Services.AddControllers();
//builder.Services.AddSingleton<IMyService, MyService>(); Replace Service Template




// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// JWT Configuration
//var keyBytes = new byte[64];

//using (RandomNumberGenerator rng = RandomNumberGenerator.Create()) { rng.GetBytes(keyBytes); }
//string secretKey = Convert.ToBase64String(keyBytes);

//var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));

//var tokenValidationParameters = new TokenValidationParameters
//{
//    ValidateIssuerSigningKey = true,
//    IssuerSigningKey = key,
//    ValidateIssuer = false,
//    ValidateAudience = false
//};


//builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
//    .AddJwtBearer(options =>
//    {
//        options.TokenValidationParameters = tokenValidationParameters;
//        options.Events = new JwtBearerEvents
//        {
//            OnMessageReceived = context =>
//            {
//                // Allow token in query string
//                if (context.Request.Query.ContainsKey("access_token"))
//                    context.Token = context.Request.Query["access_token"];

//                return Task.CompletedTask;
//            }
//        };
//    });
builder.Services.AddDefaultIdentity<IdentityUser>(options =>
    options.SignIn.RequireConfirmedAccount = false) //Change after deploy
    .AddEntityFrameworkStores<QADb>();

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(jwt =>
    {
        var key = Encoding.ASCII.GetBytes(builder.Configuration.GetSection("JwtConfig:Secret").Value);
        jwt.SaveToken = true;
        jwt.TokenValidationParameters = new TokenValidationParameters()
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(key),
            ValidateIssuer = false, //Change when deploy
            ValidateAudience = false, //Change when deploy
            RequireExpirationTime = false, //Change when deploy
            ValidateLifetime = false //Change when deploy
        };
    });
// JWT End

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();

    // Swagger Configuration
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "QafenAkull");
    });
}
else
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseMiddleware<ExceptionMiddleware>();
//app.UseCors("AllowAll");
app.UseCors("QAClient");

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
