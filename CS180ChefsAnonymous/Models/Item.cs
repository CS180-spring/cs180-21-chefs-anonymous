using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace CS180ChefsAnonymous.Models;

public partial class Item
{
    public string ItemName { get; set; } = null!;

    public int? CalPerKg { get; set; }

    public string? OtherInfo { get; set; }

    [JsonIgnore]
    public virtual ICollection<Ingredient> Ingredients { get; set; } = new List<Ingredient>();
    [JsonIgnore]
    public virtual ICollection<Inventory> Inventories { get; set; } = new List<Inventory>();

    
}
