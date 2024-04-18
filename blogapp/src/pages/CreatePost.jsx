import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { Navigate } from 'react-router-dom'
import Editor from '../Editor'

const formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video'
]

const CreatePost = () => {

  const [title, setTitle] = useState('')
  const [summary, setSummary] = useState('')
  const [content, setContent] = useState('')
  const [files, setFiles] = useState('')
  const [redirect, setRedirect] = useState(false)

  async function createNewPost(event){
    const data = new FormData()
    data.set('title', title)
    data.set('summary', summary)
    data.set('content', content)
    data.set('file', files[0])
    event.preventDefault()
    console.log(files)
    const response = await fetch('http://localhost:4000/post', {
      method: 'POST',
      body: data,
      credentials: 'include'
    })
    if (response.ok){
      setRedirect(true)
    }
  } if (redirect){
    return <Navigate to='/' />
  }

  return (
    <form onSubmit={createNewPost}>
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
      <button style={{marginTop: '5px'}}>Upload Post</button>
    </form>
  )
}

export default CreatePost
