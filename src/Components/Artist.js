import { IoIosArrowForward } from 'react-icons/io';

function Artist({ artistName, genre, type, img }) {
    let details = `${genre} - ${type}`
    return (
        <div className="artist-box">

            <div className="artist-info">
                <img src={img} alt='Thumbnail' />
                <div className="artist-thumbnail-info">
                    <h2 >{artistName}</h2>
                    <p>{details}</p>
                </div>
            </div>
            <IoIosArrowForward className="arrow-icon" />
        </div>
    )
}

export default Artist