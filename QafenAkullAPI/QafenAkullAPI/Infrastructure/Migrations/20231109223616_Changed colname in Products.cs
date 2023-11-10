using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace QafenAkullAPI.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class ChangedcolnameinProducts : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "509ad108-149f-4230-9099-79591caf05e8");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "e70e4f82-adcc-42c7-badc-eb9979a21eb8");

            migrationBuilder.RenameColumn(
                name: "Image",
                table: "Products",
                newName: "MainImage");

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "4ade3fa9-7c20-43b5-8b23-68bc36d74c23", null, "User", "USER" },
                    { "7245183d-5fbc-47fe-a41b-c457e32af0a8", null, "Administrator", "ADMINISTRATOR" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "4ade3fa9-7c20-43b5-8b23-68bc36d74c23");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "7245183d-5fbc-47fe-a41b-c457e32af0a8");

            migrationBuilder.RenameColumn(
                name: "MainImage",
                table: "Products",
                newName: "Image");

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "509ad108-149f-4230-9099-79591caf05e8", null, "User", "USER" },
                    { "e70e4f82-adcc-42c7-badc-eb9979a21eb8", null, "Administrator", "ADMINISTRATOR" }
                });
        }
    }
}
