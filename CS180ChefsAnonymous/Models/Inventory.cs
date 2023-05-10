using System;
using System.Collections.Generic;

namespace CS180ChefsAnonymous.Models;

public partial class Inventory
{
    public int InventoryId { get; set; }

    public int UserId { get; set; }

    public string ItemName { get; set; } = null!;

    public int? Qty { get; set; }

    public string? Unit { get; set; }

    public virtual Item? ItemNameNavigation { get; set; } 

    public virtual User? User { get; set; } 
}
