
// Copied fully as a module and should be modifed accordingly

import { useEffect } from "react";
import { useState } from "react";
import Artist from "./Artist";
import { Link } from "react-router-dom";
import { STATUS_IMAGES } from "../constants/imageImport";
import { connect } from 'react-redux';


function SongsList({ favorites, match }) {
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(false)

    async function getSongs() {
        setLoading(true)
        let response = await fetch(`https://itunes.apple.com/lookup?id=${match.params.album}&entity=song&limit=20`)
        let songsCollection = await response.json();
        songsCollection.results.shift();
        setSongs(songsCollection.results);
        setLoading(false)
    }

    //favorites.find((el) => el === fullInfo


    useEffect(() => getSongs(), [])

    return (
        <div className="artist-list">

            {loading ? <img src={`${STATUS_IMAGES.loading}`}
                style={{ marginTop: '250px', height: '50px' }} alt={'Loading'} /> : ''}

            {songs.map(artist => <Link className="to-artistAlbum-link" to={`/artist/${artist.artistId}/${artist.collectionId}/${artist.trackId}`} ><Artist artistName={artist.artistName}
                stared={true} fullInfo={artist} fave={favorites.find(el => el == artist) ? true : false} genre={artist.trackName} type={artist.trackPrice + '$'} img={artist.artworkUrl100} /></Link>)}

        </div>
    )
}

function mapStateToProps(state) {
    return {
        favorites: state.favorites,
    }
}

export default connect(mapStateToProps, null)(SongsList)