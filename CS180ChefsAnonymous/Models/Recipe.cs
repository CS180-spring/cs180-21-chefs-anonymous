﻿using System;
using System.Collections.Generic;

namespace CS180ChefsAnonymous.Models;

public partial class Recipe
{
    public int RecipeId { get; set; }

    public string RecipeTitle { get; set; } = null!;

    public string? RecipeDesc { get; set; }

    public string? Instructions { get; set; }

    public int? PrepTime { get; set; }

    public int? CookingTime { get; set; }

    public int UserId { get; set; }

    public int CategoryId { get; set; }

    public virtual Category Category { get; set; } = null!;

    public virtual ICollection<Ingredient> Ingredients { get; set; } = new List<Ingredient>();

    public virtual User User { get; set; } = null!;
}