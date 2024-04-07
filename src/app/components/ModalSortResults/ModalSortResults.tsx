import './ModalSortResults.css';

interface ModalSortResultsProps {
    onSortOrderChange: (order: SortOrder) => void;
    setShowModalSort: (show: boolean) => void;
}

type SortOrder = 'default' | 'max-rate' | 'min-rate' | 'year' | 'title-asc' | 'title-desc';

export default function ModalSortResults({onSortOrderChange, setShowModalSort}: ModalSortResultsProps){
    return(
        <section className='container-modal-sort'>
            <span onClick={() => {onSortOrderChange('default'); setShowModalSort(false)}}>Escolha</span>
            <span onClick={() => {onSortOrderChange('max-rate'); setShowModalSort(false)}}>Maior nota</span>
            <span onClick={() => {onSortOrderChange('min-rate'); setShowModalSort(false)}}>Menor nota</span>
            <span onClick={() => {onSortOrderChange('year'); setShowModalSort(false)}}>Mais recentes</span>
            <span onClick={() => {onSortOrderChange('title-asc'); setShowModalSort(false)}}>A-Z</span>
            <span onClick={() => {onSortOrderChange('title-desc'); setShowModalSort(false)}}>Z-A</span>
        </section>
    )
}