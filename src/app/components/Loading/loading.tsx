import LoadFrame from '../../assets/logoLectio.svg';
import './loading.css';

export default function Loading(){
    return(
        <div className='loader-container'>
            <img className='loader' src={LoadFrame} alt='loading icon'/>
        </div>

    )
}