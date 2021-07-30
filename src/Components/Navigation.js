import NavigationItem from "../Components/NavigationItem";
import { NAVIGATION_ICONS } from "../constants/imageImport";
import { Link } from "react-router-dom";
import { useState } from 'react';

function Navigation() {
    const [activeLink, setActiveLink] = useState('Artist');
    const [navLinks, setNavLinks] = useState([
        {
            navTitle: 'Favorites',
            navImgBw: NAVIGATION_ICONS.star,
            navImgCol: NAVIGATION_ICONS.starCol,
            path: '/favorites',
        },
        {
            navTitle: 'Artist',
            navImgBw: NAVIGATION_ICONS.singer,
            navImgCol: NAVIGATION_ICONS.singerCol,
            path: '/artist',
        },
        {
            navTitle: 'Movies',
            navImgBw: NAVIGATION_ICONS.movies,
            navImgCol: NAVIGATION_ICONS.moviesCol,
            path: '/movies',
        },
        {
            navTitle: 'Albums',
            navImgBw: NAVIGATION_ICONS.album,
            navImgCol: NAVIGATION_ICONS.albumCol,
            path: '/albums',
        },
    ]);

    return (
        <div className="navigation-box">
            {navLinks.map((nav, index) =>
                <Link className="navItem-link" to={nav.path}><NavigationItem getLink={(link) => setActiveLink(link)}
                    key={index} navTitle={nav.navTitle}
                    navImg={activeLink === nav.navTitle ? nav.navImgCol : nav.navImgBw} /></Link>)}
        </div>
    )
}

export default Navigation