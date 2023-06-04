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
        public async Task<MealPlan> UpdateSpecificMealPlan(MealPlan objMealPlan)
        {
            _dbContext.Entry(objMealPlan).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();
            return objMealPlan;
        }

        [HttpPost]
        [Route("UpdateMealPlan")]
        public async Task<MealPlan> UpdateMealPlan(MealPlan objMealPlan)
        {
            // Check if mealplan exists
            if (objMealPlan.MealPlanId != -5)
            {
                // If it exists, update it
                _dbContext.Entry(objMealPlan).State = EntityState.Modified;
            }
            else
            {
                // If it doesn't exist, create a new meal plan
                _dbContext.MealPlans.Add(objMealPlan);
            }

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
        public async Task<IEnumerable<MealPlan>> GetMealPlan(int user_id)
        {
            return await _dbContext.MealPlans.Where(mp => mp.UserId == user_id).ToListAsync();
        }

        [HttpGet]
        [Route("GetMealPlanName/{user_id}")]
        public async Task<ActionResult<List<List<string>>>> GetMealPlanName(int user_id)
        {
            var meals = await _dbContext.MealPlans.Where(mp => mp.UserId == user_id).ToListAsync();

            var mealNames = new List<List<string>>();
            var list1 = new List<string>(new string[7]);
            var list2 = new List<string>(new string[7]);
            var list3 = new List<string>(new string[7]);
            var list4 = new List<string>(new string[7]);
            var list5 = new List<string>(new string[7]);

            Console.WriteLine("heree");
            foreach (var meal in meals) {
                var mealName = await _dbContext.Recipes.FindAsync(meal.RecipeId);
                if (mealName != null)
                {
                    int i = meal.MealTime ?? -1;
                    int j = meal.DayOfWeek ?? -1;
                    if (i == 1) list1[j-1] = mealName.RecipeTitle;
                    else if (i == 2) list2[j-1] = mealName.RecipeTitle;
                    else if (i == 3) list3[j-1] = mealName.RecipeTitle;
                    else if (i == 4) list4[j-1] = mealName.RecipeTitle;
                    else if (i == 5) list5[j-1] = mealName.RecipeTitle;
                }
            }
            mealNames.Add(list1);
            mealNames.Add(list2);
            mealNames.Add(list3);
            mealNames.Add(list4);
            mealNames.Add(list5);
            return mealNames;
        }
    }
}