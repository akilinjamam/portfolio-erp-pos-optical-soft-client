import { jwtDecode } from "jwt-decode"


const decodeJwt = (token) => {
    if (token) {
        const decoded = jwtDecode(token);
        return decoded
    } else {
        return null
    }
}


export default decodeJwt

