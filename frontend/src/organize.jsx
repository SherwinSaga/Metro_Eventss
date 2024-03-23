import NavigationBar from "./navigationBar";
import { getSessionUser } from "./helpers";



function organize(){

    const currentUser = getSessionUser();

    return(
        <div>
            <NavigationBar />
            <h1>Become an Organizer! {currentUser}</h1>
        </div>
    );
}

export default organize;