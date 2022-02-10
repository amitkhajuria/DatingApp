using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController:ControllerBase
    {
        private readonly DataContext _context;
        public UsersController(DataContext context)
        {
            _context=context;
        }

        // [HttpGet]
        // public ActionResult<IEnumerable<AppUser>> GetUsers()
        // {
        //   var users=  _context.Users.ToList();
        //   return users;
        // }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()
        {
          var users=  await _context.Users.ToListAsync();
          //var users=   _context.Users.ToListAsync().Result;
          return users;
        }

        // [HttpGet("{id}")]
        // public ActionResult<AppUser> GetUser(int id)
        // {
        //   return  _context.Users.Find(id);
        // }
         [HttpGet("{id}")]
        public async Task<ActionResult<AppUser>> GetUser(int id)
        {
          return  await _context.Users.FindAsync(id);
        }
    }
}