import React from 'react';

const Home = () => (
    <div className='text-container'>
      <h1>helloooo</h1>
      <p>I'm Allison — a junior at USC, a product-obsessed generalist, and lover of lists. Welcome to my little internet space. Currently a work in progress. </p>
      <p>Some other places where I exist on the internet: <a href="https://www.linkedin.com/in/allisoncyhuang/" target="_new">LinkedIn,</a> <a href="https://github.com/acyhuang" target="_new">Github</a></p>

      <h2>a quick cv / things i've worked on</h2>
      <ul className="space-y-2">
        <li><b><a href="https://acyhuang.com/documate">Documate</a></b> — a platform for simplifying hardware documentation</li>
        <li><b><a href="https://drive.google.com/file/d/1q7-2F-vEmGJT4WjW0wFUkeeHGJuL9PtQ/view" target="_new">Open-source LLMs</a></b> — a research report characterizing the landscape of open-source language models, as of August 2023</li>
        <li><b><a href="https://acyhuang.itch.io/acad415-final-binary" target="_new">Binary</a></b> — a singleplayer iOS game for converting base-10 numbers to binary</li>
      </ul>

    </div>
);
  
export default Home;