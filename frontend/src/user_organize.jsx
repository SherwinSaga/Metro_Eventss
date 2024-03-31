import NavigationBar from "./navigationBar";
import OrganizerNavBar from "./navigationBarOrganize";
import { getSessionUser, getSessionUserID, isUserOrganizer } from "./helpers";

function organize(){

    const currentUser = getSessionUser();    
    const currentUid = getSessionUserID();
    const isOrganizer = isUserOrganizer();

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

    let content;

    if (isOrganizer === 0) {
        content = (
            <div className="B_org">
                <NavigationBar />
                <button onClick={applyToBeOrganizer}>Become an Organizer!</button>
            </div>
        );
    } else {
        content = (
            <div>
                <NavigationBar />
                <OrganizerNavBar />
            </div>
        );
    }


    return(
        <div className="organize_container">
            {content}
        </div>
    );
}

export default organize;