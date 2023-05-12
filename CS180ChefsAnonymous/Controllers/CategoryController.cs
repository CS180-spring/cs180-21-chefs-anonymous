﻿using System;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CS180ChefsAnonymous.Models;
using Microsoft.EntityFrameworkCore;

namespace CS180ChefsAnonymous.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ChefDbContext _dbContext;

        public CategoryController(ChefDbContext dbContext)
        {
            _dbContext = dbContext;

        }
        [HttpGet]
        [Route("GetCategory")]
        public async Task<IEnumerable<Category>> GetCategories()
        {
            return await _dbContext.Categories.ToListAsync();

        }
        

        [HttpPost]
        [Route("AddCategory")]
        public async Task<Category> AddCategoruy(Category objCategory)
        {
            _dbContext.Categories.Add(objCategory);
            await _dbContext.SaveChangesAsync();
            return objCategory;
        }

        [HttpPatch]
        [Route("UpdateCategory/{id}")]
        public async Task<Category> UpdateCategory(Category objCategory)
        {
            _dbContext.Entry(objCategory).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();
            return objCategory;
        }

        [HttpDelete]
        [Route("DeleteCategory/{id}")]
        public bool DeleteCategory(int id)
        {
            bool a = false;
            var category = _dbContext.Categories.Find(id);
            if (category != null)
            {
                a = true;
                _dbContext.Entry(category).State = EntityState.Deleted;
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