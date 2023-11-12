using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace QafenAkullAPI.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class ChangedProdReviewsandProdsandUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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
                    { "6db9d375-24f2-4a68-a143-baae4c4eb28c", null, "Administrator", "ADMINISTRATOR" },
                    { "ee93077c-d0de-45c7-82f8-2941b0b0e05e", null, "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "6db9d375-24f2-4a68-a143-baae4c4eb28c");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "ee93077c-d0de-45c7-82f8-2941b0b0e05e");

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "bc99918f-b0f3-4da5-a2c0-0ac38c6c9b19", null, "Administrator", "ADMINISTRATOR" },
                    { "c28b5777-9876-443d-86af-280d54f1ada8", null, "User", "USER" }
                });
        }
    }
}
