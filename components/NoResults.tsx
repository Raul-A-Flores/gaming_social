import React from 'react';
import { MdOutlineSpeakerNotesOff } from 'react-icons/md'
import { BiCommentX } from 'react-icons/bi'


interface IProps {
  text: string;

}

const NoResults = ({ text }: IProps) => {
  return (
    <div className='flex flex-col text-white bg-primary mt-20 jusitfy-center items-center h-full w-full'>
      <p className='text-8xl'>
        { text === 'No comments yet!'?
        <BiCommentX /> : 
        <MdOutlineSpeakerNotesOff />
        }
      </p>
      <p className='text-2xl mt-5 text-center'>{text}</p>

    </div>
  )
}

export default NoResults