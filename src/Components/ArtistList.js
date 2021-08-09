import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import { STATUS_IMAGES } from "../constants/imageImport";
import Artist from "./Artist";
import SearchBox from "./SearchBox";
import Error from './ErrorPage';

function ArtistList({ addSearchTerm, prevSearchTerm }) {
    const [artists, setArtists] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    async function getArtists(artist) {
        addSearchTerm(artist)
        setArtists([])
        setError('')
        setLoading(true)
        let fixedArtist = artist.replace(' ', '+')
        try {
            let response = await fetch(`https://itunes.apple.com/search?term=${fixedArtist}&entity=allArtist&attribute=allArtistTerm&limit=100`);
            let artistsList = await response.json();
            let modifiedList = artistsList.results.filter(el => el.artistId !== undefined)
            if (!modifiedList) { setError('No matching results found.') }
            setArtists(modifiedList);
            setLoading(false);
        }
        catch (err) {
            setLoading(false)
            setError(err)
        }
    }


    useEffect(() => {
        if (prevSearchTerm) { getArtists(prevSearchTerm) }
    }, [])

    return (
        <>
            <SearchBox handleInput={getArtists} />
            <div className="artist-list">

                {loading ? <img src={`${STATUS_IMAGES.loading}`}
                    style={{ marginTop: '250px', height: '50px' }} alt={'Loading'} /> : ''}

                {artists ? artists.map(artist => <Link className="to-artistAlbum-link" to={`/artist/${artist.artistId}`} ><Artist artistName={artist.artistName}
                    stared={false} genre={artist.primaryGenreName} type={artist.wrapperType} img={STATUS_IMAGES.musicLogo} /></Link>) : ''}

                {!error ? '' : <Error image={STATUS_IMAGES.notFoundError} message={error} />}

            </div>
        </>
    )
}

function mapDispatchToProps(dispatch) {
    return {
        addSearchTerm: (text) => dispatch({ type: 'ADD_SEARCH_TERM', payload: text })
    }
}

function mapStateToProps(state) {
    return {
        prevSearchTerm: state.cachedSearch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArtistList)