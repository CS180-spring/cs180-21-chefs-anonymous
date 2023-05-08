using System;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CS180ChefsAnonymous.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CS180ChefsAnonymous.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MealPlanController : ControllerBase
    {
        private readonly ChefDbContext _dbContext;

        public MealPlanController(ChefDbContext dbContext)
        {
            _dbContext = dbContext;

        }
        [HttpGet]
        [Route("GetMealPlans")]
        public async Task<IEnumerable<MealPlan>> GetMealPlans()
        {
            return await _dbContext.MealPlans.ToListAsync();
        }
        [HttpGet]
        [Route("GetMeal/{id}")]
        public async Task<ActionResult<List<MealPlan>>> GetSpecificMeals(int id)
        {
            var meals = await _dbContext.MealPlans.Where(mp => mp.UserId == id).ToListAsync();

            if (meals == null || meals.Count == 0)
            {
                return NotFound();
            }

            return meals;
        }


        [HttpPost]
        [Route("AddMealPlan")]
        public async Task<MealPlan> AddMealPlan(MealPlan objMealPlan)
        {
            _dbContext.MealPlans.Add(objMealPlan);
            await _dbContext.SaveChangesAsync();
            return objMealPlan;
        }

        [HttpPatch]
        [Route("UpdateMealPlan/{id}")]
        public async Task<MealPlan> UpdateMealPlan(MealPlan objMealPlan)
        {
            _dbContext.Entry(objMealPlan).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();
            return objMealPlan;
        }

        [HttpDelete]
        [Route("DeleteMealPlan/{id}")]
        public bool DeleteMealPlan(int id)
        {
            bool a = false;
            var MealPlan = _dbContext.MealPlans.Find(id);
            if (MealPlan != null)
            {
                a = true;
                _dbContext.Entry(MealPlan).State = EntityState.Deleted;
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