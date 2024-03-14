import React from "react";
import { Link } from "react-router-dom"
import { Helmet } from "react-helmet"

function ButtonLink({ to, children }) {
      return <Link to={to}><button>{children}</button></Link>
};

const SongResutlts = () => {
    return (
        <div>
            <Helmet>
                <title>Home | MusicPlaylists</title>
            </Helmet>
        </div>
    );
};

export default SongResults;