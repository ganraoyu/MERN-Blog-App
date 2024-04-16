import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { Navigate } from 'react-router-dom'
const modules = {
  toolbar: [
    [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
    [{size: []}],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, 
     {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image', 'video'],
    ['clean']
  ],
}

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
      <ReactQuill 
        value={content} 
        modules={modules} 
        formats={formats} 
        onChange={newValue => setContent(newValue)}
      />
      <button style={{marginTop: '5px'}}>Upload Post</button>
    </form>
  )
}

export default CreatePost
