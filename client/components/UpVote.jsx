import React, { useEffect, useState } from 'react';
import axios from 'axios';


const UpVote = ({text}) => {
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    axios.get(`/text/${text.id}`)
    .then((likeCount) => {
       setLikes(likeCount.data.likes)
    })
    .catch((err) => console.error(`Error getting like count:${err}`))
  }, [text.id])

  const handleLikes = () => {
    axios.post(`/text/likes/${text.id}`, { action: 'like'})
    .then((textObj) => {
      if (textObj.status === 200) {
        setLikes(likes + 1);
      }
    })
    .catch((err) => console.error(`Error liking: ${err}`))

  };
  const handleDislikes = () => {
    axios.post(`/text/likes/${text.id}`, {action: 'dislike'})
    .then((textObj) => {
      if (textObj.status === 200 && likes > 0) {
        setLikes(likes - 1)
      }
    })
    .catch((err) => console.error(`Error disliking: ${err}`))
  };


  return (
    <div>
        <button className='upvote-btn' onClick={handleLikes}> ⬆️</button>
        <span>{likes}</span>
        <button className='upvote-btn' onClick={handleDislikes}>⬇️</button>
    </div>
  )



}
export default UpVote;