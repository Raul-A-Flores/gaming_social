import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { topics } from '../utils/constants';






const Discover = () => {

  const router = useRouter();
  const { topic } = router.query;

  const activeTopicStyle ='xl:border-2 hover:bg-primary3 xl:border-[rgb(24,250,252,1)] px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer text-[rgb(24,250,252,1)] ';

  const topicStyle ='xl:border-2 hover:bg-primary3 xl:border-gray-700 px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer  text-white'
  return (
    <div className='xl:border-b-2 xl:border-gray-700 pb-6'>
      <p className='text-white font-semibold m-3 mt-4 hidden xl:block'>
        Popular Games
      </p>
      
      <div className='flex gap-3 flex-wrap'>
        {topics.map((item)=>(
          <Link href={`/?topic=${item.name}` } key={item.name}>
            <div className={ topic === item.name ? activeTopicStyle : topicStyle}>
              <span>
                {item.icon}
              </span>
              <span className='font-medium text-md hidden xl:block capitalize'>
                {item.name}
              </span>
            </div>
          </Link>
        ))}

      </div>
    </div>
  )
}

export default Discover