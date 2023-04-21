using System.ComponentModel.DataAnnotations;
namespace CS180ChefsAnonymous.Models
{
    public class Recipes
    {
        [Key]
        public Guid Recipe_id { get; set; }
        public string Recipe_title { get; set; }
        public string Recipe_desc { get; set; }
        public int Prep_time { get; set; }
        public int Cooking_time { get; set; }
        public Guid User_id { get; set; }
        public Guid Category_id { get; set; }

        public Recipes()
        { 
        }
    }
}