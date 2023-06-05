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
    public class ItemController : ControllerBase
    {
        private readonly ChefDbContext _dbContext;

        public ItemController(ChefDbContext dbContext)
        {
            _dbContext = dbContext;

        }
        [HttpGet]
        [Route("GetItems")]
        public async Task<IEnumerable<Item>> GetItems()
        {
            return await _dbContext.Items.ToListAsync();
        }

        [HttpPost]
        [Route("AddItem")]
        public async Task<Item> AddItem(Item objItem)
        {
            _dbContext.Items.Add(objItem);
            await _dbContext.SaveChangesAsync();
            return objItem;
        }

        [HttpPatch]
        [Route("UpdateItem/{id}")]
        public async Task<Item> UpdateItem(Item objItem)
        {
            _dbContext.Entry(objItem).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();
            return objItem;
        }

        [HttpDelete]
        [Route("DeleteItem/{id}")]
        public bool DeleteItem(string id)
        {
            bool a = false;
            var Item = _dbContext.Items.Find(id);
            if (Item != null)
            {
                a = true;
                _dbContext.Entry(Item).State = EntityState.Deleted;
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