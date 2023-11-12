using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace QafenAkullAPI.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class ChangedUseronProdReviews : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "4be0e4de-ee8c-450a-8f97-bf9eaf0a239b");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "9e9b0459-ab3a-4a10-a77d-3506540ce061");

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "8ca0b594-2cdb-49f8-96f3-2961103eee15", null, "Administrator", "ADMINISTRATOR" },
                    { "fd82301b-2156-4d1a-9401-99c1f7ba8ec1", null, "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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
                    { "4be0e4de-ee8c-450a-8f97-bf9eaf0a239b", null, "User", "USER" },
                    { "9e9b0459-ab3a-4a10-a77d-3506540ce061", null, "Administrator", "ADMINISTRATOR" }
                });
        }
    }
}
