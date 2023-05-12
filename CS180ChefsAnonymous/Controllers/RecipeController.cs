using System;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CS180ChefsAnonymous.Models;
using Microsoft.EntityFrameworkCore;

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
        public async Task<ActionResult<Recipe>> GetRecipe(int id)
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
        [Route("GetAlphaRecipes")]
        public async Task<IEnumerable<Recipe>> GetRecipesAlpha()
        {
            return await _dbContext.Recipes.OrderBy(r => r.RecipeTitle).ToListAsync();
        }

        [HttpPost]
        [Route("AddRecipe")]
        public async Task<Recipe> AddRecipe(Recipe objRecipe)
        {
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
        public bool DeleteRecipe(int id)
        {
            bool a = false;
            var Recipe = _dbContext.Recipes.Find(id);
            if (Recipe != null)
            {
                a = true;
                _dbContext.Entry(Recipe).State = EntityState.Deleted;
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