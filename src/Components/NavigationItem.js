function NavigationItem({ getLink, navTitle, navLink, navImg }) {
    return (
        <div
            onClick={() => {
                getLink(navTitle)
            }}
            className="navigation-item">
            <div className="navigation-icon" style={{ backgroundImage: `url(${navImg})` }}></div>
            <h3>{navTitle}</h3>
        </div>
    )
}

export default NavigationItem