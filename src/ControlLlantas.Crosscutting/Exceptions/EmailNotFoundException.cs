using And.ControlLlantas.Crosscutting.Constants;

namespace And.ControlLlantas.Crosscutting.Exceptions
{
    public class EmailNotFoundException : BaseException
    {
        public EmailNotFoundException() : base(ErrorConstants.EmailNotFoundType, "Email address not registered")
        {
        }
    }
}
