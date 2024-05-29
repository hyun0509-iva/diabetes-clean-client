export const API_PATH = {
  // Auth
  AUTH: "/api/v1/auth",
  LOG_IN: "/api/v1/auth/login",
  CHECK_MEAIL: "/api/v1/auth/checkemail",
  LOG_OUT: "/api/v1/auth/logout",
  REFLESH: "/api/v1/auth/reflesh",
  // users
  USER_API: "/api/v1/users",
  // Diabetes
  DIABETES_API: "/api/v1/diabetes",
  // Story
  CONTENTS_API: "/api/v1/contents",
  MY_FEED_KEY: "/api/v1/contents/users",
  // Search
  SEARCH_API: "/api/v1/search",
  // Comment
  COMMENT_API: "/api/v1/comment",
  //Like
  LIKE_API: "/api/v1/like",
  //Image
  PROFILE_IMAGE_API: "/api/v1/image/uimg",
  CONTENTS_IMAGE_API: "/api/v1/image/pimg"
};

Object.freeze(API_PATH);
