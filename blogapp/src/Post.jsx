import React from 'react';

const Post = ({ title, summary, cover, content }) => {
  return (
    <div className="post">
      <div className="image">
        <img src="https://techcrunch.com/wp-content/uploads/2024/03/GettyImages-1659862626.jpg?w=730&crop=1" alt="" />
      </div>
      <div className="text">
        <h2>{title}</h2>
        <p className='info'>
          <a className='author'>Vincent Zhong</a>
          <time>2024-04-09 16:45</time>
        </p>
        <p className='summary'>
          {summary}
        </p>
      </div>
    </div>
  );
}

export default Post;