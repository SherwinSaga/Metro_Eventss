
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

export function getSessionUserID(){

    //bootleg approach sir
    const userData = localStorage.getItem('user');
    if(userData){
        const user = JSON.parse(userData);
        if(user){
            return user.User_id;
        }

    }
    return null;
}

export function isUserOrganizer(){

    const userData = localStorage.getItem('user');
    if(userData){
        const user = JSON.parse(userData);
        if(user){
            return user.User_isOrganizer;
        }

    }
    return null;
}

export function getUserFirstname(){

    const userData = localStorage.getItem('user');
    if(userData){
        const user = JSON.parse(userData);
        if(user){
            return user.User_firstname;
        }

    }
    return null;
}

export function getUserLastname(){
    const userData = localStorage.getItem('user');
    if(userData){
        const user = JSON.parse(userData);
        if(user){
            return user.User_lastname;
        }

    }
    return null;
}
export function bootleg_logout(){
    localStorage.clear();
}