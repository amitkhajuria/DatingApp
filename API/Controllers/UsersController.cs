using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
namespace API.Controllers
{
    // [ApiController]
    // [Route("api/[controller]")]
    [Authorize]
    public class UsersController : BaseApiController//ControllerBase
    {
        // private readonly DataContext _context;
        // public UsersController(DataContext context)
        // {
        //     _context=context;
        // }
        private readonly IUserRepository _userRepo;
        private readonly IMapper _mapper;
        public UsersController(IUserRepository userRepo, IMapper mapper)
        {
            _mapper = mapper;
            _userRepo = userRepo;
        }


        // [HttpGet]
        // public ActionResult<IEnumerable<AppUser>> GetUsers()
        // {
        //   var users=  _context.Users.ToList();
        //   return users;
        // }


        [HttpGet]
        //[AllowAnonymous]
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
        {

            var users=await _userRepo.GetMembersAsync();
            return Ok(users);

            // var users = await _userRepo.GetUsersAsync();
            // var usersToReturn=_mapper.Map<IEnumerable<MemberDto>>(users);
            // return Ok(usersToReturn);

        
            //var users=  await _context.Users.ToListAsync();
            //return users;

            //var users=   _context.Users.ToListAsync().Result;

        }

        // [HttpGet("{id}")]
        // public async Task<ActionResult<AppUser>> GetUser(int id)
        // {
        //   return  await _context.Users.FindAsync(id);
        // }

        // [HttpGet("{id}")]
        // public async Task<ActionResult<AppUser>> GetUser(int id)
        // {
        //   return  await _userRepo.GetUserByIdAsync(id);
        // }

        // [HttpGet("{username}")]
        // public async Task<ActionResult<MemberDto>> GetUser(string username)
        // {
        //     var user = await _userRepo.GetUserByUsernameAsync(username);
        //     return _mapper.Map<MemberDto>(user);

        // }

        [HttpGet("{username}")]
        public async Task<ActionResult<MemberDto>> GetUser(string username)
        {
           return  await _userRepo.GetMemberAsync(username);

        }

        [HttpPut]
        public async Task<ActionResult> UpdateUser(MemberUpdateDto  memberupdateDto)
        {
            var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value; //get the username from authenicated token
            var user = await _userRepo.GetUserByUsernameAsync(username);

            //user.City = memberupdateDto.City;
            _mapper.Map(memberupdateDto, user);

            _userRepo.Update(user);

            if (await _userRepo.SaveAllAsync()) return NoContent();
            return BadRequest("Failed to update user");

        }
    }
}