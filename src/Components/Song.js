import { useEffect } from "react";
import { useState } from "react";
import { STATUS_IMAGES } from "../constants/imageImport";
import { NAVIGATION_ICONS } from "../constants/imageImport";
import { connect } from 'react-redux';



function Song({ match, addElement, removeElement, favorites }) {

    const star = NAVIGATION_ICONS.star;
    const starColored = NAVIGATION_ICONS.starCol;

    const [song, setSong] = useState({});
    const [loading, setLoading] = useState(false);
    const [favorite, setFavorite] = useState(false);

    async function getSong() {
        setLoading(true)
        let response = await fetch(`https://itunes.apple.com/lookup?id=${match.params.song}&entity=musicTrack`)
        let songInfo = await response.json();
        setSong(songInfo.results[0]);
        setLoading(false)

    }

    function changeFavorite() {

        var found = false;
        for (var i = 0; i < favorites.length; i++) {
            if (favorites[i].trackId == song.trackId) {
                found = true;
                break;
            }
            setFavorite(found)
            console.log(found)
            console.log(song)
        }
    }

    useEffect(() => {
        getSong()
        changeFavorite()
    }, [])


    return (
        <>

            <div className="song-box artist-list">

                {loading ? <img className="loading-img" src={`${STATUS_IMAGES.loading}`} alt={'Loading'} /> : ''}

                <h3>{song.trackName}</h3>


                {!loading ? <> <img src={song.artworkUrl100} className="song-box-img" alt="Song thumbnail" />

                    <audio src={song.previewUrl} controls> </audio>
                    <table>
                        <tr>
                            <td> <span className="highlight">Genre:</span> {song.primaryGenreName}</td>
                            <td><span className="highlight">Album:</span> {song.collectionName} </td>
                        </tr>

                        <tr>
                            <td><span className="highlight">Price:</span> {song.trackPrice}$</td>
                            <td><span className="highlight">Date:</span> {new Date(song.releaseDate).toLocaleDateString()}</td>
                        </tr>

                        {!favorite ? <img className="fav-img" src={star} onClick={
                            () => {
                                addElement(song)
                                setFavorite(true)

                            }} alt="Star Icon" /> :

                            <img className="fav-img" src={starColored} onClick={() => {
                                removeElement(song)
                                setFavorite(false)
                            }} alt="Star Icon" />
                        }

                    </table>
                </> : ''}
            </div>
        </>
    )
}
function mapDispatchToProps(dispatch) {
    return {
        addElement: (el) => dispatch({ type: 'ADD_TO_FAVORITE', payload: el }),
        removeElement: (el) => dispatch({ type: 'REMOVE_FROM_FAVORITE', payload: el })
    }
}

function mapStateToProps(state) {
    return {
        favorites: state.favorites,
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Song)