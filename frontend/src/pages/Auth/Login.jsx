import React from 'react'
import { useState,useEffect } from 'react'
import {Link,useLocation,useNavigate} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import {useLoginMutation} from "../../redux/api/usersApiSlice";
import { setCredentials } from '../../redux/features/auth/authSlice';
import {toast} from "react-toastify";
import Loader from '../../components/Loader';
const Login = () => {

    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const [login,{isLoading}]=useLoginMutation();
    const {userInfo}=useSelector((state)=>state.auth);

    const {search}=useLocation();
    const sp=new URLSearchParams(search)
    const redirect=sp.get('redirect') || '/';

    useEffect(()=>{
        if(userInfo){
            navigate(redirect)
        }
    },[navigate,redirect,userInfo])

    const submitHandler=async(e)=>{
        e.preventDefault();
        if (!email.trim() || !password.trim()) {
            toast.error("Email and Password are required!");
            return;
        }
        try{
            const res=await login({email,password}).unwrap();
            console.log(res)
            dispatch(setCredentials({...res}));
            navigate(redirect)
        }catch(error){
            toast.error(error?.data?.message||error?.error || "Login Failed");
        }
    }
return (
    <div>
        <section className="pl-[10rem] flex items-center justify-center min-h-screen  bg-gray-900 text-teal-300 relative"
    style={{
            backgroundImage: "url('/login-bg.jpg')", 
            backgroundSize: 'cover',
            backgroundPosition:'left center',
            backgroundRepeat: 'no-repeat',
            width: '100vw',
            height: '100vh',
        }}
    >
            <div className="mr-[48rem] mt-[2rem]  bg-gray-950 backdrop-blur-md opacity-67 p-10 rounded-lg">
                <h1 className="text-2xl font-semibold mb-4">Sign In</h1>
                <form onSubmit={submitHandler} className="container w-[40rem]">
                    <div className='my-[2rem]'>
                        <label htmlFor="email" className="block text-sm font-medium text-white">Email Address</label>
                        <input type="email" id="email" className="mt-1 p-2 border rounded w-full" value={email} 
                        onChange={(e)=>setEmail(e.target.value)}/>
                    </div>
                    <div className='my-[2rem]'>
                        <label htmlFor="password" className="block text-sm font-medium text-white">Password</label>
                        <input type="password" id="password" className="mt-1 p-2 border rounded w-full" value={password} 
                        onChange={(e)=>setPassword(e.target.value)}/>
                    </div>
                    <button disabled={isLoading} type="submit" className="bg-fuchsia-600 text-white px-4 py-2 rounded
                    cursor-pointer my-[1rem]">{isLoading?"Signing In...":"Sign In"}</button>
                    {isLoading && <Loader/>}
                </form>
        <div className="mt-4">
            <p className="text-white">
                New Customer?{" "}
                    <Link to={redirect?`/register?redirect=${redirect}`:"/register"}
                    className="text-pink-600 hover-underline underline-offset-auto">Register</Link></p>
        </div>
            </div>
        </section>
    </div>
)
}

export default Login
