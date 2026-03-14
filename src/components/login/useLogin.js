import { useState } from "react";


const useLogin = () => {
        const [loading, setLoading] = useState(false);
        const [eye, setEye] = useState(false)
        const [user, setUser] = useState({
                username: 'visitor',
                email: '',
                password: '',
                branchId: '',
                confirmPassword: ''
        })
        return [user, setUser, loading, setLoading, eye, setEye]
};

export default useLogin;