export const GET_USERS = "get_users";

export function getUsers(users) {
    return { 
        type: GET_USERS, 
        users 
    };
}

