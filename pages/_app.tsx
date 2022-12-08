import '../styles/globals.css'
import type { AppProps } from 'next/app';
import { useState, useEffect} from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { GoogleOAuthProvider } from '@react-oauth/google';


const MyApp = ({ Component, pageProps }: AppProps) => {
  const [isSSR, setIsSSR] = useState(true)

  useEffect(()=>{
    setIsSSR(false);
  },[]);

  if(isSSR) return null;

  return (
  <GoogleOAuthProvider clientId={`${process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN}`}>
    <div className=' m-auto  bg-primary'>
      <Navbar />
      <div className='flex gap-6 md:gap-20'>
        <div className='h-auto overflow-hidden '>
          <Sidebar/>
        </div>
        <div className='mt-4 flex flex-col gap-10  h-[88bh] videos flex-1'>
          <Component {...pageProps} />
        </div>
      </div>

    </div>
  </GoogleOAuthProvider>
  )
}

export default MyApp
