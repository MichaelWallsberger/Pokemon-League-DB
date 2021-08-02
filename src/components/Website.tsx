import React, { useState } from "react";
import { Navigation } from "./Navbar";

function Website({ Component, pageProps }) {
  const [navbarOutwards, setNavbarOutwards] = useState<boolean>(false);

  return (
    // <Component {...pageProps} />

    <div className="website-container">
      <Navigation navbarOutwards={navbarOutwards} setNavbarOutwards={setNavbarOutwards} />
      <div className="content-container">
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default Website;
