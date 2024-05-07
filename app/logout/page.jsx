"use client"
import { useEffect } from 'react'
import { useRouter } from 'next/navigation';

import axios from 'axios';

export default function Logout() {
    const apiBaseUrl = process.env.NEXT_PUBLIC_APP_BE_API_BASE_URL;
    const router = useRouter()
    const accessToken = localStorage.getItem('access_token');

    useEffect(() => {
        if (!accessToken) {
            router.push('/login');
            return;
        }
        
        const logout = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                };

                await axios.post(`${apiBaseUrl}/auth/logout`, null, config);
                localStorage.removeItem('access_token');
                await window.location.reload()
                await router.push('/login');
            } catch (error) {
                console.error(error);
            }
        };

        logout();
    }, []);

    return null;
}
