import axios from "axios";
import authHeader from "../Quasar-2-Auth-Module/auth.header";
import authConfig from "../Quasar-2-Auth-Module/auth.config";

const API_URL = authConfig.USER_API_URL;

class UserService {
  index() {
    return axios.get(API_URL, { headers: authHeader() }).then((response) => {
      console.log(response.data.data);
      return response.data.data;
    });
  }

  logout() {
    localStorage.removeItem(authConfig.userLocalStorageKey);
  }

  async store(user) {
    const response = await axios.post(
      API_URL,
      {
        name: user.name,
        email: user.email,
        password: user.password,
      },
      { headers: authHeader() }
    );
    console.log(response);
    return response.data.data;
  }

  async update(user) {
    console.log("user at store update: " + user);
    const response = await axios.patch(
      API_URL + user.id,
      user,
      //  password_confirmation: user.password_confirmation
      { headers: authHeader() }
    );
    console.log("srevice respoince " + response);
    return response.data.data;
  }

  delete(user) {
    return axios.delete(API_URL + user.id, { headers: authHeader() });
  }

  emailExist(email) {
    return axios.post(API_URL + "emailExist", {
      email: email,
    });
  }
}

export default new UserService();
