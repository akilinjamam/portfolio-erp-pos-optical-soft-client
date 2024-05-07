import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from './userSlice';

const useUserData = () => {

    const { users, isLoading, error } = useSelector(state => state.users);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    return { users, isLoading, error }

};

export default useUserData;