using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CS180ChefsAnonymous.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Category",
                columns: table => new
                {
                    categoryID = table.Column<int>(type: "int", nullable: false),
                    cuisine = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
                    mealtime = table.Column<DateTime>(type: "datetime", nullable: false),
                    difficulty = table.Column<int>(type: "int", nullable: false),
                    amnt_of_servings = table.Column<decimal>(type: "decimal(10,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Category__23CAF1F8A25D7402", x => x.categoryID);
                });

            migrationBuilder.CreateTable(
                name: "Inventories",
                columns: table => new
                {
                    InventoryId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    ItemName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Qty = table.Column<int>(type: "int", nullable: false),
                    unit = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Inventories", x => x.InventoryId);
                });

            migrationBuilder.CreateTable(
                name: "Items",
                columns: table => new
                {
                    ItemName = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    CalPerKg = table.Column<int>(type: "int", nullable: false),
                    OtherInfo = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Items", x => x.ItemName);
                });

            migrationBuilder.CreateTable(
                name: "MealPlans",
                columns: table => new
                {
                    MealPlanId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MealTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DayOfTheWeek = table.Column<int>(type: "int", nullable: false),
                    Recipe_id = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MealPlans", x => x.MealPlanId);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    userid = table.Column<int>(type: "int", nullable: false),
                    name = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
                    username = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
                    password = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
                    email = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Users__CBA1B257585BC2B5", x => x.userid);
                });

            migrationBuilder.CreateTable(
                name: "Recipes",
                columns: table => new
                {
                    recipe_id = table.Column<int>(type: "int", nullable: false),
                    recipe_title = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    recipe_desc = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
                    instructions = table.Column<string>(type: "varchar(200)", unicode: false, maxLength: 200, nullable: true),
                    prep_time = table.Column<int>(type: "int", nullable: true),
                    cooking_time = table.Column<int>(type: "int", nullable: true),
                    user_id = table.Column<int>(type: "int", nullable: false),
                    category_id = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Recipes", x => x.recipe_id);
                    table.ForeignKey(
                        name: "category_id",
                        column: x => x.category_id,
                        principalTable: "Category",
                        principalColumn: "categoryID");
                    table.ForeignKey(
                        name: "user_id",
                        column: x => x.user_id,
                        principalTable: "Users",
                        principalColumn: "userid");
                });

            migrationBuilder.CreateTable(
                name: "Ingredients",
                columns: table => new
                {
                    ingredient_id = table.Column<int>(type: "int", nullable: false),
                    recipe_id = table.Column<int>(type: "int", nullable: false),
                    name = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
                    qty = table.Column<int>(type: "int", nullable: true),
                    unit = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ingredients", x => x.ingredient_id);
                    table.ForeignKey(
                        name: "recipe_id",
                        column: x => x.recipe_id,
                        principalTable: "Recipes",
                        principalColumn: "recipe_id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Ingredients_recipe_id",
                table: "Ingredients",
                column: "recipe_id");

            migrationBuilder.CreateIndex(
                name: "IX_Recipes_category_id",
                table: "Recipes",
                column: "category_id");

            migrationBuilder.CreateIndex(
                name: "IX_Recipes_user_id",
                table: "Recipes",
                column: "user_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Ingredients");

            migrationBuilder.DropTable(
                name: "Inventories");

            migrationBuilder.DropTable(
                name: "Items");

            migrationBuilder.DropTable(
                name: "MealPlans");

            migrationBuilder.DropTable(
                name: "Recipes");

            migrationBuilder.DropTable(
                name: "Category");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
