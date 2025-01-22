import loader from './spinner.gif';
import './spinner.scss';

const Spinner = () => {
  return (
    <>
      <img className='spinner' src={loader} alt="spinner" />
    </>
  )
}

export default Spinner;