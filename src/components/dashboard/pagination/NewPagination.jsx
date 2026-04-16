/* eslint-disable react/prop-types */
import pagination from './NewPagination.module.scss';

const NewPagination = ({limit, data, pageNumber, setPageNumber, count, setCount}) => {
    
    const navigation = [
        { value: <i className="uil uil-angle-left"></i>, link: 'decrease' },
        { value: count, link: 'one' },
        { value: count + 1, link: 'two' },
        { value: count + 2, link: 'three' },
        { value: '>', link: 'increase' }, // We'll handle the icon in CSS or below
    ];

    const handleNav = (nav) => {
        if (nav.link === 'increase') {
            if (count <= (Math.ceil((data?.total / limit) - 3))) {
                setCount(prevCount => prevCount + 1);
            }
        } else if (nav.link === 'decrease') {
            if (count > 1) {
                setCount(prevCount => prevCount - 1);
            }
        } else {
            setPageNumber(nav.value);
        }
    };

    // Total page logic
    const totalPages = data?.totalPage || Math.ceil(data?.total / limit);
    const showPagination = data?.total > limit;

    return (
        <div className={pagination.paginationWrapper}>
            <div className={`${pagination.container} ${!showPagination ? pagination.hidden : ''}`}>
                
                {/* Previous & Page Numbers 1, 2, 3 */}
                <div className={pagination.pageGroup}>
                    {navigation.slice(0, (data?.total <= (limit * 3)) ? (Math.ceil(data?.total / limit) + 1) : 4).map((nav, index) => {
                        // Hide logic for third button
                        if (nav.link === 'three' && data?.total < limit) return null;

                        const isActive = nav.value === pageNumber;
                        const isIcon = nav.link === 'decrease' || nav.link === 'increase';

                        return (
                            <div 
                                key={index} 
                                onClick={() => handleNav(nav)}
                                className={`
                                    ${pagination.pageBox} 
                                    ${isActive ? pagination.active : ''} 
                                    ${isIcon ? pagination.iconBox : ''}
                                `}
                            >
                                {nav.value}
                            </div>
                        );
                    })}
                </div>

                {/* Separator & Last Page */}
                <div className={pagination.pageGroup}>
                    <span className={pagination.separator}>•••</span>
                    <div 
                        className={`${pagination.pageBox} ${pageNumber === totalPages ? pagination.active : ''}`}
                        onClick={() => setPageNumber(totalPages)}
                    >
                        {totalPages}
                    </div>
                    
                    {/* Next Button */}
                    <div 
                        className={`${pagination.pageBox} ${pagination.iconBox}`} 
                        onClick={() => handleNav({link: 'increase'})}
                    >
                        <i className="uil uil-angle-right"></i>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewPagination;