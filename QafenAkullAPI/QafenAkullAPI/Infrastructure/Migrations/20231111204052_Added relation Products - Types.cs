using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace QafenAkullAPI.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddedrelationProductsTypes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "4ade3fa9-7c20-43b5-8b23-68bc36d74c23");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "7245183d-5fbc-47fe-a41b-c457e32af0a8");

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "7898b816-ae5b-4506-b720-2d1529936fa5", null, "User", "USER" },
                    { "b20f4c88-8ccf-423c-b4f3-df4f394393aa", null, "Administrator", "ADMINISTRATOR" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Products_TypeId",
                table: "Products",
                column: "TypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_ProductTypes_TypeId",
                table: "Products",
                column: "TypeId",
                principalTable: "ProductTypes",
                principalColumn: "TypeId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_ProductTypes_TypeId",
                table: "Products");

            migrationBuilder.DropIndex(
                name: "IX_Products_TypeId",
                table: "Products");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "7898b816-ae5b-4506-b720-2d1529936fa5");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "b20f4c88-8ccf-423c-b4f3-df4f394393aa");

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "4ade3fa9-7c20-43b5-8b23-68bc36d74c23", null, "User", "USER" },
                    { "7245183d-5fbc-47fe-a41b-c457e32af0a8", null, "Administrator", "ADMINISTRATOR" }
                });
        }
    }
}
