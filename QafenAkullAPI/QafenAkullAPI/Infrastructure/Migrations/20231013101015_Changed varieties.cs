using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace QafenAkullAPI.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class Changedvarieties : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "a729b293-085f-4fdc-abaf-5cb19e432d99");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "b7b469d1-eefd-4acd-b19f-f30374fb457c");

            migrationBuilder.RenameColumn(
                name: "Image",
                table: "Varieties",
                newName: "ImageUrl");

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "1604d0cb-75f1-4568-8252-9261647b62ea", null, "User", "USER" },
                    { "960bc8f7-0c4e-4d07-80dd-4c105ee25351", null, "Administrator", "ADMINISTRATOR" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "1604d0cb-75f1-4568-8252-9261647b62ea");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "960bc8f7-0c4e-4d07-80dd-4c105ee25351");

            migrationBuilder.RenameColumn(
                name: "ImageUrl",
                table: "Varieties",
                newName: "Image");

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "a729b293-085f-4fdc-abaf-5cb19e432d99", null, "Administrator", "ADMINISTRATOR" },
                    { "b7b469d1-eefd-4acd-b19f-f30374fb457c", null, "User", "USER" }
                });
        }
    }
}
