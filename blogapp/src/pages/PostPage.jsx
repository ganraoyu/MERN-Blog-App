import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PostPage = () => {
    const {id} = useParams();
    const [postInfo, setPostInfo] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:4000/post/${id}`).then(response => {
           response.json().then(postInfo =>{
            setPostInfo(postInfo);  
           })
        });
    }, [id]);    

    return (
        <div>
            {}
        </div>
    );
}

export default PostPage;