"use client"
import { useRouter } from 'next/navigation';
import { useState } from 'react'
import axios from 'axios';

export default function Register() {
    const apiBaseUrl = process.env.NEXT_PUBLIC_APP_BE_API_BASE_URL;
    const router = useRouter()
    const [nama, setNama] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('')
    const [messageClass, setMessageClass] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(`${apiBaseUrl}/register`, {
                nama,
                username,
                email,
                password
            })
            setMessage(response.data.message)
            setMessageClass('text-green-700')
            setTimeout(() => {
                setMessage('')
                setMessageClass('')
            }, 3500)
            await router.push('/login');
        } catch (error) {
            setMessage(error.response.data.message)
            setMessageClass('text-red-700')
            setTimeout(() => {
                setMessage('')
                setMessageClass('')
            }, 3000)
        }
    }

    return (
        <div className="container mx-auto">
            <div class="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
                <div class="max-w-screen-lg m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
                    <div class="mt-14 flex flex-col items-center">
                        <h1 class="text-2xl xl:text-3xl font-bold">Register</h1>
                        {message && <div className={`text-lg ${messageClass} mt-3`}>{message}</div>}
                        <div class="w-full flex-1 mt-8">
                            <div class="mx-auto max-w-xs">
                                <input
                                    class="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                    type="text" placeholder="Nama"
                                    onChange={e => setNama(e.target.value)}
                                />

                                <input
                                    class="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                    type="text" placeholder="Username"
                                    onChange={e => setUsername(e.target.value)}
                                />


                                <input
                                    class="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                    type="email" placeholder="Email"
                                    onChange={e => setEmail(e.target.value)}
                                />
                                <input
                                    class="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                    type="password" placeholder="Password"
                                    onChange={e => setPassword(e.target.value)}
                                />

                                <button
                                    class="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                                    type="submit" onClick={handleSubmit}>
                                    <svg class="w-6 h-6 -ml-2" fill="none" stroke="currentColor" stroke-width="2"
                                        stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                        <circle cx="8.5" cy="7" r="4" />
                                        <path d="M20 8v6M23 11h-6" />
                                    </svg>
                                    <span class="ml-3">
                                        Sign Up
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
