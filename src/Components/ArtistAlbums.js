import { useEffect } from "react";
import { useState } from "react";
import Artist from "./Artist";
import { Link } from "react-router-dom";
import { STATUS_IMAGES } from "../constants/imageImport";



function ArtistAlbums({ match }) {

    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(false)

    async function getAlbums() {
        setLoading(true)
        setAlbums([])

        let response = await fetch(`https://itunes.apple.com/lookup?id=${match.params.id}&entity=album&limit=200`)
        let albumsCollection = await response.json();
        albumsCollection = albumsCollection.results.filter((el, i) => i !== 0)
        setAlbums(albumsCollection);
        console.log(albumsCollection);
        setLoading(false)

    }



    useEffect(() => getAlbums(), [])

    return (
        <div className="artist-list">

            {loading ? <img src={`${STATUS_IMAGES.loading}`}

                style={{ marginTop: '250px', height: '50px' }} alt={'Loading'} /> : ''}

            {albums ? albums.map(artist => <Link className="to-artistAlbum-link"
                to={`/artist/${artist.artistId}/${artist.collectionName}`} >
                <Artist artistName={artist.collectionName}
                    genre={`${artist.trackCount} Tracks`} type={'Date'}
                    img={artist.artworkUrl100} /></Link>) : <p>No albums found.</p>}


        </div>
    )
}

export default ArtistAlbums