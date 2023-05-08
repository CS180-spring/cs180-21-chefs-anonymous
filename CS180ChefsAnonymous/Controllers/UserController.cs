﻿using System;
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
        [Route("GetUserRecipes/{userId}")]
        public async Task<IActionResult> GetUserRecipes(int userId)
        {
            var user = await _dbContext.Users
                .Include(u => u.Recipes)
                .FirstOrDefaultAsync(u => u.UserId == userId); //= await _dbContext.Users.FirstOrDefaultAsync(u => u.UserId == userId);

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

        [HttpPost]
        [Route("AddUser")]
        public async Task<User> AddUser(User objUser)
        {
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