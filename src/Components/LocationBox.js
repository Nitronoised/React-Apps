import { useLocation } from "react-router";
import { useHistory } from "react-router";
import { AiOutlineArrowLeft } from 'react-icons/ai'

function LocationBox() {
    let history = useHistory()
    let location = useLocation();
    return (
        <div className="location-box">
            <AiOutlineArrowLeft className="left-arrow" onClick={() => history.goBack()} />
            <p>{location.pathname}</p>
        </div>
    )
}

export default LocationBox