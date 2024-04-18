import React, { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import Editor from '../Editor';

const formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'color'
]

const EditPost = () => {
    const {id} = useParams()
    const [title, setTitle] = useState('')
    const [summary, setSummary] = useState('')
    const [content, setContent] = useState('')
    const [files, setFiles] = useState('')
    const [redirect, setRedirect] = useState(false)

    useEffect(() => {
        fetch(`http://localhost:4000/post/${id}`)
        .then(response => response.json())
        .then(postInfo => {
            setTitle(postInfo.title)
            setSummary(postInfo.summary)
            setContent(postInfo.content)
        })
    }, [])

    function updatePost(event){
        event.preventDefault();
    }

    if (redirect){
        return <Navigate to='/' />
    }
  
    return (
    <>
        <h1 className='EditPostH1'>Edit Post </h1>
        <form onSubmit={updatePost}>
            <input 
                type='text' 
                placeholder='Title' 
                value={title} 
                onChange={event => setTitle(event.target.value)}
            />
            <input 
                type='text' 
                placeholder='Summary' 
                value={summary} 
                onChange={event => setSummary(event.target.value)}
            />
            <input type='file' 
                onChange={event => setFiles(event.target.files)}
            />
            <Editor value={content} onChange={setContent} />
            <button style={{marginTop: '5px'}}>Edit Post</button>
        </form>
    </>
    )
}

export default EditPost;