using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text.Json;

namespace Api.Configuration;

public static class Authentication
{
    public static AuthenticationBuilder WithConfiguration(this AuthenticationBuilder builder, TokenValidationParameters tokenValidationParameters)
    {
        builder.AddJwtBearer(options =>
        {
            options.RequireHttpsMetadata = false;
            options.SaveToken = true;
            options.TokenValidationParameters = tokenValidationParameters;

            options.Events = new JwtBearerEvents()
            {
                OnAuthenticationFailed = context =>
                {
                    Console.WriteLine($"Authentication failed. {context.Exception}");
                    string s = context.Exception.ToString();
                    return Task.CompletedTask;
                },

                OnForbidden = context =>
                {
                    context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                    context.Response.ContentType = "application/json";

                    return context.Response.WriteAsync(JsonSerializer.Serialize(new
                    {
                        error = "Forbidden",
                        error_description = "You dont have permissions to access this resource x)"
                    }));
                },

                OnChallenge = context =>
                {
                    context.HandleResponse();
                    context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                    context.Response.ContentType = "application/json";

                    // Ensure we always have an error and error description.
                    if (string.IsNullOrEmpty(context.Error))
                        context.Error = "invalid_token";
                    if (string.IsNullOrEmpty(context.ErrorDescription))
                        context.ErrorDescription = "This request requires a valid JWT access token to be provided";

                    // Add some extra context for expired tokens.
                    if (context.AuthenticateFailure != null && context.AuthenticateFailure.GetType() ==
                        typeof(SecurityTokenExpiredException))
                    {
                        var authenticationException = context.AuthenticateFailure as SecurityTokenExpiredException;
                        context.Response.Headers.Add("x-token-expired", authenticationException.Expires.ToString("o"));
                        context.ErrorDescription =
                            $"The token expired on {authenticationException.Expires.ToString("o")}";
                    }

                    return context.Response.WriteAsync(JsonSerializer.Serialize(new
                    {
                        error = context.Error,
                        error_description = context.ErrorDescription
                    }));
                }
            };
        });

        return builder;
    }
}