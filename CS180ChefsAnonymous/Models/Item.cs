using System;
using System.ComponentModel.DataAnnotations;

namespace CS180ChefsAnonymous.Models
{
	public partial class Item
	{
		public string? ItemName { get; set; } = "";
		public int CalPerKg { get; set; }
		public string? OtherInfo { get; set; } = "";

		public Item()
		{
		}
	}
}

