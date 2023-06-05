using System;
using System.Collections.Generic;

namespace CS180ChefsAnonymous.Models;

public partial class MealPlan
{
    public int MealPlanId { get; set; }

    public int? UserId { get; set; }

    public int? MealTime { get; set; }

    public int? DayOfWeek { get; set; }

    public Guid? RecipeId { get; set; }

    public virtual Recipe? Recipe { get; set; }

    public virtual User? User { get; set; }
}
