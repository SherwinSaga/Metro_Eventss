
import NavigationBar from "./navigationBar";
import { getSessionUser } from "./helpers";



function Homepage(){

    const currentUser = getSessionUser();

    return(
        <div>
            <NavigationBar />
            <h1>Welcome to homepage {currentUser}</h1>
        </div>
    );
}

export default Homepage;