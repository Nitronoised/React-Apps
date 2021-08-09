import { IoIosArrowForward } from 'react-icons/io';
import { NAVIGATION_ICONS } from "../constants/imageImport";
import { connect } from 'react-redux';


function Artist({ stared, fave, artistName, genre, type, fullInfo, img, addElement, removeElement }) {

    const star = NAVIGATION_ICONS.star;
    const starColored = NAVIGATION_ICONS.starCol;
    let details = `${genre} - ${type}`;
    console.log(fave)
    function addToFav(e) {
        e.preventDefault()
        e.stopPropagation()
        addElement(fullInfo)
    }

    function removeFromFave(e) {
        e.preventDefault()
        e.stopPropagation()
        removeElement(fullInfo)
    }


    return (
        <div className="artist-box">

            <div className="artist-info">
                <img className="artist-thumbnail" src={img} alt='Thumbnail' />
                <div className="artist-thumbnail-info">
                    <h2 >{artistName}</h2>
                    <p>{details}</p>

                    {!fave && stared ? <img className="fav-img" src={starColored} onClick={(e) => { removeFromFave(e) }} alt="Star Icon" /> : ''}

                    <img className={`fav-img ${fave ? 'hidden' : null}`} src={star}
                        onClick={(e) => { addToFav(e) }} alt="Star Icon" />

                    <img className={`fav-img ${!fave ? 'hidden' : null}`} src={starColored} onClick={(e) => { removeFromFave(e) }} alt="Star Icon" />


                </div>
            </div>


            <IoIosArrowForward className="arrow-icon" />
        </div>
    )
}

function mapDispatchToProps(dispatch) {
    return {
        addElement: (el) => dispatch({ type: 'ADD_TO_FAVORITE', payload: el }),
        removeElement: (id) => dispatch({ type: 'REMOVE_FROM_FAVORITE', payload: id })
    }
}


export default connect(null, mapDispatchToProps)(Artist)