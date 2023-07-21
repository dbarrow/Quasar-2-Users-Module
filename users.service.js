import axios from 'axios';
import authHeader from '../auth/auth.header'
import authConfig from '../auth/auth.config'

const API_URL = authConfig.USER_API_URL;


class UserService {
  index() {    
    return axios
      .get(API_URL, { headers: authHeader() })      
      .then(response => {       
      console.log(response.data.data); 
        return response.data.data;
      });
  }



  logout() {
    localStorage.removeItem(authConfig.userLocalStorageKey);
  }


  store(user) {
    return axios.post(API_URL, {
      name: user.name,
      email: user.email,
      password: user.password,
    //  password_confirmation: user.password_confirmation
    }, { headers: authHeader() });
  }

  update(user) {
    console.log("User from axios = " + user)
    return axios.patch(API_URL + user.id, user ,
    //  password_confirmation: user.password_confirmation
   { headers: authHeader() });
  }


  emailExist(email) {
    return axios.post(API_URL + 'emailExist' , {
      email: email
    })

  }
}

export default new UserService();