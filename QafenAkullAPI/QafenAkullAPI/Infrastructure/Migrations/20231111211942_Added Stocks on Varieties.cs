using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace QafenAkullAPI.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddedStocksonVarieties : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "3a52846c-3eff-4290-810e-82f401331c7d");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "d731ca9e-639f-4c2a-be5b-eb3f16c09b82");

            migrationBuilder.AddColumn<int>(
                name: "Stock",
                table: "Varieties",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "4be0e4de-ee8c-450a-8f97-bf9eaf0a239b", null, "User", "USER" },
                    { "9e9b0459-ab3a-4a10-a77d-3506540ce061", null, "Administrator", "ADMINISTRATOR" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "4be0e4de-ee8c-450a-8f97-bf9eaf0a239b");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "9e9b0459-ab3a-4a10-a77d-3506540ce061");

            migrationBuilder.DropColumn(
                name: "Stock",
                table: "Varieties");

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "3a52846c-3eff-4290-810e-82f401331c7d", null, "User", "USER" },
                    { "d731ca9e-639f-4c2a-be5b-eb3f16c09b82", null, "Administrator", "ADMINISTRATOR" }
                });
        }
    }
}
