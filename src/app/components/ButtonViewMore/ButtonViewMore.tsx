import ArrowGoYellow from '../../assets/arrowGoYellow.svg';
import './ViewMore.css';

type buttonViewMore = {
    onClick ?: () => void;
    title: string,
    type: 'button' | 'submit' | 'reset' | undefined,
    className: string,
    disabled?: 'disabled' | 'active' | '' | undefined
}

export default function ButtonViewMore({title, type, className, onClick}: buttonViewMore ) {
    return (
        <button 
        className={className} 
        type={type} 
        onClick={onClick}>

            {title} 
            <img 
            src={ArrowGoYellow} 
            alt= 'arrow go'
            />
            
            </button>
    )
}