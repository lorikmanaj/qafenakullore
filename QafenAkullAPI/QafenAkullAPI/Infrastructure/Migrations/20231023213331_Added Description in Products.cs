using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace QafenAkullAPI.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddedDescriptioninProducts : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "468796aa-7af3-4a6e-9dad-547bc3448449");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "4b1b93cc-e0b3-46d2-8197-d9b5d6bba03e");

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "70755f3a-96e4-48ac-8201-787e8946ff40", null, "User", "USER" },
                    { "aa5fb9ee-c25c-40f1-b62f-167cebe7fe62", null, "Administrator", "ADMINISTRATOR" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "70755f3a-96e4-48ac-8201-787e8946ff40");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "aa5fb9ee-c25c-40f1-b62f-167cebe7fe62");

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "468796aa-7af3-4a6e-9dad-547bc3448449", null, "Administrator", "ADMINISTRATOR" },
                    { "4b1b93cc-e0b3-46d2-8197-d9b5d6bba03e", null, "User", "USER" }
                });
        }
    }
}
