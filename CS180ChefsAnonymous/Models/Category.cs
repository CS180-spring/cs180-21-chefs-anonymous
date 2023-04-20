using System;
namespace CS180ChefsAnonymous.Models
{
	public class Category
	{
		public int categoryID{ get; set; }
        public string? cuisine { get; set; }
        public DateTime mealtime { get; set; }
        public int difficulty { get; set; }
        public decimal amnt_of_servings { get; set; }
    }
}

