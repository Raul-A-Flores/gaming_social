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
  
  const [isHover, setIsHover] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const VideoRef = useRef<HTMLVideoElement>(null);

  const onVideoPres = ()=>{
    if(playing){
      VideoRef?.current?.pause();
      setPlaying(false);


    }else{
      VideoRef?.current?.play();
      setPlaying(true);
    }
  }
  useEffect(() => {
    if (VideoRef?.current){
      VideoRef.current.muted = isVideoMuted;
      console.log(post.video)
      console.log(post.video.asset , " ASSSETSSSS")
    }
  
    },
   [isVideoMuted])
  
  
  console.log(post.caption)
  return (
    <div className='flex flex-col border-b-2 border-gray-200 pb-6'>
      <div>
        <div className='flex gap-3 p-2 cursor-pointer font-semibold rounded '>
          <div className='md:w-16 md:h-16 w-10 h-10'>
            <Link href={`/profile/${post.postedBy._id}`}>
              <>
                <Image 
                  width={62}
                  height={62}
                  className='rounded-full'
                  src={post.postedBy.image}
                  alt='profile'
                  layout='responsive'
                />
              </>
            </Link>

          </div>
          <Link href={`/profile/${post.postedBy._id}`}>
            <div className='flex items-center gap-2'>
              <p className='flex gap-2 items-center md:text-md font-bold text-primary'>{post.postedBy.userName}</p>
              { ` `}
              <GoVerified className='text-blue-400 text-md' />
              <p className='capitalize font-medium text-xs text-white hidden md:block'>{post.postedBy.userName}</p>
            </div>
          </Link>

        </div>
      </div>
      <div className='lg:ml-20 flex gap-4 relative items-center'>
        <div className='rounded-3xl'
              onMouseEnter={() =>setIsHover(true)}
              onMouseLeave={()=>setIsHover(false)}
              >
          <Link href={`/detail/${post._id}`}>
            <img
              src={post.video.asset.url}
              className='lg: h-[250px] md:h-[300px] lg:h-[430px] rounded-2xl items-center cursor-pointer bg-gray-100 object-fit'
            />
          
          </Link>
        </div>

      </div>

    </div>
  )
}

export default VideoCard