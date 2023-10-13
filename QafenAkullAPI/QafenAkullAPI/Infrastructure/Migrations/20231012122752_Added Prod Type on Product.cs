using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace QafenAkullAPI.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddedProdTypeonProduct : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "238024b3-6db6-487d-b498-24b4d74272ff");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "2b731802-ddd1-47f4-95d7-10e30b95c79a");

            migrationBuilder.AddColumn<int>(
                name: "TypeId",
                table: "Products",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "a729b293-085f-4fdc-abaf-5cb19e432d99", null, "Administrator", "ADMINISTRATOR" },
                    { "b7b469d1-eefd-4acd-b19f-f30374fb457c", null, "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "a729b293-085f-4fdc-abaf-5cb19e432d99");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "b7b469d1-eefd-4acd-b19f-f30374fb457c");

            migrationBuilder.DropColumn(
                name: "TypeId",
                table: "Products");

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "238024b3-6db6-487d-b498-24b4d74272ff", null, "Administrator", "ADMINISTRATOR" },
                    { "2b731802-ddd1-47f4-95d7-10e30b95c79a", null, "User", "USER" }
                });
        }
    }
}
