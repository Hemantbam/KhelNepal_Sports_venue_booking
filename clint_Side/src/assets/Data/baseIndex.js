import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const API = "http://localhost:5000/"; //Backend_Address

export const khaltiPublic="test_public_key_fb7335816eb647d4a748906c9c993d82";
export const Check = async () => {

    try {
        const token = localStorage.getItem('token');
        if (!token) {
            return;
        }
        const decodedToken = jwtDecode(token);
        console.log(decodedToken.role);
        await axios.get(`${API}api/allusers?id=${decodedToken.id}`).then(res=>{
            if (res.data.users.role!=decodedToken.role) {
         
                alert("Your Role has changed,Please Login Again..");
                localStorage.removeItem('token');
                window.location.href='/';
            }
        })
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
};




