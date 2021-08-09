import Artist from "./Artist";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';


function Favorites({ favorites }) {

    return (
        <div className="favorites-list">
            {favorites.map(artist => <Link className="to-artistAlbum-link"
                to={`/artist/${artist.artistId}/${artist.collectionId}/${artist.trackId}`} >

                <Artist artistName={artist.artistName}
                    fullInfo={artist} genre={artist.trackName}
                    stared={true} type={artist.trackPrice + '$'} fave={true} img={artist.artworkUrl100} /></Link>)}

        </div>
    )
}

function mapDispatchToProps(dispatch) {
    return {
        addElement: (el) => dispatch({ type: 'ADD_TO_FAVORITE', payload: el }),
        removeElement: (id) => dispatch({ type: 'REMOVE_FROM_FAVORITE', payload: id })
    }
}

function mapStateToProps(state) {
    return {
        favorites: state.favorites,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites)