/* eslint-disable react/prop-types */
import pagination from './Pagination.module.scss';
const NewPagination = ({limit, data, pageNumber, setPageNumber, count, setCount}) => {
   
    const navigation = [
        {
            value:'<',
            link: 'decrease'
        },
        {
            value:count,
            link: 'one'
        },
        {
            value:count+1,
            link: 'two'
        },
        {
            value:count+2,
            link: 'three'
        },
        {
            value:'>',
            link: 'increase'
        },
    ]

   


    const handleNav = (nav) => {
        if(nav.link === 'increase'){
           if(count <= (Math.ceil((data?.total/limit)-3))){
            setCount(prevCount => prevCount+1)
           }
        }
        if(nav.link === 'decrease'){
            if(count > 1 ){
                setCount(prevCount => prevCount-1)
            }
        }
        if(nav.link === 'one'){
            setPageNumber(nav.value)
        }
        if(nav.link === 'two'){
            setPageNumber(nav.value)
        }
        if(nav.link === 'three'){
            setPageNumber(nav.value)
        }
       
    }


    const active = (value) => {
        return value === pageNumber ? 'orange' : 'gray'
    }
    const hide = (value) => {
       
       if(value.link === 'three'){
            if((data?.total < limit )){
            return 'none'
        }else{
            return 'block'
        }
       }

    }

    return (
        <div className={`${pagination.main} flex_left`}>
           <div style={{opacity: `${data?.total < limit ? 0 : 1}`}} className={`${pagination.container} flex_between`}>
                {
                    navigation.slice(0, (data?.total <= (limit *3)) ? (Math.ceil(data?.total/limit)+1) : 4  ).map((nav, index) => {
                        return (
                            <div style={{ display:`${hide(nav)}`}}  key={index+1} >
                                <div style={{backgroundColor: `${active(nav.value)}`}} onClick={() => handleNav(nav)} className={`${pagination.pageBox} flex_center`}>
                                {nav.value}
                                </div>
                            </div>
                        )
                    })
                }
                <p>....</p>
                <div className={`${pagination.pageBox} flex_center`}>
                    {data?.totalPage}
                </div>
                {
                    navigation.slice(4,5).map((nav, index) => {
                        return (
                            <div onClick={() => handleNav(nav)} className={`${pagination.pageBox} flex_center`} key={index+1}>
                                {nav.value}
                            </div>
                        )
                    })
                }
           </div>
        </div>
    );
};

export default NewPagination;