import React, {useEffect} from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import GoogleLogin from 'react-google-login';
import {AiFillHome, AiOutlineMenu } from 'react-icons/ai'
import { ImCancelCircle} from 'react-icons/im';
import { useState } from 'react';
import Discover from './Discover';
import SuggestedAccounts from './SuggestedAccounts';
import Footer from './Footer';

const Sidebar = () => {

  const [useSidebar, setUseSidebar] = useState(true);


  const normalLink = 'flex items-center overflow-hidden gap-3 hover:bg-primary2 hover:text-black p-3 jusitfy-center xl:justify-start cursor-pointer font-semibold rounded';
  return (
    <div>
      <div
        className='block xl:hidden m-2 ml-4 mt-3 text-xl text-white'
        onClick={() => setUseSidebar((prev)=> !prev)}
        >
        { useSidebar ? <ImCancelCircle /> : <AiOutlineMenu />}
      </div>
      {
        useSidebar && (
          
          <div className='xl:w-400 w-20 flex bg-sidebar flex-col justify-start overflow-hidden mb-10 border-r-2 text-white xl:border-0 p-3'>
            <div className='xl:border-b-2 border-gray-500 xl:pb-4 ' >
              <Link href='/'>
                <div className={normalLink}>
                  <p className='text-2xl'>
                    <AiFillHome />
                  </p>
                  <span className='text-xl hidden xl:block'>
                    For You
                  </span>
                </div>
              </Link>
            </div>
            <Discover />
            <SuggestedAccounts />
            <Footer />
          </div>
          
          )
        }

    </div>
  )
}

export default Sidebar