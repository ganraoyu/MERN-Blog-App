import React from 'react'
import ReactQuill from 'react-quill'

const Editor = ({value, onChange}) => {

    const modules = {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],        
          ['blockquote', 'code-block'],
      
          [{ 'header': 1 }, { 'header': 2 }],             
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          [{ 'script': 'sub'}, { 'script': 'super' }],     
          [{ 'indent': '-1'}, { 'indent': '+1' }],          
          [{ 'direction': 'rtl' }],                         
      
          [{ 'size': ['small', false, 'large', 'huge'] }],  
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      
          [{ 'color': [] }, { 'background': [] }],          
          [{ 'font': [] }],
          [{ 'align': [] }],
      
          ['clean']                                         
        ]
    }

    const formats = [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image', 'color'
    ]

    return (
        <ReactQuill 
            value={value} 
            modules={modules} 
            formats={formats} 
            onChange={onChange}
        />
    )
}

export default Editor