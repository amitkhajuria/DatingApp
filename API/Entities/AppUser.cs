using System;
using System.Collections.Generic;
using API.Extensions;

namespace API.Entities
{
    public class AppUser
    {
        public int Id { get; set; }        
        public string UserName { get; set; }

        public byte[] PasswordHash{get;set;}
        public byte[] PasswordSalt{get;set;}

        public DateTime DateOfBirth {get;set;}

        public string KnownAs {get;set;}

        public DateTime Created {get;set;}=DateTime.Now;

        public DateTime LastActive {get;set;}=DateTime.Now;

        public String Gender {get;set;}

        public string Indroduction {get;set;}
        public string LookingFor{get;set;}
        public string Interests {get;set;}
        public string City {get;set;}

        public string Country{get;set;}
        public ICollection<Photo> Photos{get;set;}//1 to many relation

        // public int GetAge(){
        //     return DateOfBirth.CalculateAge();
        // }

        public ICollection<UserLike> LikedByUsers { get; set; } //list of users who has liked the currently logged in user
        public ICollection<UserLike> LikedUsers { get; set; } //list of users which currently logged in user has liked

    }
}