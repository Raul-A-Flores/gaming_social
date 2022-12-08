import React from 'react'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FaCloudUploadAlt } from 'react-icons/fa';
import axios from 'axios';
import { MdDelete } from 'react-icons/md';
import { SanityAssetDocument } from '@sanity/client';

import userAuthStore from '../store/authStore';
import { client } from '../utils/client'
import { topics } from '../utils/constants'
import { BASE_URL } from '../utils'

const Upload = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [videoAsset, setVideoAsset] = useState<SanityAssetDocument>();
    const [wrongFileType, setWrongFileType] = useState(false);
    const [caption, setCaption] = useState('');
    const [category, setCategory] = useState(topics[0].name);
    const [savingPost, setSavingPost] = useState(false);
    const{ userProfile}: { userProfile: any}  = userAuthStore();
    const router = useRouter();


    const uploadVideo = async (e:any) =>{
    const selectedFile = e.target.files[0];
    const fileTypes = ['image/jpg','image/jpeg', 'image/png' ]

    if(fileTypes.includes(selectedFile.type)){
        
        client.assets.upload('file', selectedFile,{
            contentType: selectedFile.type, 
            filename: selectedFile.name
        })
        .then((data)=>{
            setVideoAsset(data);
            setIsLoading(false);
        })

    }else{
        setIsLoading(false);
        setWrongFileType(true)
        console.log(selectedFile.type)
    }
}   

const handlePost = async ()=>{
    if(caption && videoAsset?._id && category){
        setSavingPost(true);

        const document = {
            _type: 'post',
            caption,
            video:{
                _type: 'file',
                asset:{
                    _type: 'reference',
                    _ref: videoAsset?._id
                }
            },
            userId:userProfile?._id,
            postedBy:{
                _type:'postedBy',
                _ref:userProfile?._id
            },
            topic: category
        }

        await axios.post(`${BASE_URL}/api/posts`, document);

        router.push('/');

    }
}

return (
    <div className='flex w-full text-white h-full absolute left-0 top-[65px] mb-14 pt-10 bg-primary justify-center'>
        <div className='bg-primary rounded-lg xl:h-[90vh] flex w-[80%] gap-6 flex-wrap justify-between items-center pt-4 p-6 '>
            <div>
                <div>
                    <p className='text-2xl font-bold'>Upload Post</p>
                    <p className='text-md text-gray-400 mt-1'>Post an image to your account</p>
                </div>
                <div className=' flex flex-col justify-center items-center outline-none mt-10 w-[400px] h-auto overflow-hidden object-contain p-10 cursor-opinter hover:borer-primary2 hover:bg-primary'>
                    {
                        isLoading? (
                            <p>Uploading...</p>
                        ): (
                            <div>
                                {videoAsset ? (
                                    <div className=' rounded-3xl w-[400px] flex flex-col gap-6 justify-center '>
                                        <img
                                            
                                            src={videoAsset.url}
                                            className='rounded-xl h-[462px] object-scale-down bg-primary'
                                            />
                                    </div>
                                ):(
                                    <div>
                                        <label className='cursor-pointer'>
                                            <div className='flex flex-col items-center justify-center h-full'>
                                                <div className='flex flex-col items-center justify-center'>
                                                    <p className='font-bold'>
                                                        <FaCloudUploadAlt className='text-gray-300 text-6xl'/>
                                                    </p>
                                                    <p className='text-xl font-semibold'>Upload Post</p>
                                                </div>
                                                <p className='text-gray-400 text-center mt-10 text-small leading-10'> 
                                                    JPG or PNG<br />
                                                    Less than 10MB
                                                </p>
                                                <p className='bg-primary2 text-center mt-10 rounded text-black text-md font-medium p-2 w-52 outline-none '> Select File</p>
                                            </div>
                                            <input 
                                                type='file'
                                                name='upload-video'
                                                className='w-0 h-0'
                                                onChange={uploadVideo}
                                            />
                                        </label>
                                    </div>
                                )}
                                 {wrongFileType && (
                                    <p className='text-center text-red-400 font-semibold text-xl mt-4 w-[250px]'>
                                        Please select a image file
                                    </p>
                                )} 
                            </div>
                        )}
                </div>
            </div>
                <div className='flex flex-col gap-3 pb-10'>
                    <label className='text-md font-md'>Caption</label>
                    <input
                        type='text'
                        value={caption}
                        onChange={(e)=>setCaption(e.target.value)}
                        className='rounded text-black outline border-2 border-gray-700 p-2 outline-none'
                    />
                    <label className='text-md font-md'>Choose a Category</label>
                    <select
                        className='outline-none text-black border-2 border-gray-700 text-md capitalize lg:p-4 p-2 rounded cursor poitner'
                        onChange={(e)=> setCategory(e.target.value)}
                        >
                        {topics.map((topic)=>(
                            <option
                                key={topic.name}
                                className='outline-none capitalize bg-primary text-white text-md hover:bg-primary3 p-2'
                                value={topic.name}
                            >
                                {topic.name}
                            </option>
                        ))}
                    </select>
                    <div className='flex gap-6 mt-10'>
                        <button
                            onClick={()=> router.push('/')}
                            type='button'
                            className='border-gray-300 border-2 text-md font-medium p-2 rounded w-28 lg:w-44 outline-none'
                            > Discard
                        </button>
                        <button
                            onClick={handlePost}
                            type='button'
                            className='bg-primary2 text-black text-md font-medium p-2 rounded w-28 lg:w-44 outline-none'
                            > Post
                        </button>
                        
                    </div>
                </div>
        </div>
    </div>
  )
}

export default Upload