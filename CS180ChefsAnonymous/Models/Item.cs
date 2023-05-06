﻿using System;
using System.Collections.Generic;

namespace CS180ChefsAnonymous.Models;

public partial class Item
{
    public string ItemName { get; set; } = null!;

    public int? CalPerKg { get; set; }

    public string? OtherInfo { get; set; }

    public virtual ICollection<Ingredient> Ingredients { get; set; } = new List<Ingredient>();

    public virtual ICollection<Inventory> Inventories { get; set; } = new List<Inventory>();
}