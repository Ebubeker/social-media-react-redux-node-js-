import axios from "axios";

export const LoginChecking = (username, password) => {
  console.log(username);
  return axios
    .get(
      `https://social-media-backend-2210.herokuapp.com/login/confirmAccount/${username}_${password}`
    )
    .then((response) => {
      const data = response.data;
      if (data.auth === true) {
        return {
          user: data,
          failed: false,
        };
      } else {
        return {
          user: {},
          failed: true,
        };
      }
    });
};

export const getusers = () => {
  return axios
    .get("https://social-media-backend-2210.herokuapp.com/login/getuser")
    .then((result) => {
      return {
        users: result.data,
        result: true,
      };
    })
    .catch(() => {
      return {
        result: false,
      };
    });
};

export const registerAUser = (newUser) => {
  axios
    .post(
      "https://social-media-backend-2210.herokuapp.com/login/createUser",
      newUser
    )
    .then((res) => console.log(res));
};

export const getOneUser = async (userId) => {
  return axios
    .get(
      `https://social-media-backend-2210.herokuapp.com/login/getuser/${userId}`
    )
    .then((response) => {
      return {
        user: response.data,
        result: true,
      };
    })
    .catch(() => {
      return {
        return: false,
      };
    });
};
