export const host = "http://localhost:5000";

// regisration api
export const registerRoute = `${host}/api/auth/register`;

//login route
export const loginRoute = `${host}/api/auth/login`;

//all user routes
export const allUsersRoute = `${host}/api/auth/allusers`;

// route to store messages in database
export const sendMessageRoute = `${host}/api/message/addMessageToDb`;

// route to get all messages from database
export const getAllMessageroute = `${host}/api/message/getMessageFromDb`;

//profile pic
export const setProfilePicRoute = `${host}/api/auth/setprofilepic`;
