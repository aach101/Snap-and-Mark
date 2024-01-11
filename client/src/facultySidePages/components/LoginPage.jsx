import React, { useState } from 'react';
import user from './user.png'
function LoginPage() {
    const [username,setUserName] = useState("");
    const [password,setPassword] = useState("");
    const [allUsers,setAllUsers] = useState([]);

    const submitform=(e)=>{
        e.preventDefault();
       const newUser={username:username, password:password };

      // setAllUsers([...allUsers,newUser]);
       console.log(newUser);
  

    }

    return (
        <div className=" box-border flex items-center justify-center h-screen " >

            <form className=" bg-blue-100 shadow-md   rounded sm:min-w-[380px] md:min-w-[450px] min-h-[500px] hover:border-2 px-10 py-8 m-10" onSubmit={submitform}>
                <div className="text-blue-700 text-[28px] mb-5  grid  font-serif mx-auto my-auto  place-content-center" ><p className='font-bold underline'>login</p></div>
                <div className='flex flex-col justify-evenly items-center '>
                    <img src={user} alt='logo' className='h-[100px] w-[100px]'></img>
                    </div>

                    <label className="block text-gray-700 text-lg ml-1 font-bold  ">Username</label>

                    <input type="text" name="username" value={username} 
                    onChange={(e)=>setUserName(e.target.value)} autoComplete='off'
                        className="shadow appearance-none border  rounded w-full py-1 mb-10  px-3 text-blue-700  font-semibold  leading-tight    focus:outline-none focus:shadow-outline" />
                    <label className="block text-gray-700 text-lg ml-1 font-bold ">Password</label>
                    <input type="password" name="password" value={password}
                     onChange={(e)=>setPassword(e.target.value)} autoComplete='off'
                        className="shadow font-semibold  appearance-none border rounded w-full py-1 mb-10 px-3 text-blue-700   leading-tight    focus:outline-none focus:shadow-outline" />



                    <div className="flex justify-evenly">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-2 rounded focus:outline-none focus:shadow-outline">Login</button>

                </div>
            </form>
        </div>
    )
}

export default LoginPage