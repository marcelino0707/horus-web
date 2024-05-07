"use client"
import axios from 'axios';
import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function History() {
    const apiBaseUrl = process.env.NEXT_PUBLIC_APP_BE_API_BASE_URL;
    const [vouchers, setVouchers] = useState([]);
    const [categories, setCategories] = useState([]);
    const [totalNumberCategories, setTotalNumberCategories] = useState(0);

    const axiosInstance = axios.create({
        baseURL: apiBaseUrl,
        headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
    });

    const getHistories = async () => {
        const response = await axiosInstance.get('/history');
        setVouchers(response.data.data);
        setCategories(response.data.list_category);
        setTotalNumberCategories(response.data.total_claimed_voucher);
    }

    const handleRemove = async (voucherId) => {
        try {
            await axiosInstance.delete(`/voucher-claim/${voucherId}`);
            getHistories();
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getHistories();
    }, []);

    return (
        <div className='bg-white min-h-screen container mx-auto'>
            <div className='grid grid-cols-3 gap-4 py-3 px-3'>
                <div className='col-span-2 grid gap-4 bg-gray-200'>
                    <table className='table-auto w-full text-center'>
                        <thead>
                            <tr>
                                <th>Nama</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vouchers.map((item, index) => (
                                <tr key={item.id} className='bg-gray-300'>
                                    <td>
                                        <div className='flex justify-around items-center'>
                                            <Image 
                                                src=""
                                                width={150}
                                                height={150}
                                                alt="Picture of the voucher"
                                            />
                                            {item.nama}
                                        </div>
                                    </td>
                                    <td><button className='bg-red-500 rounded-lg px-2' onClick={() => handleRemove(item.id)}>Remove</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className='bg-gray-50 h-dvh rounded-lg items-center gap-4 flex flex-col'>
                    <table className='table-auto w-full text-center'>
                        <thead>
                            <tr>
                                <th>Kategori Voucher</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((category, index) => (
                                <tr key={category.kategori}>
                                    <td>
                                        {category.kategori}
                                    </td>
                                    <td>
                                        {category.total_number}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <th>
                       <td> Total Voucher Claimed: </td>
                       <td> {totalNumberCategories} </td>
                    </th>
                </div>
            </div>
        </div>
    )
}
