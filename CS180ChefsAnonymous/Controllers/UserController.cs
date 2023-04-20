using System;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CS180ChefsAnonymous.Models;

namespace CS180ChefsAnonymous.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class UserController:ControllerBase
	{
		private readonly ChefDbContext _dbContext;

		public UserController(ChefDbContext dbContext)
		{
			_dbContext = dbContext;

		}
		[HttpGet]
		[Route("GetEmployees")]
		public IActionResult GetUsers()
		{
			List<User> list = _dbContext.Users.ToList();
			return StatusCode(StatusCodes.Status200OK);
		}
	}
}

