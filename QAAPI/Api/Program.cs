using Api.Configuration;
using Api.Middlewares;
using Domain.Models;
using Infrastructure.Extensions;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.FileProviders;
using System.Text.Json.Serialization;

namespace Api;

public static class Program
{
    private static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);
        ConfigureServices(builder.Services, builder.Configuration);

        var app = builder.Build();
        app.RunMigrations();

        ConfigureApp(app);

        app.Run();
    }

    private static void ConfigureServices(IServiceCollection services, IConfiguration configuration)
    {
        services.AddDi();
        services.AddTokenValidation(configuration);
        services.AddInfrastructure(configuration);

        // Authorization & Authentication
        var tokenValidationParameters = services.GetTokenValidationParameters();
        services
            .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .WithConfiguration(tokenValidationParameters);

        services.AddAuthorization(options =>
        {
            options.AddPolicy(PolicyType.Standard, policy =>
            {
                policy.RequireRole(RoleType.User, RoleType.Admin);
            });

            options.AddPolicy(PolicyType.Administrator, policy =>
            {
                policy.RequireRole(RoleType.Admin);
            });

            //options.AddPolicy(PolicyType.SuperUser, policy =>
            //{
            //    policy.RequireRole(RoleType.Admin);
            //    policy.RequireClaim("Super");
            //});
        });

        services.AddDistributedMemoryCache(); // Use distributed memory cache for session

        services.AddSession(options =>
        {
            options.IdleTimeout = TimeSpan.FromMinutes(30); // Set session timeout
            options.Cookie.HttpOnly = true;
            options.Cookie.IsEssential = true;
        });

        services.AddSwaggerUi();
        services.AddEndpointsApiExplorer();
        services.AddCors(options =>
        {
            options.AddPolicy("Open", builder => builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
        });
        services
            .AddControllers()
            .AddJsonOptions(options => options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);
    }

    private static void ConfigureApp(WebApplication app)
    {
        app.UseStaticFiles(new StaticFileOptions
        {
            FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "assets")),
            RequestPath = "/assets"
        });

        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseCors("Open");
        app.UseHttpsRedirection();
        app.UseRouting();

        app.UseSession();

        app.UseMiddleware<JwtMiddleware>();

        app.UseAuthentication();
        app.UseAuthorization();

        app.MapControllers();
    }
}