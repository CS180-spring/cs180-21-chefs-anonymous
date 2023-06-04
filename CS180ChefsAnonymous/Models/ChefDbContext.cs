using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace CS180ChefsAnonymous.Models;

public partial class ChefDbContext : DbContext
{
    public ChefDbContext()
    {
    }

    public ChefDbContext(DbContextOptions<ChefDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Category> Categories { get; set; }

    public virtual DbSet<Ingredient> Ingredients { get; set; }

    public virtual DbSet<Inventory> Inventories { get; set; }

    public virtual DbSet<Item> Items { get; set; }

    public virtual DbSet<MealPlan> MealPlans { get; set; }

    public virtual DbSet<Recipe> Recipes { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=tcp:chefdb.database.windows.net,1433;Initial Catalog=ChefDB;Persist Security Info=False;User ID=Chef;Password=Anonymous!;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Category>(entity =>
        {
            entity.HasKey(e => e.CategoryId).HasName("PK__tmp_ms_x__23CAF1F82E48405F");

            entity.ToTable("Category");

            entity.Property(e => e.CategoryId)
                .ValueGeneratedNever()
                .HasColumnName("categoryID");
            entity.Property(e => e.AmntOfServings)
                .HasColumnType("decimal(10, 2)")
                .HasColumnName("amnt_of_servings");
            entity.Property(e => e.CategoryType)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("categoryType");
            entity.Property(e => e.Cuisine)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("cuisine");
            entity.Property(e => e.Difficulty).HasColumnName("difficulty");
            entity.Property(e => e.Favorite)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("favorite");
            entity.Property(e => e.Mealtime)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("mealtime");
        });

        modelBuilder.Entity<Ingredient>(entity =>
        {
            entity.HasKey(e => e.IngredientId).HasName("PK__tmp_ms_x__B0E453CFAD6D7542");

            entity.Property(e => e.IngredientId)
                .ValueGeneratedNever()
                .HasColumnName("ingredient_id");
            entity.Property(e => e.ItemName)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("item_name");
            entity.Property(e => e.Qty).HasColumnName("qty");
            entity.Property(e => e.RecipeId).HasColumnName("recipe_id");
            entity.Property(e => e.Unit)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("unit");

            entity.HasOne(d => d.ItemNameNavigation).WithMany(p => p.Ingredients)
                .HasForeignKey(d => d.ItemName)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Ingredien__item___18B6AB08");

            entity.HasOne(d => d.Recipe).WithMany(p => p.Ingredients)
                .HasForeignKey(d => d.RecipeId)
                .HasConstraintName("FK_Ingredients_Recipes");
        });

        modelBuilder.Entity<Inventory>(entity =>
        {
            entity.ToTable("Inventory");

            entity.Property(e => e.InventoryId)
                .ValueGeneratedNever()
                .HasColumnName("inventory_id");
            entity.Property(e => e.ItemName)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("item_name");
            entity.Property(e => e.Qty).HasColumnName("qty");
            entity.Property(e => e.Unit)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("unit");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.ItemNameNavigation).WithMany(p => p.Inventories)
                .HasForeignKey(d => d.ItemName)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("item_name");

            entity.HasOne(d => d.User).WithMany(p => p.Inventories)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("userid");
        });

        modelBuilder.Entity<Item>(entity =>
        {
            entity.HasKey(e => e.ItemName);

            entity.Property(e => e.ItemName)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("item_name");
            entity.Property(e => e.CalPerKg).HasColumnName("calPerKg");
            entity.Property(e => e.OtherInfo)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("other_info");
        });

        modelBuilder.Entity<MealPlan>(entity =>
        {
            entity.HasKey(e => e.MealPlanId).HasName("PK__tmp_ms_x__05C576073340C26E");

            entity.ToTable("MealPlan");

            entity.Property(e => e.MealPlanId)
                .ValueGeneratedNever()
                .HasColumnName("meal_plan_id");
            entity.Property(e => e.DayOfWeek).HasColumnName("day_of_week");
            entity.Property(e => e.MealTime).HasColumnName("meal_time");
            entity.Property(e => e.RecipeId).HasColumnName("recipe_id");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.Recipe).WithMany(p => p.MealPlans)
                .HasForeignKey(d => d.RecipeId)
                .HasConstraintName("RecipeId");

            entity.HasOne(d => d.User).WithMany(p => p.MealPlans)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK__MealPlan__user_i__15DA3E5D");
        });

        modelBuilder.Entity<Recipe>(entity =>
        {
            entity.Property(e => e.RecipeId)
                .ValueGeneratedNever()
                .HasColumnName("recipe_id");
            entity.Property(e => e.CategoryId).HasColumnName("category_id");
            entity.Property(e => e.CookingTime).HasColumnName("cooking_time");
            entity.Property(e => e.Instructions)
                .HasMaxLength(200)
                .IsUnicode(false)
                .HasColumnName("instructions");
            entity.Property(e => e.PrepTime).HasColumnName("prep_time");
            entity.Property(e => e.RecipeDesc)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("recipe_desc");
            entity.Property(e => e.RecipeTitle)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("recipe_title");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.Category).WithMany(p => p.Recipes)
                .HasForeignKey(d => d.CategoryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("category_id");

            entity.HasOne(d => d.User).WithMany(p => p.Recipes)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("user_id");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__Users__CBA1B257585BC2B5");

            entity.Property(e => e.UserId)
                .ValueGeneratedNever()
                .HasColumnName("user_id");
            entity.Property(e => e.Email)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("email");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("name");
            entity.Property(e => e.Password)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("password");
            entity.Property(e => e.Username)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("username");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
