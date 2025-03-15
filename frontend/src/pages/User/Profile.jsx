import React from 'react'
import { useEffect,useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { setCredentials } from '../../redux/features/auth/authSlice'
import { toast } from 'react-toastify'
import Loader from '../../components/Loader'
import {Link, useNavigate} from "react-router-dom"
import { useProfileMutation } from '../../redux/api/usersApiSlice'
const Profile = () => {
    const [username,setUsername]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [confirmPassword,setConfirmPassword]=useState('')


    const  {userInfo} =useSelector(state=>state.auth)
    const [updateProfile,{isLoading:loadingUpdateProfile}]=useProfileMutation()
    const dispatch=useDispatch()
    const navigate=useNavigate()
    useEffect(()=>{
        if(userInfo){
        setUsername(userInfo.username)
        setEmail(userInfo.email)}},
        [userInfo.email,userInfo.username])

const submitHandler=async (e)=>{
    e.preventDefault()
    if(password!== confirmPassword)
    {
        toast.error("Passwords do not match!!")
    }
    else{
        try {
            const res=await updateProfile({_id:userInfo._id,username,email,password}).unwrap()
            dispatch(setCredentials({...res}))
            toast.success("Profile updated successfully!")
        } catch (error) {
            toast.error(error?.data?.message|| error.message)
        }
    }
}
return (<div className='flex justify-center items-center min-h-screen bg-gray-900 text-gray-300 p-6'>
        <div className='w-full max-w-lg bg-gray-800 p-6 rounded-lg shadow-lg'>
            <h2 className="text-2xl font-semibold text-center text-teal-400 mb-6">Update Profile</h2>

        <form onSubmit={submitHandler}>
            <div className='mb-4'>
                <label className='block text-gray-300 mb-2'>Name</label>
                <input type="text"
                    placeholder='Enter name'
                    className='w-full p-3 rounded-2xl bg-gray-700 text-white focus:outline-none focus:ring focus:ring-teal-500'
                    value={username} onChange={(e)=>setUsername(e.target.value)}/>
            </div>
            <div className='mb-4'>
                <label className='block text-gray-300 mb-2'>Email Address</label>
                <input type="email"
                    placeholder='Enter email'
                    className='w-full p-3 rounded-2xl bg-gray-700 text-white focus:outline-none focus:ring focus:ring-teal-500'
                    value={email} onChange={(e)=>setEmail(e.target.value)}/>
            </div>
            <div className='mb-4'>
                <label className='block text-gray-300 mb-2'>Password</label>
                <input type="password"
                    placeholder='Enter Password'
                    className='w-full p-3 rounded-2xl bg-gray-700 text-white focus:outline-none focus:ring focus:ring-teal-500'
                    value={password} onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            <div className='mb-4'>
                <label className='block text-gray-300 mb-2'>Confirm Password</label>
                <input type="password"
                    placeholder='Confirm Password'
                    className='w-full p-3 rounded-2xl bg-gray-700 text-white focus:outline-none focus:ring focus:ring-teal-500'
                    value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
            </div>
            <div className="flex justify-between">
                <button type="submit" className='bg-teal-500 text-white py-2 px-4 rounded hover:bg-teal-700 transition'>
                    Update
                </button>
                <Link to='/user-orders' className='bg-emerald-600 text-white py-2 px-4 rounded hover:bg-emerald-900 transition'>
                My Orders</Link>
            </div>
        </form>
    {loadingUpdateProfile && <Loader />}


        </div>

  </div>)
}

export default Profile
