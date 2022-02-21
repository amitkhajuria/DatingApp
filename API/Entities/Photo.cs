using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Photos")]
    public class Photo
    {
        public int Id{get;set;}
        public string Url{get;set;}
        public bool IsMain{get;set;}
        public string PublicId{get;set;}

        //below 2 properties are used to Fully defining the relationship between 2 tables , otherwise there is no cascade effort 
        public AppUser AppUser{get;set;}
        public int AppUserId{get;set;}
    }
}