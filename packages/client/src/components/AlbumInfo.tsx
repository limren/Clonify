import React from "react";

export const AlbumInfo = () => {
  return (
    <section className="album-info">
      <header>
        <h1>Swimming</h1>
        <div>
          <p>2018</p>
          <p>13 tracks</p>
          <p>58 min</p>
        </div>
        <div>
          <img src="/Spotify.svg" alt="Spotify logo" />
          <h2>Listen on Spotify</h2>
        </div>
      </header>
      <footer>
        <p>And don't you know that sunshine don't feel right</p>
        <p>When you inside all day</p>
        <p>I wish it was nice out, but i looked like rain</p>
        <p>Gray skies and I'm drifting, not living forever</p>
        <p>They told me if only gets better</p>
        <h3>"COME BACK TO EARTH"</h3>
      </footer>
    </section>
  );
};
