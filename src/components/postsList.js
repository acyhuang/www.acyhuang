import React from 'react';
import { Link } from 'react-router-dom';
import SEArrow from '../assets/arrow.svg';

const PostsList = () => {
  const posts = [
    { title: "Documate", tag: "design", path: "/documate" },
    { title: "On calendars", tag: "design", path: "/calendars" },
    // { title: "Binary", tag: "design" },
  ];

  return (
    <div className="">
      <table className="min-w-full border-collapse">
        {/* <thead>
          <tr>
            <th className="text-left py-2 px-4 uppercase text-sm text-gray-400 border-b border-gray-700">Title</th>
            <th className="text-left py-2 px-4 uppercase text-sm text-gray-400 border-b border-gray-700">Tag</th>
          </tr>
        </thead> */}
        <tbody>
          {posts.map((post, index) => (
            <tr key={index}>
              <td className="text-left py-2 border-b border-gray-700 hover:text-blue-400">
                <div className="flex items-end">
                    <img src={SEArrow} alt="arrow icon" className="py-0 w-2 h-2 mr-2 mb-1.5" />
                    <Link to={post.path}>{post.title}</Link>
                </div>
              </td>
              <td className="text-left text-gray-400 py-2 px-4 border-b border-gray-700">{post.tag}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PostsList;
