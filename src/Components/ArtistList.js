import { useState } from 'react';
import { Link } from "react-router-dom";
import { STATUS_IMAGES } from "../constants/imageImport";
import Artist from "./Artist";
import SearchBox from "./SearchBox";
import Error from './ErrorPage';


function ArtistList() {

    const [artists, setArtists] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    async function getArtists(artist) {
        setArtists([])
        setError('')
        setLoading(true)
        try {
            let fixedArtist = artist.replace(' ', '+')
            let response = await fetch(`https://itunes.apple.com/search?term=${fixedArtist}&entity=allArtist&attribute=allArtistTerm&limit=100`);
            let artistsList = await response.json();
            let modifiedList = artistsList.results.filter(el => el.artistId !== undefined)
            setArtists(modifiedList);
            setLoading(false);
            if (artistsList.results.length === 0) { setError('No matching results found.') }
            console.log(artistsList.results)
        }
        catch (err) {
            setLoading(false)
            setError(err)
        }

    }

    return (
        <>
            <SearchBox handleInput={getArtists} />
            <div className="artist-list">

                {loading ? <img src={`${STATUS_IMAGES.loading}`}
                    style={{ marginTop: '250px', height: '50px' }} alt={'Loading'} /> : ''}

                {artists ? artists.map(artist => <Link className="to-artistAlbum-link" to={`/artist/${artist.artistId}`} ><Artist artistName={artist.artistName}
                    genre={artist.primaryGenreName} type={artist.wrapperType} img={STATUS_IMAGES.musicLogo} /></Link>) : ''}

                {!error ? '' : <Error image={STATUS_IMAGES.notFoundError} message={error} />}

            </div>
        </>
    )
}

export default ArtistList