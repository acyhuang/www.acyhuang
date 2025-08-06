# Problem: Hardware documentation is really hard to read.

Manuals are full of dense text and diagrams, and they're often hundreds of pages long. This makes it incredibly time-consuming to figure out how to accomplish a specific task with a piece of unfamiliar hardware.

# Solution: Simplify, search, and query.

Documate uses LLMs to parse through documentation, making it easier to navigate and understand. This is done in three ways:

**Simplify.** Information under headers of the document are summarized into one page, allowing for a general understanding of the product in addition to providing a navigation point.

![Simplify screenshot](/assets/documate/simplify.png)

**Semantic search.** Instead of having to know the exact keyword, phrase, or sentence that will bring them to the section they're looking for, users can search by meaning.

![Search screenshot](/assets/documate/search.png)

**Question and answer.** Users can ask questions to a chatbot about how to perform a certain function or better understand what a table, diagram, or graph means.

![Q&A screenshot](/assets/documate/qa.png)

# Process: 0 to 1

Because of our cross-functional team, I got the chance to wear multiple hats throughout the process. Aside from the design, I was most involved with the product side.

## Understanding our users

To validate the problem, we interviewed several hardware engineers and found the following trends:

- Finding documentation for a given product is easy.
- Navigating to the right part of documentation is hard. The language is dense, and manuals are long.
  - Sometimes, a user may not know the proper terminology to describe the function or feature they're looking for information on.
- Engineers look to documentation to:
  1. Get an overall understanding of how to use a piece of hardware
  2. Understand whether a certain use case is possible, and if so, how to achieve it
- Forums and YouTube are a common alternative to documentation because they are easier to understand and may be more specific to the desired use case.

Based on the way these engineers approach hardware, we designed a user flow that would feel intuitive to them. This was split into two phases: first, processing the document on our end, then allowing users to query it.

## Building features based on the desired benefits

Our findings from user interviews translated into concrete features.

**Desired benefit:** Understand the overall function of a piece of hardware. 
**Feature:** Summary page that compiles the most important information from a manual, e.g. what each button does (simplification).

**Desired benefit:** Be able to find information about a feature or function even if you don't know the correct terminology for it.
**Feature:** Semantic search allows users to search by meaning, so they'll get their desired results even if they aren't using the proper keywords.

**Desired benefit:** Quickly figure out whether a certain use case is possible.
**Feature:** Q&A feature to allow users to query the manual. All answers cite the respective page number of the manual, so even if the answer isn't complete, the user now knows where to look.

## Implementation: designing to ship fast

This was my first time designing with developers, and we needed to be working closely in order to build out a demo for Demo Day. I learned to build lo-fi wireframes that conveyed the final vision and could be easily built upon by our developers as the prototype reached medium and eventually high fidelity.

Looking back, the final handoff of my prototypes to the developers could've been significantly improved — while I had high-fidelity prototypes, they lacked some of the information that would've been really helpful to developers when building out the designs (ex. how certain spacing should behave when the window size is changed).

Regardless I'm proud of our product and grateful for this experience.

![Screens screenshot](/assets/documate/screens.png)

# Takeaways

## 1. Talk to your users.

As someone who had little to no experience with hardware, my understanding of the problem was solely made possible by asking questions, listening, and discussing with potential users. Moreover, conversations revealed how deeply the problem ran. We talked to companies that had made documentation for their own hardware in the form of Google Docs and Slides that weren't updated regularly. These insights shaped our long term aspirations for the project, though we didn't end up taking it beyond Lavalab.

## 2. Prioritize!

Lavalab is only an eight week experience, and we only spent six weeks working as a team on Documate. At any point in time, there was more to do than what we had time to do. We ultimately prioritized the three features our users had expressed a need for, and were able to build those out well enough to demo.