import React from 'react';

const Post = () => {
  return (
    <div className="post">
      <div className="image">
        <img src="https://techcrunch.com/wp-content/uploads/2024/03/GettyImages-1659862626.jpg?w=730&crop=1" alt="" />
      </div>
      <div className="text">
        <h2>Symbolica hopes to head off the AI arms race by betting on symbolic models</h2>
        <p className='info'>
          <a className='author'>Vincent Zhong</a>
          <time>2024-04-09 16:45</time>
        </p>
        <p className='summary'>
          In February, Demis Hassabis, the CEO of Google‘s DeepMind AI research lab, warned that throwing increasing amounts of compute at the types of AI algorithms in wide use today could lead to diminishing returns. Getting to the “next level” of AI, as it were, Hassabis said, will instead require fundamental research breakthroughs that yield viable alternatives to today’s entrenched approaches.
        </p>
      </div>
    </div>
  );
}

export default Post;