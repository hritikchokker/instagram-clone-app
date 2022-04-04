import React from 'react';
import './index.scss';
import PostCard from './postCard';
function PostsList() {
  const list = [1,2,3];
  return (
    <div className="posts_wrapper">
      {list.map((element, index) => (
        <PostCard key={element + index} />
      ))}
    </div>
  );
}

export default PostsList;
