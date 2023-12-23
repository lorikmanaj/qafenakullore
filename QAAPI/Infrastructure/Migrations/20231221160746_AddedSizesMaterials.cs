using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddedSizesMaterials : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ProductMaterials",
                columns: table => new
                {
                    MaterialId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Material = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductMaterials", x => x.MaterialId);
                });

            migrationBuilder.CreateTable(
                name: "TypeSizes",
                columns: table => new
                {
                    TypeSizeId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Size = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ProductTypeId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TypeSizes", x => x.TypeSizeId);
                    table.ForeignKey(
                        name: "FK_TypeSizes_ProductTypes_ProductTypeId",
                        column: x => x.ProductTypeId,
                        principalTable: "ProductTypes",
                        principalColumn: "TypeId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProductProductMaterial",
                columns: table => new
                {
                    MaterialsMaterialId = table.Column<int>(type: "int", nullable: false),
                    ProductsProductId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductProductMaterial", x => new { x.MaterialsMaterialId, x.ProductsProductId });
                    table.ForeignKey(
                        name: "FK_ProductProductMaterial_ProductMaterials_MaterialsMaterialId",
                        column: x => x.MaterialsMaterialId,
                        principalTable: "ProductMaterials",
                        principalColumn: "MaterialId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProductProductMaterial_Products_ProductsProductId",
                        column: x => x.ProductsProductId,
                        principalTable: "Products",
                        principalColumn: "ProductId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ProductProductMaterial_ProductsProductId",
                table: "ProductProductMaterial",
                column: "ProductsProductId");

            migrationBuilder.CreateIndex(
                name: "IX_TypeSizes_ProductTypeId",
                table: "TypeSizes",
                column: "ProductTypeId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ProductProductMaterial");

            migrationBuilder.DropTable(
                name: "TypeSizes");

            migrationBuilder.DropTable(
                name: "ProductMaterials");
        }
    }
}
