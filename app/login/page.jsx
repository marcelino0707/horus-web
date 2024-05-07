"use client"
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react'
import axios from 'axios';
import { RiLoginBoxLine } from "react-icons/ri";

export default function Login({ refreshNavbar }) {
    const apiBaseUrl = process.env.NEXT_PUBLIC_APP_BE_API_BASE_URL;
    const router = useRouter()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('')
    const [messageClass, setMessageClass] = useState('')

    useEffect(() => {
        const access_token = localStorage.getItem('access_token');
        if (access_token) {
            router.push('/');
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(`${apiBaseUrl}/auth/login`, {
                username,
                password
            })
            setMessage(response.data.message)
            setMessageClass('text-green-700')
            localStorage.setItem('access_token', response.data.access_token);
            setTimeout(() => {
                setMessage('')
                setMessageClass('')
            }, 4000)
            await router.push('/');
            await window.location.reload('')
        } catch (error) {
            setMessage(error)
            setMessageClass('text-red-700')
            setTimeout(() => {
                setMessage('')
                setMessageClass('')
            }, 2500)
        }
    }

    return (
        <div className="container mx-auto">
            <div class="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
                <div class="max-w-screen-lg m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
                    <div class="mt-14 flex flex-col items-center">
                        <h1 class="text-2xl xl:text-3xl font-bold">Login</h1>
                        {message && <div className={`text-lg ${messageClass} mt-3`}>{message}</div>}
                        <div class="w-full flex-1 mt-8">
                            <div class="mx-auto max-w-xs">
                                <input
                                    class="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                    type="username" placeholder="Username"
                                    onChange={e => setUsername(e.target.value)}
                                />
                                <input
                                    class="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                    type="password" placeholder="Password"
                                    onChange={e => setPassword(e.target.value)}
                                />
                                <button
                                    class="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                                    type="submit" onClick={handleSubmit}>
                                    <RiLoginBoxLine
                                        size={30}
                                    />
                                    <span class="ml-3">
                                        Login
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
