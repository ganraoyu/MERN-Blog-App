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

    async function updatePost(event){
        event.preventDefault();
        const data = new FormData()
        data.set('title', title)
        data.set('summary', summary)
        data.set('content', content)
        if(files?.[0]){
            data.set('files', files?.[0])
        }
        data.set('files', files?.[0])
        const response = await fetch('http://localhost:4000/post', {
            method: 'PUT',
            body: data,

        })
        if(response.ok){
            setRedirect(true)
        }
        //setRedirect(true)
    }

    if (redirect){
        return <Navigate to={'/post/'+id} />
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