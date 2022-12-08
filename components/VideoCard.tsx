import React from 'react'
import { Video } from '../types';
import { NextPage } from 'next';
import Link from 'next/link';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
import { BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react'


interface IProps{
  post: Video;
}



const VideoCard: NextPage<IProps> = ({ post }) => {


  
  // console.log(post.caption)
  return (
    <div className='flex flex-col border-b-2 border-gray-200 pb-6'>
      <div>
        <div className='flex gap-3 p-2 cursor-pointer font-semibold rounded '>
          <div className='md:w-16 md:h-16 w-10 h-10'>
            <Link href={`/profile/${post.postedBy._id}`}>
                <Image 
                  width={62}
                  height={62}
                  className='rounded-full'
                  src={post.postedBy.image}
                  alt='profile'
                  layout='responsive'
                />
            </Link>

          </div>
          <Link href={`/profile/${post.postedBy._id}`}>
            <div className='flex items-center gap-2'>
              <p className='flex gap-2 items-center md:text-md font-bold text-white'>{post.postedBy.userName}</p>
              { ` `}
              <GoVerified className='text-blue-400 text-md' />
              <p className='capitalize font-medium text-xs text-white hidden md:block'>{post.postedBy.userName}</p>
            </div>
          </Link>

        </div>
      </div>
      <div className='lg:ml-20 flex gap-4 relative px-5 items-center '>
        <div className='rounded-3xl' >
        <p className='text-white mb-6'>{post.caption}</p>
          <Link href={`/detail/${post._id}`}>
            
            <img
              src={post.video.asset.url}
              className='md:h-[300px] sm:h-[300px] xs:h-[220px] rounded object-contain lg:h-[400px] cursor-pointer bg-primary  '
            />    
          </Link>
          
        </div>

      </div>

    </div>
  )
}

export default VideoCard