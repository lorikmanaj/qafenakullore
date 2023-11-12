using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace QafenAkullAPI.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class ChangedProdReviewsandProds : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "0d3ace03-05cb-4c53-b5a8-64c863f69527");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "ab976682-7a9f-45ec-9adb-0e35dc1d9774");

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "bc99918f-b0f3-4da5-a2c0-0ac38c6c9b19", null, "Administrator", "ADMINISTRATOR" },
                    { "c28b5777-9876-443d-86af-280d54f1ada8", null, "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "bc99918f-b0f3-4da5-a2c0-0ac38c6c9b19");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "c28b5777-9876-443d-86af-280d54f1ada8");

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "0d3ace03-05cb-4c53-b5a8-64c863f69527", null, "Administrator", "ADMINISTRATOR" },
                    { "ab976682-7a9f-45ec-9adb-0e35dc1d9774", null, "User", "USER" }
                });
        }
    }
}
