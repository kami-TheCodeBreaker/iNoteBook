import React from 'react'
import loader from './loader.gif';
const SpinLoader=()=>{
    return (
        <div className='flex h-1/6 my-5 items-center justify-center'><img src={loader} alt="loader" /></div>
        )
}
export default SpinLoader;