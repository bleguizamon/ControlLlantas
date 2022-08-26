using And.ControlLlantas.Crosscutting.Constants;

namespace And.ControlLlantas.Crosscutting.Exceptions
{
    public class InternalServerErrorException : BaseException
    {
        public InternalServerErrorException(string message) : base(ErrorConstants.DefaultType, message)
        {
        }
    }
}
