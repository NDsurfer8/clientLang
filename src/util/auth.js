import axios from 'axios'
import { useNavigation } from '@react-navigation/native';
const BASE_URL = 'http://localhost:3000'


// ! LOGIN FUNCTION
export async function authenticate(email,password ){
    const token = await axios.post(BASE_URL + '/api/login',
    {
        email: email,
        password: password,
    }
);
    return token;
}
// ! REGISTER NEW USER FUNCTION
export async function createUser(email, password) {
    const token = await axios.post(BASE_URL + '/api/register',
        {
            email: email,
            password: password,
        }
    );
    return token;

}