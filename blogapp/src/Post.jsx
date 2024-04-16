import React from 'react';
import {format} from 'date-fns';

const Post = ({ title, summary, cover, content, createdAt, author}) => {
  return (
    <div className="post">
      <div className="image">
        <img src="https://techcrunch.com/wp-content/uploads/2024/03/GettyImages-1659862626.jpg?w=730&crop=1" alt="" />
      </div>
      <div className="text">
        <h2>{title}</h2>
        <p className='info'>
          <a className='author'>{author.username}</a>
          <time>{format(new Date(createdAt), 'MMM d, yyyy, HH:mm')}</time>
        </p>
        <p className='summary'>
          {summary}
        </p>
      </div>
    </div>
  );
}

export default Post;