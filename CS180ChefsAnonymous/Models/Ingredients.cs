using System.ComponentModel.DataAnnotations;
namespace CS180ChefsAnonymous.Models
{
    public class Ingredients
    {
        [Key]
        public Guid Ingredient_id { get; set; }
        public Guid Recipe_id { get; set; }
        public string Name { get; set; }
        public int Qty { get; set; }
        public int Unit { get; set; }

        public Ingredients()
        {
        }
    }
}
