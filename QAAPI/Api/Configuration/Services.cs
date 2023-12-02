using Api.Implementations.Token;
using Api.Interfaces.Token;
using Domain.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace Api.Configuration;

public static class Services
{
    private const string Jwt = "Jwt";
    private const string JwtSecret = $"{Jwt}:Secret";
    private const string JwtIssuer = $"{Jwt}:Issuer";
    private const string JwtAudience = $"{Jwt}:Audience";

    public static void AddDi(this IServiceCollection services)
    {
        services.AddTransient<JwtSecurityTokenHandler>();
        services.AddTransient<ITokenGenerator, TokenGenerator>();
        services.AddTransient<ITokenValidator, TokenValidator>();
    }

    public static void AddTokenValidation(this IServiceCollection services, IConfiguration configuration)
    {
        var secret = configuration[JwtSecret];
        if (string.IsNullOrEmpty(secret))
            throw new Exception("Secret is null. Please check your app-settings.json");

        var key = Encoding.ASCII.GetBytes(secret);
        var validationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ClockSkew = TimeSpan.Zero,
            IssuerSigningKey = new SymmetricSecurityKey(key),
            ValidIssuer = configuration[JwtIssuer],
            ValidAudience = configuration[JwtAudience]
        };

        // services
        services.AddSingleton(validationParameters);
        services.Configure<Jwt>(configuration.GetSection(Jwt));
    }

    public static TokenValidationParameters GetTokenValidationParameters(this IServiceCollection services)
    {
        var tokenValidationParameters = services.BuildServiceProvider().GetService<TokenValidationParameters>();
        if (tokenValidationParameters is null)
            throw new Exception("TokenValidationParameter is null. Please set the service in the container");

        return tokenValidationParameters;
    }

    public static void AddSwaggerUi(this IServiceCollection services)
    {
        services.AddSwaggerGen(options =>
        {
            options.CustomSchemaIds(type => type.ToString());
            options.SwaggerDoc("v1", new OpenApiInfo { Title = "Qafen Akull API", Version = "v1" });
            options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
            {
                Type = SecuritySchemeType.Http,
                Scheme = JwtBearerDefaults.AuthenticationScheme.ToLowerInvariant(),
                In = ParameterLocation.Header,
                Name = "Authorization",
                BearerFormat = "JWT",
                Description = "Please enter a valid token"
            });
        });
    }
}