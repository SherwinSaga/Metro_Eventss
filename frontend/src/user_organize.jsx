import NavigationBar from "./navigationBar";
import { getSessionUser, getSessionUserID } from "./helpers";

function organize(){

    const currentUser = getSessionUser();    
    const currentUid = getSessionUserID();

    const applyToBeOrganizer = () => {
        fetch('http://localhost:8000/apply_organizer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ User_id: currentUid, User_username: currentUser }),
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            window.location.reload
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    
    return(
        <div className="B_org">
            <NavigationBar />
            <button onClick={applyToBeOrganizer}>Become an Organizer!</button>
        </div>
    );
}

export default organize;