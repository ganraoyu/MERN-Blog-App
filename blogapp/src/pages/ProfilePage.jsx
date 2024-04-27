import React, { useState, useEffect } from 'react';
import account from '../assets/account.png';
import { useParams } from 'react-router-dom';

const ProfilePage = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/profile/${id}`)
      .then(response => response.json())
      .then(data => setProfile(data))
      .catch(error => console.error('Error:', error));
  }, [id]);

  useEffect(() => {
    fetch(`http://localhost:4000/posts/${id}`)
      .then(response => response.json())
      .then(data => {
        console.log('posts:', data); // Log the posts array
        console.log('posts:', data); // Log the posts array
        console.log('posts:', data); // Log the posts array
        setPosts([data]);
      })
  }, [id]);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className='ProfilePageDiv'>
        <img src={account} className="profileImage" alt="Account" />
        <div className="infoStatsDescription">
          <div className="info">
            <div>{profile.username}</div>
            <button>Follow</button>
            <button>Message</button>
          </div>
          <div className="stats">
            <div>{profile.posts} posts</div>
            <div>{profile.followers} followers</div>
            <div>{profile.following} following</div>
          </div>
          <div className='description'>
          </div>
        </div>
      </div>
      <div className='blogPosts'>
        <h1 className='h1blog'>Blog</h1>
        <hr/>
        <div className='userBlogPosts'>
        {posts.map(post => {
          console.log(post);
          return (
            <div key={post._id}>
              <img src={`http://localhost:4000/${post.cover}`} className="UserPostImage" alt="Post" />
              <div>{post.title}</div>
              <div>{post.summary}</div>
            </div>
          );
        })}
        </div>
        <div className='blogTitle'>Blog Title</div>
      </div>
    </>
  )
}

export default ProfilePage;