import errorMessageGif from './errorMessage.gif';
import './errorMessage.scss';

const ErrorMessage = () => {
  return (
    <img className='error__message' src={errorMessageGif} alt="error" />
  )
}

export default ErrorMessage;