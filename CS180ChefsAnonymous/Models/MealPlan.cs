using System;
namespace CS180ChefsAnonymous.Models
{
	public class MealPlan
	{
		public int MealPlanId { get; set; }
		public DateTime MealTime { get; set; }
		public DayOfWeek DayOfTheWeek { get; set; }
		public int Recipe_id { get; set; }

		public MealPlan()
		{
		}
	}
}

