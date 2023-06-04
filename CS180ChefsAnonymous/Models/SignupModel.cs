using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace CS180ChefsAnonymous.Models
{
	public class SignupModel
	{
		public string? UserName { get; set; }
		public string? Password { get; set; }
		public SignupModel()
		{
		}
	}
}

