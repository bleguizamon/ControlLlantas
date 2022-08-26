using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace And.ControlLlantas.Domain
{
    public class Role : IdentityRole<string>
    {
        public ICollection<UserRole> UserRoles { get; set; }
    }
}
