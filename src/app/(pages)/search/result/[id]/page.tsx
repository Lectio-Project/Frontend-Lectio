'use client'

import { Book } from '@/types/search-types';
import { getCookie } from '@/utils/cookies';
import { useEffect, useState } from 'react';

import api from '@/api/api';
import Header from '@/app/components/Header/Header';
import Loading from '@/app/components/Loading/loading';
import SearchResultsBooks from '@/app/components/SearchResultsBooks/SearchResultsBooks';
import DefaultSort from '@/app/assets/defaultSort.svg';
import ActiveSort from '@/app/assets/activeSort.svg';

import './result.css';
import Button from '@/app/components/Button/Button';
import ModalSortResults from '@/app/components/ModalSortResults/ModalSortResults';

type SearchGenre = {
    params: {
        gender: string,
        id: string
    };
};

type SortOrder = 'default' | 'max-rate' | 'min-rate' | 'year' | 'title-asc' | 'title-desc';

export default function SearchResult({params}: SearchGenre){
    const genreId = params.id;
    const [results, setResults] = useState<Book[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [showModalSort, setShowModalSort] = useState<boolean>(false);
    const [sortOrder, setSortOrder] = useState<SortOrder>('default');
    const [page, setPage] = useState(1);
    const resultsPerPage = 10;
    const numPages = Math.ceil(results.length / resultsPerPage);
    const firstResult = (page - 1) * resultsPerPage + 1;
    const lastResult = Math.min(page * resultsPerPage, results.length);

    const listResults = async () => {
        try {
            const token = await getCookie('token');
            
            const response = await api.get(`/search/genres?genresId=${genreId}`,
                { headers: {
                    Authorization: `Bearer ${token}`
                }});
            setResults(response.data);
        } catch (error: any) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    const sortedResults = [...results].sort((a, b) => {
        switch (sortOrder) {
            case 'max-rate':
                return b.avgGrade - a.avgGrade;
            case 'min-rate':
                return a.avgGrade - b.avgGrade;
            case 'year':
                return Number(b.publishYear) - Number(a.publishYear);
            case 'title-asc':
                return a.name.localeCompare(b.name);
            case 'title-desc':
                return b.name.localeCompare(a.name);
            default:
                return 0;
        }
    });

    const sortOrderTexts: Record<SortOrder, string> = {
        'default': 'Ordenar',
        'max-rate': 'Maior nota',
        'min-rate': 'Menor nota',
        'year': 'Mais recentes',
        'title-asc': 'A-Z',
        'title-desc': 'Z-A',
    };

    useEffect(() => {
        listResults();
    }, []);

    return (
            <main className='container-search'>
                <Header search='able' select='none'/>
                {isLoading ? (
                    <div className='results-loading'>
                        <Loading />
                    </div>
                ) : (
                    <>
                        <section className='sort-pagination-section-search'>
                            <button className={`default-sort-results ${sortOrder !== 'default' ? 'btn-sorted-results' : ''}`} onClick={() => setShowModalSort(!showModalSort)}>
                                <img src={sortOrder === 'default' ? DefaultSort : ActiveSort} alt=''/>
                                {sortOrderTexts[sortOrder]}
                            </button>
                            <h3 className='pagination-results-search'>{page}/{numPages}</h3>
                            {showModalSort && <ModalSortResults onSortOrderChange={setSortOrder} setShowModalSort={setShowModalSort}/>}
                        </section>
                        <h4 className='quantity-results-search'>{`${firstResult}-${lastResult} de `}<span className='total-results-search'>{results.length} resultados</span> do gênero <span className='genre-search'>"{results[0].gender.gender}"</span></h4>
                        <section className='container-books-results'>
                            <SearchResultsBooks results={sortedResults} />
                        </section>
                        <section className='btns-prev-next-page'>
                            <Button title='Anterior' type='button' className='secondary btn-prev-page' onClick={() => setPage(page > 1 ? page - 1 : page)} disabled={page === 1}/>
                            <Button title='Próximo' type='button' className='secondary btn-prev-page' onClick={() => setPage(page < numPages ? page + 1 : page)} disabled={page === numPages}/>
                        </section>
                    </>
                )}
        </main>
    )
}