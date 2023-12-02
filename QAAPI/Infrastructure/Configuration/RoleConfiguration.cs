using Infrastructure.Database;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configuration;

public class RoleConfiguration : IEntityTypeConfiguration<IdentityRole>
{

    public void Configure(EntityTypeBuilder<IdentityRole> builder)
    {
        builder.HasData(ApplicationDbInitializer.Roles);
    }
}