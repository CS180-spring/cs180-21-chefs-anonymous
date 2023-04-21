using System;
using System.Collections.Generic;

namespace CS180ChefsAnonymous.Models;

public partial class User
{
    public int Userid { get; set; }

    public string? Name { get; set; }

    public string? Username { get; set; }

    public string? Password { get; set; }

    public string? Email { get; set; }

    public virtual ICollection<Recipe> Recipes { get; set; } = new List<Recipe>();
}
