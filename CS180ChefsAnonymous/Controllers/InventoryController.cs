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
        [Route("GetInventory")]
        public async Task<IEnumerable<Inventory>> GetInventory()
        {
            return await _dbContext.Inventories.ToListAsync();
        }

        [HttpPost]
        [Route("AddInventory")]
        public async Task<Inventory> AddInventory(Inventory objInventory)
        {

            int inventoryId = 1;
            while (await _dbContext.Inventories.AnyAsync(inv => inv.InventoryId == inventoryId))
            {
                inventoryId++;
            }
            objInventory.InventoryId = inventoryId;

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
        [HttpPost]
        [Route("AddGrocery")]
        public async Task<Inventory> AddGrocery(Inventory objInventory)
        {
            string itemName = objInventory.ItemName;
            int userId = objInventory.UserId;

            // Check if the item exists in the user's inventory
            var existingInventory = await _dbContext.Inventories.FirstOrDefaultAsync(inv => inv.UserId == userId && inv.ItemName == itemName);
            int inventoryId = 0;
            while (await _dbContext.Inventories.AnyAsync(inv => inv.InventoryId == inventoryId))
            {
                inventoryId++;
            }
            objInventory.InventoryId = inventoryId;

            if (existingInventory != null)
            {
                // If it exists, modify the existing inventory item
                existingInventory.Qty += objInventory.Qty;
                // Update other properties as needed
                _dbContext.Inventories.Update(existingInventory);
            }
            else
            {
                // If it doesn't exist, add it to the user's inventory
                _dbContext.Inventories.Add(objInventory);
            }

            await _dbContext.SaveChangesAsync();

            return objInventory;
        }
        [HttpPost]
        [Route("RemoveGrocery")]
        public async Task<Inventory> RemoveGrocery(Inventory objInventory)
        {
            string itemName = objInventory.ItemName;
            int userId = objInventory.UserId;

            // Check if the item exists in the user's inventory
            var existingInventory = await _dbContext.Inventories.FirstOrDefaultAsync(inv => inv.UserId == userId && inv.ItemName == itemName);

            if (existingInventory != null)
            {
                // If the quantity is greater than 0, update the existing inventory item
                
                    existingInventory.Qty -= objInventory.Qty;
                if (existingInventory.Qty > 0)
                {
                    // Update other properties as needed
                    _dbContext.Inventories.Update(existingInventory);
                }
                // If the quantity is 0, remove the inventory item
                else
                {
                    _dbContext.Inventories.Remove(existingInventory);
                }

                await _dbContext.SaveChangesAsync();
            }

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