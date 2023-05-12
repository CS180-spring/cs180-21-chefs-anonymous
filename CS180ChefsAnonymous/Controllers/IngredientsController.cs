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
        public async Task<IEnumerable<Ingredient>> GetIngredientsByRecipe(int recipeId)
        {
            return await _dbContext.Ingredients.Where(i => i.RecipeId == recipeId).ToListAsync();
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
