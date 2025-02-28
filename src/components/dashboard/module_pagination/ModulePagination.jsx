/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import modulePagination from './ModulePagination.module.scss';
const ModulePagination = ({data, newDataContainer}) => {

    const [count, setCount] = useState(1);

    const handleNav = (nav) => {
        if(nav === 'next'){
            if((count * 8)  <= data?.length){
                setCount(prevCount => prevCount+1)
            }
        }
        if(nav === 'prev'){
            if( 1 < count){
                setCount(prevCount => prevCount-1)
            }
        }
    }


    useEffect(() => {
        const paginatedData = data?.slice(((count - 1) * 8) ,(8 * count));
        newDataContainer(paginatedData)
    },[data,newDataContainer, count])

    return (
        <div className={`${modulePagination.pagination}`}>
            <div onClick={() => handleNav('prev')} className={`${modulePagination.button}`}>
                <p > Prev</p>
            </div>
            <div onClick={() => handleNav('next')} className={`${modulePagination.button}`}>
                <p > Next</p>
            </div>
    </div>
    );
};

export default ModulePagination;