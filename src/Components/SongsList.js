
// Copied fully as a module and should be modifed accordingly

import { useEffect } from "react";
import { useState } from "react";
import Artist from "./Artist";
import { Link } from "react-router-dom";


function SongsList({ match }) {
    console.log(match)
    const [songs, setSongs] = useState([]);

    async function getSongs() {
        let response = await fetch(`https://itunes.apple.com/lookup?albumTerm=${match.params.album}&media=music&entity=song&limit=100`)
        let songsCollection = await response.json();
        songsCollection.results.shift()
        setSongs(songsCollection.results);
        console.log(songsCollection.results)
    }

    useEffect(() => getSongs(), [])

    return (
        <div className="artist-list">

            {songs.map(artist => <Link className="to-artistAlbum-link" to={`/artist/${artist.artistId}/`} ><Artist artistName={artist.artistName}
                genre={artist.primaryGenreName} type={artist.wrapperType} img={artist.artworkUrl100} /></Link>)}
            {songs.length === 0 && <p style={{ marginTop: '50px', fontSize: '17px' }}>Search for an artist.</p>}

        </div>
    )
}

export default SongsList