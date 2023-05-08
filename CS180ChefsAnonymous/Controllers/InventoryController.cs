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
    public class InventoryController : ControllerBase
    {
        private readonly ChefDbContext _dbContext;

        public InventoryController(ChefDbContext dbContext)
        {
            _dbContext = dbContext;

        }
        [HttpGet]
        [Route("GetInventorys")]
        public async Task<IEnumerable<Inventory>> GetInventorys()
        {
            return await _dbContext.Inventories.ToListAsync();
        }

        [HttpPost]
        [Route("AddInventory")]
        public async Task<Inventory> AddInventory(Inventory objInventory)
        {
            string itemName = objInventory.ItemName;
            if (!await _dbContext.Items.AnyAsync(i => i.ItemName == itemName))
            {
                var newItem = new Item
                {
                    ItemName = itemName
                };
                _dbContext.Items.Add(newItem);
            }
            _dbContext.Inventories.Add(objInventory);
            await _dbContext.SaveChangesAsync();
            return objInventory;
        }

        [HttpPatch]
        [Route("UpdateInventory/{id}")]
        public async Task<Inventory> UpdateInventory(Inventory objInventory)
        {
            _dbContext.Entry(objInventory).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();
            return objInventory;
        }

        [HttpDelete]
        [Route("DeleteInventory/{id}")]
        public bool DeleteInventory(int id)
        {
            bool a = false;
            var Inventory = _dbContext.Inventories.Find(id);
            if (Inventory != null)
            {
                a = true;
                _dbContext.Entry(Inventory).State = EntityState.Deleted;
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