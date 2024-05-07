import { useEffect, useState } from "react";

const useRegistration = () => {

    const [eye, setEye] = useState(false);
    const [loading, setLoading] = useState(false)
    const [passwordStrength, setPasswordStrenght] = useState(0);
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    useEffect(() => {
        let isUpper = false;
        let isLower = false
        const checkUpperAndLowerCase = (str) => {
            for (let i = 0; i < str.length; i++) {
                if (str[i] >= 'A' && str[i] <= 'Z') {
                    isUpper = true
                }
            }
            for (let i = 0; i < str.length; i++) {
                if (str[i] >= 'a' && str[i] <= 'z') {
                    isLower = true
                }
            }

            if (isLower && isUpper) {
                return 1
            }
            return 0
        }
        const findUpperAndLower = checkUpperAndLowerCase(user.password)

        const checkSpecialChar = () => {
            const split = user.password.split('');

            const findSpecialChar = split.filter(f => {
                return f === '@' || f === '#' || f === '!' || f === '$' || f === '_'
            });
            const uniqueValue = [...new Set(findSpecialChar)];

            if (uniqueValue.length > 0) {
                return 1
            }

            return 0
        }
        const checkNumber = () => {
            const split = user.password.split('');
            console.log(split);

            const findSpecialChar = split.filter(f => {
                return f === '0' || f === '1' || f === '2' || f === '3' || f === '4' || f === '5' || f === '6' || f === '7' || f === '8' || f === '9'
            });
            const uniqueValue = [...new Set(findSpecialChar)];

            if (uniqueValue.length > 0) {
                return 1
            }
            return 0
        }

        const findSpecialChar = checkSpecialChar()
        const findNumber = checkNumber();
        const totalLength = user.password.length > 6 ? 1 : 0

        const strengthCounter = [findNumber, findSpecialChar, findUpperAndLower, totalLength]

        let checkPassStrength = 0;

        for (let num of strengthCounter) {
            checkPassStrength += num
        }

        setPasswordStrenght(checkPassStrength);
    }, [user.password]);


    const [countStrength, setCountStrength] = useState('');

    useEffect(() => {
        if (passwordStrength === 1) {
            setCountStrength('password strength poor')
        } else if (passwordStrength === 2) {
            setCountStrength('medium strength password')
        } else if (passwordStrength === 3) {
            setCountStrength('strong password')
        } else if (passwordStrength === 4) {
            setCountStrength('very strong password')
        }
    }, [passwordStrength])

    return [user, setUser, passwordStrength, countStrength, loading, setLoading, eye, setEye]
};

export default useRegistration;