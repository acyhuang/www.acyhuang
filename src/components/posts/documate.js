import React from 'react';
import PostHeader from '../postHeader';

const postDetails = {
  title: 'Documate',
  tag: 'design',
  date: '2023',
  description: 'This is the description for Project 1.',
};

const Documate = () => {
  return (
    <div className="py-16 px-12">
      <PostHeader {...postDetails} />
      <p>This was a project completed in USC’s premier product incubator, Lavalab, where we conceived, built, and pitched Documate over eight weeks. This was my first time building a product from 0 to 1, and the process gave me the chance to wear several different hats with the goal of building something that users love.</p>
      
      <h1>Problem: Hardware documentation is really hard to read.</h1>
      <p>Manuals are full of dense text and diagrams, and they’re often hundreds of pages long. This makes it incredibly time-consuming to figure out how to accomplish a specific task with a piece of unfamiliar hardware.</p>
      
      <h1>Solution: Simplify, search, and query.</h1>
      <p>Documate uses LLMs to parse through documentation, making it easier to navigate and understand. This is done in three ways:</p>
      <p>Simplify. Information under headers of the document are summarized into one page, allowing for a general understanding of the product in addition to providing a navigation point.</p>
      <p>Semantic search. Instead of having to know the exact keyword, phrase, or sentence that will bring them to the section they’re looking for, users can search by meaning.</p>
      <p>Question and answer. Users can as questions to with a chatbot about how to perform a certain function or better understand what a table, diagram, or graph means.</p>

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
      <p>Desired benefit: Understand the overall function of a piece of hardware. <br></br>Feature: Summary page that compiles the most important information from a manual, e.g. what each button does (simplification).</p>
    </div>
  );
};
export default Documate;