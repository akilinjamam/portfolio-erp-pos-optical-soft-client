import { useState } from "react";


const useLogin = () => {
        const [loading, setLoading] = useState(false);
        const [eye, setEye] = useState(false)
        const [user, setUser] = useState({
                username: 'visitor',
                email: '',
                password: 'visitor1234',
                branchId: '69b54828cc2ab5bcf16eb734',
                confirmPassword: ''
        })
        return [user, setUser, loading, setLoading, eye, setEye]
};

export default useLogin;