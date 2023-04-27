using System;
using System.ComponentModel.DataAnnotations;

namespace CS180ChefsAnonymous.Models
{
	public class Items
	{
		public string? ItemName { get; set; } = "";
		public int CalPerKg { get; set; }
		public string? OtherInfo { get; set; } = "";

		public Items()
		{
		}
	}
}

