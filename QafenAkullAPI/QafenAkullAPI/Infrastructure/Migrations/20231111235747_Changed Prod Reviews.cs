using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace QafenAkullAPI.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class ChangedProdReviews : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "8ca0b594-2cdb-49f8-96f3-2961103eee15");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "fd82301b-2156-4d1a-9401-99c1f7ba8ec1");

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "0d3ace03-05cb-4c53-b5a8-64c863f69527", null, "Administrator", "ADMINISTRATOR" },
                    { "ab976682-7a9f-45ec-9adb-0e35dc1d9774", null, "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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
                    { "8ca0b594-2cdb-49f8-96f3-2961103eee15", null, "Administrator", "ADMINISTRATOR" },
                    { "fd82301b-2156-4d1a-9401-99c1f7ba8ec1", null, "User", "USER" }
                });
        }
    }
}
