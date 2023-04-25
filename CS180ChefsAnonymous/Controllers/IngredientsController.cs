using System;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CS180ChefsAnonymous.Models;
using Microsoft.EntityFrameworkCore;

namespace CS180ChefsAnonymous.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ingredientController : ControllerBase
    {
        private readonly ChefDbContext _dbContext;

        public ingredientController(ChefDbContext dbContext)
        {
            _dbContext = dbContext;

        }
        [HttpGet]
        [Route("Getingredients")]
        public async Task<IEnumerable<Ingredient>> Getingredients()
        {
            return await _dbContext.Ingredients.ToListAsync();
        }

        [HttpPost]
        [Route("Addingredient")]
        public async Task<Ingredient> Addingredient(Ingredient objingredient)
        {
            _dbContext.Ingredients.Add(objingredient);
            await _dbContext.SaveChangesAsync();
            return objingredient;
        }

        [HttpPatch]
        [Route("Updateingredient/{id}")]
        public async Task<Ingredient> Updateingredient(Ingredient objingredient)
        {
            _dbContext.Entry(objingredient).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();
            return objingredient;
        }

        [HttpDelete]
        [Route("Deleteingredient/{id}")]
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