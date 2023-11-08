using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace QafenAkullAPI.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddedBlobsforImages : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "70755f3a-96e4-48ac-8201-787e8946ff40");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "aa5fb9ee-c25c-40f1-b62f-167cebe7fe62");

            migrationBuilder.AddColumn<string>(
                name: "ImageBlob",
                table: "Varieties",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "BgImageBlob",
                table: "Products",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MainImageBlob",
                table: "Products",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ImageBlob",
                table: "ItemGalleries",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "2c6f0420-b5dc-44f2-b93c-75ffa6b85f9b", null, "User", "USER" },
                    { "59a3be12-0ecf-4e09-813e-a889b228fd71", null, "Administrator", "ADMINISTRATOR" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "2c6f0420-b5dc-44f2-b93c-75ffa6b85f9b");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "59a3be12-0ecf-4e09-813e-a889b228fd71");

            migrationBuilder.DropColumn(
                name: "ImageBlob",
                table: "Varieties");

            migrationBuilder.DropColumn(
                name: "BgImageBlob",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "MainImageBlob",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "ImageBlob",
                table: "ItemGalleries");

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "70755f3a-96e4-48ac-8201-787e8946ff40", null, "User", "USER" },
                    { "aa5fb9ee-c25c-40f1-b62f-167cebe7fe62", null, "Administrator", "ADMINISTRATOR" }
                });
        }
    }
}
