using System;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CS180ChefsAnonymous.Models;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace CS180ChefsAnonymous.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecipeController : ControllerBase
    {
        private readonly ChefDbContext _dbContext;

        public RecipeController(ChefDbContext dbContext)
        {
            _dbContext = dbContext;

        }

        [HttpGet]
        [Route("GetRecipe/{id}")]
        public async Task<ActionResult<Recipe>> GetRecipe(Guid id)
        {
            var recipe = await _dbContext.Recipes.FindAsync(id);

            if (recipe == null)
            {
                return NotFound();
            }

            return recipe;
        }

        [HttpGet]
        [Route("GetRecipes")]
        public async Task<IEnumerable<Recipe>> GetRecipes()
        {
            return await _dbContext.Recipes.ToListAsync();
        }

        [HttpGet]
        [Route("GetRecipesAscending")]
        public async Task<IEnumerable<Recipe>> GetRecipesAscending()
        {
            return await _dbContext.Recipes.OrderBy(r => r.RecipeTitle).ToListAsync();
        }

        [HttpGet]
        [Route("GetRecipesDescending")]
        public async Task<IEnumerable<Recipe>> GetRecipesDescending()
        {
            return await _dbContext.Recipes.OrderByDescending(r => r.RecipeTitle).ToListAsync();
        }

        [HttpPost]
        [Route("AddRecipe")]
        public async Task<Recipe> AddRecipe(Recipe objRecipe)
        {
            //objRecipe.RecipeId = Guid.NewGuid();
            _dbContext.Recipes.Add(objRecipe);
            await _dbContext.SaveChangesAsync();
            return objRecipe;
        }

        [HttpPatch]
        [Route("UpdateRecipe/{id}")]
        public async Task<Recipe> UpdateRecipe(Recipe objRecipe)
        {
            _dbContext.Entry(objRecipe).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();
            return objRecipe;
        }


        [HttpDelete]
        [Route("DeleteRecipe/{id}")]
        public async Task<IActionResult> DeleteRecipe(Guid id)
        {
            var recipe = await _dbContext.Recipes.Include(r => r.Ingredients).FirstOrDefaultAsync(r => r.RecipeId == id);

            if (recipe == null)
            {
                return NotFound();
            }

            _dbContext.Ingredients.RemoveRange(recipe.Ingredients);
            _dbContext.Recipes.Remove(recipe);
            await _dbContext.SaveChangesAsync();

            return Ok();
        }


        [HttpGet]
        [Route("GetRecipeIngredients/{recipeId}")]
        public async Task<IActionResult> GetRecipeIngredients(Guid recipeId)
        {
            var recipe = await _dbContext.Recipes
                .Include(r => r.Ingredients)
                .FirstOrDefaultAsync(r => r.RecipeId == recipeId);

            if (recipe == null)
            {
                return NotFound();
            }

            var options = new JsonSerializerOptions
            {
                ReferenceHandler = ReferenceHandler.Preserve
            };

            var json = JsonSerializer.Serialize(recipe.Ingredients, options);
            return Ok(json);
        }
    }
}