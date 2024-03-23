import NavigationBar from "./navigationBar";
import { getSessionUser } from "./helpers";


function MyEvents(){
    const currentUser = getSessionUser();
    return(
        <div>
            <NavigationBar />
            <h1>MY events {currentUser}</h1>
        </div>
    );
}

export default MyEvents;