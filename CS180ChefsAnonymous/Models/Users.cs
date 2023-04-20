using System;
using System.Collections.Generic;
using System.Numerics;
using System.Xml.Linq;

namespace CS180ChefsAnonymous.Models
{
	public class Users
	{

        public int userID { get; set; }
        public string? name { get; set; }

        public string? user_name { get; set; }
        public string? password { get; set; }
        public string? email { get; set; }

    }
}

