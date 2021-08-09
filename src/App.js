import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navigation from "./Components/Navigation";
import ArtistList from "./Components/ArtistList";
import LocationBox from "./Components/LocationBox";
import MoviesList from "./Components/MoviesList";
import Favorites from "./Components/Favorites";
import ArtistAlbums from "./Components/ArtistAlbums";
import SongsList from "./Components/SongsList";
import { Redirect } from 'react-router-dom';
import Song from './Components/Song'


function App() {

  return (

    <div className="app-container">

      <Router>
        <Redirect to='/artist' />
        <LocationBox />


        <Switch>
          <Route exact path="/artist/:id" component={ArtistAlbums} />
          <Route exact path="/artist/:id/:album" component={SongsList} />
          <Route exact path="/artist/:id/:album/:song" component={Song} />
          <Route path="/movies" component={MoviesList} />
          <Route path="/artist" component={ArtistList} />
          <Route path="/favorites" component={Favorites} />
        </Switch>
        <Navigation />

      </Router>
    </div>

  );
}

export default App;

// 1.LocationBox needs access to certain state to update location
// 2.Location hook can tell Navigation to update icons accordingly