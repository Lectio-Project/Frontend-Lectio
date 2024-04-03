import LoadFrame from '../../assets/loadingFrame.svg';
import './loading.css';

export default function Loading(){
    return(
        <div className='loader-container'>
            <img className='loader' src={LoadFrame} alt='loading icon'/>
        </div>

    )
}