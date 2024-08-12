import React from 'react';
import PostHeader from '../postHeader';

const postDetails = {
  title: 'Favorite products',
  tag: 'product',
  date: '2024',
  description: "can't claim i'm product-obsessed without a list",
};

const Post = () => {
  return (
    <div className="text-container">
      {/* <div className="caption my-8">
        <PostHeader {...postDetails} />
      </div>
       */}
      <h1>my favorite products</h1>
      <p>It feels a bit pretentious to claim that I'm "product-obsessed" without writing about some of my favorites. Last updated on 06-13-2024.</p>
      <ul className="space-y-2">
        <li><b><a href="https://retro.app" target="_new">Retro</a></b> — what social media for close friends should be</li>
        <li><b><a href="https://www.yeti.com/drinkware/hydration/chug-bottle-18oz.html" target="_new">Yeti Rambler</a></b> — a water bottle that's easy to keep clean, incredibly robust, and has controlled water flow</li>
        <li><b><a href="https://crouton.app" target_="new">Crouton</a></b> — one platform for meal planning, grocery lists, and (most importantly for me) live cooking</li>
      </ul>
    </div>
  );
};
export default Post;