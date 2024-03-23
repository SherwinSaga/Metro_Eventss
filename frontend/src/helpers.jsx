
export function getSessionUser(){

    //bootleg approach sir
    const userData = localStorage.getItem('user');
    if(userData){
        const user = JSON.parse(userData);
        if(user){
            return user.User_username;
        }

    }
    return null;
}

export function bootleg_logout(){
    localStorage.clear();
}