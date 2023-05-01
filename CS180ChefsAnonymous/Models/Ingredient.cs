using System;
using System.Collections.Generic;

namespace CS180ChefsAnonymous.Models;

public partial class Ingredient
{
    public int IngredientId { get; set; }

    public int RecipeId { get; set; }

    public string? Name { get; set; }

    public int? Qty { get; set; }

    public int? Unit { get; set; }

    public virtual Recipe Recipe { get; set; }
}
