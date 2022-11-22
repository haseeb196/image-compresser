import React, { useEffect, useState } from 'react'
import imageCompression from 'browser-image-compression';

function Compresser() {
   const [image, setImage] = useState({dataurl : null, size : '', type : null, filename : null, realimage : null})
     const [compressedimage, setCompressedimage] = useState({dataurl : null, size : '',type : null, filename : null, ok : false, realimage : null})
   const [checksize, setChecksize] = useState(null);
   
     const objectchecker = Object.values(image).every(value => value === null ? false : true);
     const objectcheckercompress = compressedimage.dataurl === null ? false : true;
     useEffect(() => {
       if(image.dataurl) setCompressedimage({ok : false});
       
     }, [image])
     const imager = (e) => {
      e.preventDefault();
      
      const imageFile = e.target.files[0];
      setChecksize(imageFile.size);
          setImage({
            realimage : imageFile,
            dataurl : URL.createObjectURL(imageFile),
            size : formatBytes(imageFile.size),
            type : imageFile.type,
            filename : imageFile.name,
          });
          
   }

   const compresser = async () => {
    
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1024,
      useWebWorker: true
    }
    if(objectchecker){
    const compressedFile = await imageCompression(image.realimage, options);
    setCompressedimage({
      realimage : compressedFile,
      dataurl : URL.createObjectURL(compressedFile),
      size : formatBytes(compressedFile.size),
      type : compressedFile.type,
     filename : compressedFile.name,
     ok : true
    });
    
  
  } else {
      alert('Upload a File')
    }
  }

  function formatBytes(a,b=2){if(!+a)return"0 Bytes";const c=0>b?0:b,d=Math.floor(Math.log(a)/Math.log(1024));return`${parseFloat((a/Math.pow(1024,d)).toFixed(c))} ${["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"][d]}`}
  

   return (
    <div className='mt-[45px] flex flex-col gap-4'>
   <div className="flex items-center flex-col gap-4">
         <h1 className='uppercase font-semibold text-center text-[40px]'>image compresser</h1>
      <div className='mb-[50px] flex md:flex-row sm:flex-col gap-6'>
         <label htmlFor='file-upload' className='bg-sky-400 py-2 px-5 rounded-lg capitalize'>Upload Image</label>
         <input type="file" id='file-upload' accept='image/*' onChange={(e) => imager(e)} hidden='true'/>
        <button onClick={compresser} className='bg-sky-400 py-2 px-5 rounded-lg capitalize'>compress now</button>
       {compressedimage.ok ? (<a className='bg-sky-400 text-center py-2 px-6 rounded-lg capitalize' rel='noreferrer' target='_blank' href={compressedimage.ok ? checksize > 1000 ? compressedimage?.dataurl : image?.dataurl : null} download={image.filename}>Download</a>) : (<></>)}
         </div>
      </div>
      <div className='flex xl:flex-row sm:flex-col gap-[60px]'>
    <div>
    
      {objectchecker ? (
      <div className='flex flex-col gap-9'>
      <img src={image.dataurl} className='max-w-[490px] max-h-[490px] shadow-2xl p-5 rounded-2xl' alt="" />
      <div className="grid sm:grid-cols-2 md:grid-cols-3">
      <div className='flex flex-col  items-center'><h1>name</h1><p className='w-[150px] text-center text-ellipsis whitespace-nowrap overflow-hidden'>{image.filename}</p></div>
      <div className='flex flex-col  items-center'><h1>type</h1><p>{image.type}</p></div>
      <div className='sm:col-span-2 md:col-span-1 flex flex-col items-center'><h1>size</h1><p>{image.size}</p></div>
      </div>
      </div>
      ) : (<></>) }
      </div>
      {checksize > 1000 ? compressedimage.ok ? objectcheckercompress ? (
        <div>
      <div className='flex flex-col gap-9'>
      <img src={image.dataurl} className='max-w-[490px] max-h-[490px] shadow-2xl p-5 rounded-2xl' alt="" />
      <div className="grid sm:grid-cols-2 md:grid-cols-3">
      <div className='flex flex-col  items-center'><h1>name</h1><p className='w-[150px] text-center text-ellipsis whitespace-nowrap overflow-hidden'>{compressedimage.filename}</p></div>
      <div className='flex flex-col  items-center'><h1>type</h1><p>{compressedimage.type}</p></div>
      <div className='sm:col-span-2 md:col-span-1 flex flex-col items-center'><h1>size</h1><p>{compressedimage.size}</p></div>
      </div>
      </div>
      </div>
      )  : (<></>) : (<></>) : compressedimage.ok ? objectcheckercompress ? ( 
        <div className='flex flex-col gap-9'>
      <img src={image.dataurl} className='max-w-[490px] max-h-[490px] shadow-2xl p-5 rounded-2xl' alt="" />
      <div className="grid sm:grid-cols-2 md:grid-cols-3">
      <div className='flex flex-col  items-center'><h1>name</h1><p className='w-[150px] text-center text-ellipsis whitespace-nowrap overflow-hidden'>{image.filename}</p></div>
      <div className='flex flex-col  items-center'><h1>type</h1><p>{image.type}</p></div>
      <div className='sm:col-span-2 md:col-span-1 flex flex-col items-center'><h1>size</h1><p>{image.size}</p></div>
      </div>
      </div>
      ) : (<></>) : (<></>)}
      </div>
    </div>
  )
}

export default Compresser