using System;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CS180ChefsAnonymous.Models;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Diagnostics.Metrics;
using System.Threading.Channels;
using Microsoft.Extensions.Options;

namespace CS180ChefsAnonymous.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ChefDbContext _dbContext;

        public UserController(ChefDbContext dbContext)
        {
            _dbContext = dbContext;

        }
        [HttpGet]
        [Route("GetUsers")]
        public async Task<IEnumerable<User>> GetUsers()
        {
            return await _dbContext.Users.ToListAsync();
    
        }
        [HttpGet]
        [Route("GetUser/{id}")]
        public async Task<ActionResult<User>> GetSpecificUser(int id)
        {
            var user = await _dbContext.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        /**
         * Easy route for login, we can change later for better authentication
         */
        [HttpPost]
        [Route("Login")] 
        public async Task<IActionResult> Login([FromBody]LoginModel loginModel)
        {
            var user = await _dbContext.Users
                .FirstOrDefaultAsync(u => u.Username == loginModel.UserName && u.Password == loginModel.Password);


            if (user == null)
            {
                return Unauthorized("Invalid user or password");
            }

            var options = new JsonSerializerOptions
            {
                ReferenceHandler = ReferenceHandler.Preserve
            };

            var json = JsonSerializer.Serialize(user, options);
            return Ok(json);
        }

        [HttpGet]
        [Route("GetUserRecipes/{userId}")]
        public async Task<IActionResult> GetUserRecipes(int userId)
        {
            var user = await _dbContext.Users
                .Include(u => u.Recipes)
                .FirstOrDefaultAsync(u => u.UserId == userId);

            if (user == null)
            {
                return NotFound();
            }

            var options = new JsonSerializerOptions
            {
                ReferenceHandler = ReferenceHandler.Preserve
            };

            var json = JsonSerializer.Serialize(user.Recipes, options);
            return Ok(json);
        }

        [HttpGet]
        [Route("GetUserRecipesAscending/{userId}")]
        public async Task<IActionResult> GetRecipesAscending(int userId)
        {
            // Find recipes with the given userId
            var recipes = await _dbContext.Recipes
                .Where(r => r.UserId == userId)
                .ToListAsync();

            var options = new JsonSerializerOptions
            {
                ReferenceHandler = ReferenceHandler.Preserve
            };

            // Sort the recipes in ascending order by title
            var json = JsonSerializer.Serialize(recipes.OrderBy(r => r.RecipeTitle).ToList(), options);
            

            // Return the sorted recipes
            return Ok(json);
        }


        [HttpPost]
        [Route("AddUser")]
        public async Task<User> AddUser(User objUser)
        {
            //create unique userId
            int userId = 1;
            while (await _dbContext.Users.AnyAsync(u => u.UserId == userId))
            {
                userId++;
            }
            objUser.UserId = userId;

            _dbContext.Users.Add(objUser);
            await _dbContext.SaveChangesAsync();
            return objUser;
        }

        [HttpPatch]
        [Route("UpdateUser/{id}")]
        public async Task<User> UpdateUser(User objUser)
        {
            _dbContext.Entry(objUser).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();
            return objUser;
        }

        [HttpDelete]
        [Route("DeleteUser/{id}")]
        public bool DeleteUser(int id)
        {
            bool a = false;
            var User = _dbContext.Users.Find(id);
            if (User != null)
            {
                a = true;
                _dbContext.Entry(User).State = EntityState.Deleted;
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