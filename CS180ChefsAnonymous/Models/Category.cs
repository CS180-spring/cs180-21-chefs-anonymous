using System;
using System.Collections.Generic;

namespace CS180ChefsAnonymous.Models;

public partial class Category
{
    public int CategoryId { get; set; }

    public string? Cuisine { get; set; }

    public string? Category_type { get; set; }

    public string? Mealtime { get; set; }

    public int Difficulty { get; set; }

    public decimal AmntOfServings { get; set; }

    public string? Favorite { get; set; }

    public virtual ICollection<Recipe> Recipes { get; set; } = new List<Recipe>();
}
