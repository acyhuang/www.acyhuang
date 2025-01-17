import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
    <div className='text-container'>
      <h1>hello</h1>
      <p>I'm Allison, a junior at USC, product-obsessed generalist, and lover of lists. Interested in interfaces for <a href="https://monitor.transluce.org/dashboard/chat" target="_new">observing</a>, <a href="http://preview.goodfire.ai/" target="_new">steering</a>, and <a href="https://www.youtube.com/watch?v=rd-J3hmycQs" target="_new">interacting</a> with generative AI.</p>
      <p>Currently studying an integrated degree in CS, design, and business at the <a href="https://iovine-young.usc.edu/" target="_new">Iovine and Young Academy</a>, reading <i>Why Nations Fail</i> by Daron Acemoglu and James A. Robinson, and trying to figure out the rest.</p>
      <p>Welcome to my little internet space — it's currently a work in progress. Some other places where I exist on the internet: <a href="https://www.linkedin.com/in/allisoncyhuang/" target="_new">LinkedIn</a>, <a href="https://github.com/acyhuang" target="_new">Github</a>, <a href="https://www.are.na/allison-huang-5ow-m0wjvfu/channels" target="_new">Are.na</a></p>

      <h2>previously...</h2>
      <ul className="space-y-2">
        <li>designed <b><Link to={'./documate'}>Documate</Link></b>, a platform for simplifying hardware documentation</li>
        <li>investigated LLM-LLM persuasion in highly ambiguous moral decision-making scenarios, accepted to NeurIPS 2024 AdvML-Frontiers workshop: <b><a href="https://arxiv.org/abs/2411.11731" target="_new">Moral Persuasion in LLMs</a></b></li>
        <li>authored a research report characterizing the landscape of open-source language models, as of August 2023: <b><a href="https://drive.google.com/file/d/1q7-2F-vEmGJT4WjW0wFUkeeHGJuL9PtQ/view" target="_new">Open-source LLMs</a></b></li>
        <li>designed and developed <b><a href="https://www.figma.com/proto/qW3tJhmjmaOFNWh6ZDZdYc/ACAD415-binary?page-id=181%3A595&node-id=181-595&scaling=contain&content-scaling=fixed&t=0dS8en3l3HVddZ7e-1" target="_new">Binary</a></b>, a singleplayer iOS game for converting base-10 numbers to binary</li>
      </ul>

    </div>
);
  
export default Home;