import { useLocation } from "react-router";
import { useHistory } from "react-router";

function LocationBox() {
    let history = useHistory()
    let location = useLocation();
    return (
        <div className="location-box">
            <p onClick={() => history.goBack()}>Back</p>
            <h2>{location.pathname}</h2>
        </div>
    )
}

export default LocationBox