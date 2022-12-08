import React, { useState, useEffect} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import { FiLogOut } from 'react-icons/fi';
import {BiSearch} from 'react-icons/bi';
import {IoMdAdd} from 'react-icons/io'
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import Logo from '../utils/logo.png'
import { createOrGetUser } from '../utils';
import useAuthStore from '../store/authStore';

const Navbar = () => {

  const { userProfile, addUser, removeUser } = useAuthStore();
  const [searchValue, setSearchValue] = useState('')
  const router = useRouter();

  const handleSearch = (e: { preventDefault: () => void}) =>{
    e.preventDefault();

    if(searchValue){
      Router.push(`/search/${searchValue}`)
    }

  }

  return (
    <div className='w-full flex justify-between items-center bg-navbar py-2'>
      <Link href='/'>
        <div className='w-[150px] md:w-[120px] '>
           <Image 
            className='cursor-pointer'
            src={Logo}
            alt='logo'
            layout='responsive'
          /> 
          
        </div>
      </Link>
      <div className='relative hidden md:block'>
        <form
          onSubmit={handleSearch}
          className='absolute md:static topic-10 left-20 bg-navbar'
        >
          <input
          type='text'
          value={searchValue}
          onChange={(e)=>setSearchValue(e.target.value)}
          placeholder='Search'
          className='bg-primary text-white py-3 px-4 md:text-md font-medium focus:outline-none w-[300px] md:w-[350px] rounded-full md:top-0 hover:bg-primary3 '
          />
          <button
            onClick={handleSearch}
            className='absolute md:right-5 right-6 top-3 border-l-2 pl-4 text-2xl text-gray-400 '>
              <BiSearch />
          </button>       
        </form>

      </div>
      <div>
        {
          userProfile ? 
          (<div className='flex gap-5 md:gap-10'>
            <Link href='/upload'>
              <button className=' rounded px-2 md:px-4 text-md font-semibold flex items-center gap-2 bg-primary2 text-black'>
                <IoMdAdd className='text-xl'/>{` `}
                <span className='hidden md:block'>Upload</span>
              </button>
            </Link>
            {userProfile.image && (
              <Link href='/'>
              <Image 
                  width={40}
                  height={40}
                  className='rounded-full cursor-pointer '
                  src={userProfile.image}
                  alt='profile'
              
                />
              </Link>
            )}
            <button
            type='button'
            className='px-2'
            onClick={()=>{googleLogout(); console.log(userProfile); removeUser()}}
            >
              <FiLogOut color='rgb(24,250,252,1)' fontSize={21}/> 
            </button>
            <div className='text-center mt-2 mr-10 text-white'>
              {userProfile.userName}
            </div>
            
            </div>

          ):(
            <div className='pr-5'>
              <GoogleLogin
                onSuccess={(response) => 
                createOrGetUser(response, addUser)   
                }
                onError={()=> console.log('Error')}    
                  />
            </div>
            )
        }
      </div>
    </div>
  )
}

export default Navbar