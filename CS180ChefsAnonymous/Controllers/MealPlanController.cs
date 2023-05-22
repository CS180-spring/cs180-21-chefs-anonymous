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

        [HttpPut]
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

        [HttpGet]
        [Route("GetMealPlan/{user_id}")]
        public async Task<ActionResult<List<List<MealPlan>>>> GetMealPlan(int user_id)
        {
            // var MealPlan = _dbContext.MealPlans.Find(user_id);
            // return await _dbContext.MealPlans.Where(mp => mp.UserId == user_id).ToListAsync();
            var meals = await _dbContext.MealPlans.Where(mp => mp.UserId == user_id).ToListAsync();
            string[,] mealNameArr = new string[5,7];
            // if (meals == null)
            // {
            //     return NotFound();
            // }
            // return await meals
            var mealNames = new List<List<String>>();
            Console.WriteLine("heree");
            foreach (var meal in meals) {
                // i want mealName list like this []
                // mealNames.Add(meal);
                // var mealName = await _dbContext.Recipes.FindAsync(meal.RecipeId);
                // if (mealName != null)
                // {
                //     // mealNames.Add(mealName.RecipeTitle);
                //     Console.WriteLine(meal);
                // }
                // var mealName = await _dbContext.Recipes.Where(mp => mp.RecipeId == meal.RecipeId).ToListAsync();
                for (int i = 0; i < 5; i++) {
                    for (int j = 0; j < 7; j++) {
                        // if (mealName != null) {
                        //     mealNameArr[i, j] = mealName.RecipeTitle;
                        // } else {
                        //     // mealNameArr[i, j] = null;
                        // }
                    }
                }
            }

            return mealNames;
            // var mealplan_name = await _dbContext.Recipes.Where(mp => mp.RecipeId == id).ToList();

            // // Extract the recipe names from the included recipes
            // var recipeNames = meals.Select(mp => mp.Recipe?.RecipeName).ToList();

            // return recipeNames;
        }
    }
}