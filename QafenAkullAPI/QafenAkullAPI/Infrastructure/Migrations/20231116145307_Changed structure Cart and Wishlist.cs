using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace QafenAkullAPI.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class ChangedstructureCartandWishlist : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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
                    { "2d4dd4ec-eaf8-4ffe-8f85-6112dfc8ed10", null, "User", "USER" },
                    { "b945cd7e-e42f-4c25-beb7-96b98e7b88a8", null, "Administrator", "ADMINISTRATOR" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "2d4dd4ec-eaf8-4ffe-8f85-6112dfc8ed10");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "b945cd7e-e42f-4c25-beb7-96b98e7b88a8");

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "6db9d375-24f2-4a68-a143-baae4c4eb28c", null, "Administrator", "ADMINISTRATOR" },
                    { "ee93077c-d0de-45c7-82f8-2941b0b0e05e", null, "User", "USER" }
                });
        }
    }
}
