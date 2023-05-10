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
        public async Task<IEnumerable<Ingredient>> Getingredients()
        {
            return await _dbContext.Ingredients.ToListAsync();
        }

        [HttpPost]
        [Route("AddIngredient")]
        public async Task<Ingredient> Addingredient(Ingredient objingredient)
        {
            string itemName = objingredient.ItemName;
            if ( !await _dbContext.Items.AnyAsync(i => i.ItemName == itemName))
            {
                var newItem = new Item
                {
                    ItemName = itemName
                };
                _dbContext.Items.Add(newItem);
            }
            _dbContext.Ingredients.Add(objingredient);
            await _dbContext.SaveChangesAsync();
            return objingredient;
        }

        [HttpPatch]
        [Route("UpdateIngredient/{id}")]
        public async Task<Ingredient> Updateingredient(Ingredient objingredient)
        {
            _dbContext.Entry(objingredient).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();
            return objingredient;
        }

        [HttpDelete]
        [Route("DeleteIngredient/{id}")]
        public bool Deleteingredient(int id)
        {
            bool a = false;
            var ingredient = _dbContext.Ingredients.Find(id);
            if (ingredient != null)
            {
                a = true;
                _dbContext.Entry(ingredient).State = EntityState.Deleted;
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
