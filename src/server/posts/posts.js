import axios from "axios";

export const getPosts = async () => {
  return axios
    .get(`https://social-media-backend-2210.herokuapp.com/login/postContent`)
    .then((result) => {
      return {
        user: result.data,
        result: true,
      };
    })
    .catch(() => {
      return {
        result: false,
      };
    });
};

export const getComments = async (postId) => {
  return axios
    .get(
      `https://social-media-backend-2210.herokuapp.com/login/getComments/${postId}`
    )
    .then((result) => {
      return {
        comments: result.data,
        result: true,
      };
    })
    .catch(() => {
      return {
        result: false,
      };
    });
};

export const updateLike = async (userLoggedIn, liked, post) => {
  if (liked === "red") {
    let LikeUpdate = {
      id: post._id,
      newLikes: post.activity.likes - 1,
      userCurrent: userLoggedIn.id,
      currentLikedList: post.activity.usersLiking,
      whatToDo: "unlike",
    };

    axios.post(
      "https://social-media-backend-2210.herokuapp.com/login/update",
      LikeUpdate
    );

    return {
      newColor: "rgb(90, 90, 90)",
    };
  } else {
    let LikeUpdate = {
      id: post._id,
      newLikes: post.activity.likes + 1,
      userCurrent: userLoggedIn.id,
      currentLikedList: post.activity.usersLiking,
      whatToDo: "like",
    };

    axios.post(
      "https://social-media-backend-2210.herokuapp.com/login/update",
      LikeUpdate
    );
    return {
      newColor: "red",
    };
  }
};

export const getUserPosts = async (userId) => {
  return axios
    .get(
      `https://social-media-backend-2210.herokuapp.com/login/postContent/${userId}`
    )
    .then((response) => {
      return {
        posts: response.data,
        result: true,
      };
    })
    .catch(() => {
      return {
        result: false,
      };
    });
};

export const followSomeone = async (update) => {
  axios.post("/login/follow", update);
};
