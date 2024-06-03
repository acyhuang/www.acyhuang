import React from 'react';
import PostHeader from '../postHeader';

import simplifyImg from '../../assets/documate/simplify.png';
import searchImg from '../../assets/documate/search.png';
import qaImg from '../../assets/documate/qa.png';
import screensImg from '../../assets/documate/screens.png';
import macImg from '../../assets/documate/mac.png';

const postDetails = {
  title: 'Documate',
  tag: 'design',
  date: '2.2023 – 4.2023',
  description: 'Completed in USC’s premier product incubator, Lavalab, where we conceived, built, and pitched Documate in eight weeks.',
};

const Documate = () => {
  return (
    <div className="text-container">
      <PostHeader {...postDetails} />
      <h1>Problem: Hardware documentation is really hard to read.</h1>
      <p>Manuals are full of dense text and diagrams, and they’re often hundreds of pages long. This makes it incredibly time-consuming to figure out how to accomplish a specific task with a piece of unfamiliar hardware.</p>
      
      <h1>Solution: Simplify, search, and query.</h1>
      <p>Documate uses LLMs to parse through documentation, making it easier to navigate and understand. This is done in three ways:</p>
      <p><b>Simplify.</b> Information under headers of the document are summarized into one page, allowing for a general understanding of the product in addition to providing a navigation point.</p>
      <div className='w-full flex justify-center'>
        <img src={simplifyImg} alt="screenshot" className="max-w-lg w-full"></img>
      </div>
      <p><b>Semantic search.</b> Instead of having to know the exact keyword, phrase, or sentence that will bring them to the section they’re looking for, users can search by meaning.</p>
      <div className='w-full flex justify-center'>
        <img src={searchImg} alt="screenshot" className="max-w-lg w-full"></img>
      </div>
      <p><b>Question and answer.</b> Users can as questions to with a chatbot about how to perform a certain function or better understand what a table, diagram, or graph means.</p>  
      <div className='w-full flex justify-center'>
        <img src={qaImg} alt="screenshot" className="max-w-lg w-full"></img>
      </div>
      

      <h1>Process: 0 to 1</h1>
      <p>Because of our cross-functional team, I got the chance to wear multiple hats throughout the process. Aside from the design, I was most involved with the product side.</p>
      <h2>Understanding our users</h2>
      <p>To validate the problem, we interviewed several hardware engineers and found the following trends:</p>
      <ul>
        <li>Finding documentation for a given product is easy.</li>
        <li>Navigating to the right part of documentation is hard. The language is dense, and manuals are long.</li>

        <ul>
          <li>Sometimes, a user may not know the proper terminology to describe the function or feature they're looking for information on.</li>
        </ul>
       
        <li>Engineers look to documentation to:</li>
      
        <ol>
          <li>Get an overall understanding of how to use a piece of hardware</li>
          <li>Understand whether a certain use case is possible, and if so, how to achieve it</li>
        </ol>
      
        <li>Forums and YouTube are a common alternative to documentation because they are easier to understand and may be more specific to the desired use case.</li>
      </ul>

      <p>Based on the way these engineers approach hardware, we designed a user flow that would feel intuitive to them. This was split into two phases: first, processing the document on our end, then allowing users to to query it.</p>

      <h2>Building features based on the desired benefits</h2>
      <p>Our findings from user interviews translated into concrete features. </p>
      <p><b>Desired benefit:</b> Understand the overall function of a piece of hardware. 
      <br></br>
      <b>Feature:</b> Summary page that compiles the most important information from a manual, e.g. what each button does (simplification).</p>
      <p><b>Desired benefit:</b> Be able to find information about a feature or function even if you don’t know the correct terminology for it.
      <br></br>
      <b>Feature:</b> Semantic search allows users to search by meaning, so they’ll get their desired results even if they aren’t using the proper keywords.</p>
      <p><b>Desired benefit:</b> Quickly figure out whether a certain use case is possible.
      <br></br>
      <b>Feature:</b> Q&A feature to allow users to query the manual. All answers cite the respective page number of the manual, so even if the answer isn’t complete, the user now knows where to look.</p>
      <h2>Implementation: designing to ship fast</h2>
      <p>This was my first time designing with developers, and we needed to be working closely in order to build out a demo for Demo Day. I learned to build lo-fi wireframes that conveyed the final vision and could be easily built upon by our developers as the prototype reached medium and eventually high fidelity.</p>
      <p>Looking back, the final handoff of my prototypes to the developers could’ve been significantly improved — while I had high-fidelity prototypes, they lacked some of the information that would’ve been really helpful to developers when building out the designs (ex. how certain spacing should behave when the window size is changed).</p>
      <p>Regardless I’m proud of our product and grateful for this experience.</p>
      <div className='w-full flex justify-center'>
        <img src={screensImg} alt="screenshot" className="max-w-lg w-full"></img>
      </div>

      <h1>Takeaways</h1>
      <h2>1. Talk your users. </h2>
      <p>As someone who had little to no experience with hardware, my understanding of the problem was solely made possible by asking questions, listening, and discussing with potential users. Moreover, conversations revealed how deeply the problem ran. We talked to companies that had made documentation for their own hardware in the form of Google Docs and Slides that weren’t updated regularly. These insights shaped our long term aspirations for the project, though we didn’t end up taking it beyond Lavalab.</p>
      <h2>2. Prioritize!</h2>
      <p>Lavalab is only an eight week experience, and we only spent six weeks working as a team on Documate. At any point in time, there was more to do than what we had time to do. We ultimately prioritized the three features our users had expressed a need for, and were able to build those out well enough to demo.</p>
    </div>
  );
};
export default Documate;