"use client"
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'

export default function Voucher() {
    const apiBaseUrl = process.env.NEXT_PUBLIC_APP_BE_API_BASE_URL;
    const [vouchers, setVouchers] = useState([]);
    const [categories, setCategories] = useState([]);

    const axiosInstance = axios.create({
        baseURL: apiBaseUrl,
        headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
    });

    const getVouchers = async () => {
        const response = await axiosInstance.get('/voucher');
        setVouchers(response.data.data);
        setCategories(response.data.list_voucher_category);
    }

    const getCategories = async (category) => {
        const response = await axiosInstance.get(`/voucher?category=${category || ''}`);
        setVouchers(response.data.data);
        setCategories(response.data.list_voucher_category);
    }

    const handleClaim = async (voucherId) => {
        try {
            await axiosInstance.post('/voucher-claim', { voucher_id: voucherId });
            getVouchers();
        } catch (error) {
            console.error(error);
        }
    };


    useEffect(() => {
        getVouchers();
    }, []);

    return (
        <div className='bg-white min-h-screen container mx-auto'>
            <div className='grid grid-cols-3 gap-4 py-3 px-3'>
                <div className='bg-gray-50 h-dvh rounded-lg flex flex-col items-center gap-4'>
                    <div className='mt-3 border-b-2 border-gray-950'>Kategori Voucher</div>
                    {categories.map((category, index) => (
                        <div key={category} className='cursor-pointer bg' onClick={() => getCategories(category)}>{category}</div>
                    ))}
                </div>
                <div className='col-span-2 grid grid-cols-3 gap-4'>
                    {vouchers.map((item, index) => (
                        <div key={item.id} className='border-solid border-2 border-sky-500 rounded-sm'>
                            <Image
                                src=""
                                width={500}
                                height={500}
                                alt="Picture of the voucher"
                            />

                            <div className='flex justify-around my-2'>
                                <div>
                                    <div>{item.nama}</div>
                                    <div className='font-bold'>{item.kategori}</div>
                                </div>
                                <button className='bg-lime-500 rounded-lg px-2' onClick={() => handleClaim(item.id)}>
                                    Claim
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
