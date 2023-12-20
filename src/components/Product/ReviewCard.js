import React from 'react'
import { Rating } from "@material-ui/lab";
import profilePng from '../../images/Profile.png'

const ReviewCard = ({review}) => {

const options = {
  size: "medium",
  value:review.rating,
  readOnly: true,
  precision: 0.5,
};

  return (
    <div className='border-2 w-56 h-80 flex flex-col gap-2 items-center'>
      <img src={profilePng} alt='user' className='w-20 h-20'/>
      <p>{review.name}</p>
      <Rating {...options} />
      <span className='w-40 h-30 overflow-hidden'>{review.comment}</span>
    </div>
  )
}

export default ReviewCard