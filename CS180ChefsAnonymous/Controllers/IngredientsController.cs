using System;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CS180ChefsAnonymous.Models;
using Microsoft.EntityFrameworkCore;

namespace CS180ChefsAnonymous.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IngredientController : ControllerBase
    {
        private readonly ChefDbContext _dbContext;

        public IngredientController(ChefDbContext dbContext)
        {
            _dbContext = dbContext;

        }
        [HttpGet]
        [Route("GetIngredients")]
        public async Task<IEnumerable<Ingredient>> GetIngredients()
        {
            return await _dbContext.Ingredients.ToListAsync();
        }

        [HttpGet]
        [Route("GetIngredientsByRecipe/{recipeId}")]
        public async Task<IEnumerable<Ingredient>> GetIngredientsByRecipe(Guid recipeId)
        {
            return await _dbContext.Ingredients.Where(i => i.RecipeId == recipeId).ToListAsync();
        }

        [HttpGet]
        [Route("GetGrocery/{id}")]
        public async Task<ActionResult<List<Ingredient>>> GetGrocery(int id)
        {
            var meals = await _dbContext.MealPlans.Where(mp => mp.UserId == id).ToListAsync();

            if (meals == null || meals.Count == 0)
            {
                return NotFound();
            }

            var recipes = meals.Select(mp => mp.RecipeId).ToList();
            var ingredients = await _dbContext.Ingredients.Where(i => recipes.Contains(i.RecipeId)).ToListAsync();

            var inventory = await _dbContext.Inventories.Where(inv => inv.UserId == id).Select(inv => new { inv.ItemName, inv.Qty }).ToListAsync();

            var groceryList = new List<Ingredient>();

            foreach (var ingredient in ingredients)
            {
                var inventoryItem = inventory.FirstOrDefault(inv => inv.ItemName == ingredient.ItemName);
                if (inventoryItem != null)
                {
//#TODO ADD CONVERT FUNCTION AFTER CHECKING UNITS
                    if (inventoryItem.Qty < ingredient.Qty)
                    {
                        var remainder = ingredient.Qty- inventoryItem.Qty;
                        groceryList.Add(new Ingredient { ItemName = ingredient.ItemName, Qty = remainder });
                    }
                }
                else
                {
                    groceryList.Add(ingredient);
                }
            }

            return groceryList;
        }


        [HttpPost]
        [Route("AddIngredient")]
        public async Task<Ingredient> AddIngredient(Ingredient objIngredient)
        {
            string itemName = objIngredient.ItemName;
            if ( !await _dbContext.Items.AnyAsync(i => i.ItemName == itemName))
            {
                var newItem = new Item
                {
                    ItemName = itemName
                };
                _dbContext.Items.Add(newItem);
            }
            _dbContext.Ingredients.Add(objIngredient);
            await _dbContext.SaveChangesAsync();
            return objIngredient;
        }

        [HttpPatch]
        [Route("UpdateIngredient/{id}")]
        public async Task<Ingredient> UpdateIngredient(Ingredient objIngredient)
        {
            _dbContext.Entry(objIngredient).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();
            return objIngredient;
        }

        [HttpDelete]
        [Route("DeleteIngredient/{id}")]
        public bool DeleteIngredient(int id)
        {
            bool a = false;
            var Ingredient = _dbContext.Ingredients.Find(id);
            if (Ingredient != null)
            {
                a = true;
                _dbContext.Entry(Ingredient).State = EntityState.Deleted;
                _dbContext.SaveChanges();
            }
            else
            {
                a = false;
            }
            return a;

        }
    }
}
