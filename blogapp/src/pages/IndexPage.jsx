import React, { useEffect } from 'react'
import Post from '../Post'

const IndexPage = () => {
  useEffect(() => {
    fetch('/post').then(response => {
      response.json().then(posts => {
        console.log(posts)
      });
    })
  }, [])
  return (
    <div>

    </div>
  )
}

export default IndexPage