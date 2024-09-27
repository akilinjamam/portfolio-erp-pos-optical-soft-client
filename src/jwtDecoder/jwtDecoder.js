import { jwtDecode } from "jwt-decode"


const decodeJwt = (token) => {
    const decoded = jwtDecode(token);
    return decoded
}


export default decodeJwt

