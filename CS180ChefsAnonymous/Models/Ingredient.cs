using System;
using System.Collections.Generic;

namespace CS180ChefsAnonymous.Models;

public partial class Ingredient
{
    public Guid IngredientId { get; set; }

    public Guid? RecipeId { get; set; }

    public string? ItemName { get; set; }

    public int? Qty { get; set; }

    public string? Unit { get; set; }

    public virtual Item? ItemNameNavigation { get; set; }

    public virtual Recipe? Recipe { get; set; }
}
