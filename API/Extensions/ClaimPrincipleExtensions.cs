using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace API.Extensions
{
    public static class ClaimPrincipleExtensions
    {
       
        public static string GetUserName(this ClaimsPrincipal user)
        {
            // var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value; //get the username from authenicated token
            return user.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        }

    }
}
