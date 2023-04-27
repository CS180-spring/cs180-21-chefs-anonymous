using System;
namespace CS180ChefsAnonymous.Models
{
	public class Inventory
	{
		public int InventoryId { get; set; }
		public int UserId { get; set; }
		public string? ItemName { get; set; } = "";
		public int Qty { get; set; }
		public int unit { get; set; }
		public Inventory()
		{
		}
	}
}

