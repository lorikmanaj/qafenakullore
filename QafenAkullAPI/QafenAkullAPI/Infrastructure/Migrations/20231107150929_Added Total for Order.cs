using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace QafenAkullAPI.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddedTotalforOrder : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "2c6f0420-b5dc-44f2-b93c-75ffa6b85f9b");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "59a3be12-0ecf-4e09-813e-a889b228fd71");

            migrationBuilder.RenameColumn(
                name: "OPId",
                table: "OrderProducts",
                newName: "OrderProductId");

            migrationBuilder.AddColumn<decimal>(
                name: "Total",
                table: "Orders",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "509ad108-149f-4230-9099-79591caf05e8", null, "User", "USER" },
                    { "e70e4f82-adcc-42c7-badc-eb9979a21eb8", null, "Administrator", "ADMINISTRATOR" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "509ad108-149f-4230-9099-79591caf05e8");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "e70e4f82-adcc-42c7-badc-eb9979a21eb8");

            migrationBuilder.DropColumn(
                name: "Total",
                table: "Orders");

            migrationBuilder.RenameColumn(
                name: "OrderProductId",
                table: "OrderProducts",
                newName: "OPId");

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "2c6f0420-b5dc-44f2-b93c-75ffa6b85f9b", null, "User", "USER" },
                    { "59a3be12-0ecf-4e09-813e-a889b228fd71", null, "Administrator", "ADMINISTRATOR" }
                });
        }
    }
}
