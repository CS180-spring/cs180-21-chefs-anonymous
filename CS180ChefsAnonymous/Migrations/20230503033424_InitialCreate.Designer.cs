﻿// <auto-generated />
using System;
using CS180ChefsAnonymous.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace CS180ChefsAnonymous.Migrations
{
    [DbContext(typeof(ChefDbContext))]
    [Migration("20230503033424_InitialCreate")]
    partial class InitialCreate
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.5")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("CS180ChefsAnonymous.Models.Category", b =>
                {
                    b.Property<int>("CategoryId")
                        .HasColumnType("int")
                        .HasColumnName("categoryID");

                    b.Property<decimal>("AmntOfServings")
                        .HasColumnType("decimal(10, 2)")
                        .HasColumnName("amnt_of_servings");

                    b.Property<string>("Cuisine")
                        .HasMaxLength(50)
                        .IsUnicode(false)
                        .HasColumnType("varchar(50)")
                        .HasColumnName("cuisine");

                    b.Property<int>("Difficulty")
                        .HasColumnType("int")
                        .HasColumnName("difficulty");

                    b.Property<DateTime>("Mealtime")
                        .HasColumnType("datetime")
                        .HasColumnName("mealtime");

                    b.HasKey("CategoryId")
                        .HasName("PK__Category__23CAF1F8A25D7402");

                    b.ToTable("Category", (string)null);
                });

            modelBuilder.Entity("CS180ChefsAnonymous.Models.Ingredient", b =>
                {
                    b.Property<int>("IngredientId")
                        .HasColumnType("int")
                        .HasColumnName("ingredient_id");

                    b.Property<string>("Name")
                        .HasMaxLength(50)
                        .IsUnicode(false)
                        .HasColumnType("varchar(50)")
                        .HasColumnName("name");

                    b.Property<int?>("Qty")
                        .HasColumnType("int")
                        .HasColumnName("qty");

                    b.Property<int>("RecipeId")
                        .HasColumnType("int")
                        .HasColumnName("recipe_id");

                    b.Property<int?>("Unit")
                        .HasColumnType("int")
                        .HasColumnName("unit");

                    b.HasKey("IngredientId");

                    b.HasIndex("RecipeId");

                    b.ToTable("Ingredients");
                });

            modelBuilder.Entity("CS180ChefsAnonymous.Models.Inventory", b =>
                {
                    b.Property<int>("InventoryId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("InventoryId"));

                    b.Property<string>("ItemName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Qty")
                        .HasColumnType("int");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.Property<int>("unit")
                        .HasColumnType("int");

                    b.HasKey("InventoryId");

                    b.ToTable("Inventories");
                });

            modelBuilder.Entity("CS180ChefsAnonymous.Models.Item", b =>
                {
                    b.Property<string>("ItemName")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("CalPerKg")
                        .HasColumnType("int");

                    b.Property<string>("OtherInfo")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ItemName");

                    b.ToTable("Items");
                });

            modelBuilder.Entity("CS180ChefsAnonymous.Models.MealPlan", b =>
                {
                    b.Property<int>("MealPlanId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("MealPlanId"));

                    b.Property<int>("DayOfTheWeek")
                        .HasColumnType("int");

                    b.Property<DateTime>("MealTime")
                        .HasColumnType("datetime2");

                    b.Property<int>("Recipe_id")
                        .HasColumnType("int");

                    b.HasKey("MealPlanId");

                    b.ToTable("MealPlans");
                });

            modelBuilder.Entity("CS180ChefsAnonymous.Models.Recipe", b =>
                {
                    b.Property<int>("RecipeId")
                        .HasColumnType("int")
                        .HasColumnName("recipe_id");

                    b.Property<int>("CategoryId")
                        .HasColumnType("int")
                        .HasColumnName("category_id");

                    b.Property<int?>("CookingTime")
                        .HasColumnType("int")
                        .HasColumnName("cooking_time");

                    b.Property<string>("Instructions")
                        .HasMaxLength(200)
                        .IsUnicode(false)
                        .HasColumnType("varchar(200)")
                        .HasColumnName("instructions");

                    b.Property<int?>("PrepTime")
                        .HasColumnType("int")
                        .HasColumnName("prep_time");

                    b.Property<string>("RecipeDesc")
                        .HasMaxLength(50)
                        .IsUnicode(false)
                        .HasColumnType("varchar(50)")
                        .HasColumnName("recipe_desc");

                    b.Property<string>("RecipeTitle")
                        .IsRequired()
                        .HasMaxLength(50)
                        .IsUnicode(false)
                        .HasColumnType("varchar(50)")
                        .HasColumnName("recipe_title");

                    b.Property<int>("UserId")
                        .HasColumnType("int")
                        .HasColumnName("user_id");

                    b.HasKey("RecipeId");

                    b.HasIndex("CategoryId");

                    b.HasIndex("UserId");

                    b.ToTable("Recipes");
                });

            modelBuilder.Entity("CS180ChefsAnonymous.Models.User", b =>
                {
                    b.Property<int>("Userid")
                        .HasColumnType("int")
                        .HasColumnName("userid");

                    b.Property<string>("Email")
                        .HasMaxLength(50)
                        .IsUnicode(false)
                        .HasColumnType("varchar(50)")
                        .HasColumnName("email");

                    b.Property<string>("Name")
                        .HasMaxLength(50)
                        .IsUnicode(false)
                        .HasColumnType("varchar(50)")
                        .HasColumnName("name");

                    b.Property<string>("Password")
                        .HasMaxLength(50)
                        .IsUnicode(false)
                        .HasColumnType("varchar(50)")
                        .HasColumnName("password");

                    b.Property<string>("Username")
                        .HasMaxLength(50)
                        .IsUnicode(false)
                        .HasColumnType("varchar(50)")
                        .HasColumnName("username");

                    b.HasKey("Userid")
                        .HasName("PK__Users__CBA1B257585BC2B5");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("CS180ChefsAnonymous.Models.Ingredient", b =>
                {
                    b.HasOne("CS180ChefsAnonymous.Models.Recipe", "Recipe")
                        .WithMany("Ingredients")
                        .HasForeignKey("RecipeId")
                        .IsRequired()
                        .HasConstraintName("recipe_id");

                    b.Navigation("Recipe");
                });

            modelBuilder.Entity("CS180ChefsAnonymous.Models.Recipe", b =>
                {
                    b.HasOne("CS180ChefsAnonymous.Models.Category", "Category")
                        .WithMany("Recipes")
                        .HasForeignKey("CategoryId")
                        .IsRequired()
                        .HasConstraintName("category_id");

                    b.HasOne("CS180ChefsAnonymous.Models.User", "User")
                        .WithMany("Recipes")
                        .HasForeignKey("UserId")
                        .IsRequired()
                        .HasConstraintName("user_id");

                    b.Navigation("Category");

                    b.Navigation("User");
                });

            modelBuilder.Entity("CS180ChefsAnonymous.Models.Category", b =>
                {
                    b.Navigation("Recipes");
                });

            modelBuilder.Entity("CS180ChefsAnonymous.Models.Recipe", b =>
                {
                    b.Navigation("Ingredients");
                });

            modelBuilder.Entity("CS180ChefsAnonymous.Models.User", b =>
                {
                    b.Navigation("Recipes");
                });
#pragma warning restore 612, 618
        }
    }
}
