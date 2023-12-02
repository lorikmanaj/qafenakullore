using Domain.Models;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Database;

public static class ApplicationDbInitializer
{
    static ApplicationDbInitializer()
    {
        //GenerateProducts();
        //GenerateUsers();
        //GenerateRoles();
        //GenerateUserRoles();
        //GenerateCompanies();
    }

    //private static void GenerateProducts()
    //{
    //    var productFaker = new Faker<Product>()
    //        .RuleFor(t => t.Id, f => Guid.NewGuid())
    //        .RuleFor(t => t.Name, f => f.Commerce.ProductName())
    //        .RuleFor(t => t.Description, f => f.Commerce.ProductDescription())
    //        .RuleFor(t => t.Price, f => f.Commerce.Price());

    //    Products = productFaker.GenerateBetween(30, 90).ToList();
    //}

    //private static void GenerateUsers()
    //{
    //    IdentityUser user = new();
    //    const string password = "password";
    //    var hasher = new PasswordHasher<IdentityUser>();

    //    var userFaker = new Faker<IdentityUser>()
    //        .RuleFor(t => t.Id, f => Guid.NewGuid().ToString())
    //        .RuleFor(t => t.UserName, f => f.Person.UserName)
    //        .RuleFor(t => t.NormalizedUserName, f => f.Person.UserName.ToUpper())
    //        .RuleFor(t => t.Email, f => f.Person.Email)
    //        .RuleFor(t => t.NormalizedEmail, f => f.Person.Email.ToLower())
    //        .RuleFor(t => t.PasswordHash, f => hasher.HashPassword(user, password))
    //        .RuleFor(t => t.EmailConfirmed, f => f.Random.Bool())
    //        .RuleFor(t => t.PhoneNumber, f => f.Person.Phone)
    //        .RuleFor(t => t.PhoneNumberConfirmed, f => f.Random.Bool())
    //        .RuleFor(t => t.TwoFactorEnabled, f => f.Random.Bool());


    //    Users = userFaker.GenerateBetween(30, 50);
    //}

    private static void GenerateRoles()
    {
        Roles = new List<IdentityRole>()
        {
            new()
            {
                Id = Guid.NewGuid().ToString(),
                Name = RoleType.User,
                NormalizedName = RoleType.User.ToUpper()
            },
            new()
            {
                Id = Guid.NewGuid().ToString(),
                Name = RoleType.Admin,
                NormalizedName = RoleType.Admin.ToUpper()
            }
        };
    }

    private static void GenerateUserRoles()
    {
        // Some users will be Admin, others will be Standard
        var random = new Random();

        UserRoles = Users
            .Select(user =>
            {
                var role = Roles.ElementAt(random.Next(Roles.Count));
                user.Email = $"{role.Name}_{user.Email}";

                return new IdentityUserRole<string>
                {
                    UserId = user.Id,
                    RoleId = role.Id
                };
            })
            .ToList();
    }

    //private static void GenerateCompanies()
    //{
    //    var companyFaker = new Faker<Company>()
    //        .RuleFor(t => t.Id, f => Guid.NewGuid())
    //        .RuleFor(t => t.Name, f => f.Company.CompanyName())
    //        .RuleFor(t => t.Suffix, f => f.Company.CompanySuffix())
    //        .RuleFor(t => t.Bs, f => f.Company.Bs());

    //    // Companies
    //    //Companies = companyFaker.GenerateBetween(20, 40);
    //}

    //public static IReadOnlyList<Product> Products { get; private set; }
    public static IReadOnlyList<IdentityUser> Users { get; private set; }
    public static IReadOnlyList<IdentityRole> Roles { get; private set; }
    public static IReadOnlyList<IdentityUserRole<string>> UserRoles { get; private set; }
    //public static IReadOnlyList<Company> Companies { get; private set; }
}