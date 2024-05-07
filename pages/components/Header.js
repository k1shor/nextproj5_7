'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { HiOutlineLogin, HiOutlineUserAdd, HiOutlineShoppingCart, HiOutlineLogout, HiOutlineUser, HiSpeakerphone } from "react-icons/hi";
import { logout } from '../api/userAPI';
import { useRouter } from 'next/navigation';
// import { AIOutlineLogout } from "react-icons/ai"
// import { RxDashboard } from "react-icons/rx"
// import { HiOutlineUser } from 'react-icons/hi';




const Header = () => {
    let [user, setUser] = useState({})
    useEffect(() => {
        // if (typeof window !== undefined) {
        // user = localStorage.getItem("jwt") ?
        //     JSON.parse(localStorage.getItem("jwt")).user :
        //     {}
        // }

        getUser()
            .then(data => setUser(data))

        async function getUser() {
            user = await JSON.parse(localStorage.getItem("jwt"))?.user
            return user
        }

    }, [])

    let router = useRouter()
    const handleLogout = () => {
        logout()
            .then(data => {
                if (data.msg) {
                    router.push('/')
                    window.location.reload()

                }
            })
            .catch(err => console.log(err))
    }



    return (
        <>
            <div className='grid md:grid-cols-4 md:w-[80%] bg-slate-700 mx-auto text-white'>
                <div className='col-span-1'>
                    <h1 className='text-3xl text-center py-2'>
                        <Link href={'/'}>Evolve Store</Link>
                    </h1>
                </div>
                <div className='col-span-2 flex py-2 px-4'>
                    <input type='search' className='w-full rounded-s-md text-black px-4 outline-none' />
                    <button type='warning' className=' text-white rounded-s-none'>Search</button>
                </div>
                <div className='col-span-1 flex justify-evenly py-3 text-3xl'>

                    {
                        !user ? <>
                            <Link href={'/login'}><HiOutlineLogin /></Link>
                            <Link href={'/register'}><HiOutlineUserAdd /></Link>
                        </> :
                            <span onClick={handleLogout}><HiOutlineLogout> </HiOutlineLogout>
                            </span>
                    }
                    {
                        user && (user.role === "admin" ?
                            <HiSpeakerphone /> :
                            <><HiOutlineUser /></>)
                    }



                    <Link href={'/cart'}><HiOutlineShoppingCart /></Link>
                </div>
            </div>
            <ul className='list-none md:flex justify-evenly py-2 md:w-[80%] mx-auto bg-slate-300'>
                <li><Link href={'/'}>Home</Link></li>
                <li><Link href={'/products'}>Products</Link></li>
                <li><Link href={'/services'}>Services</Link></li>
                <li><Link href={'/faqs'}>FAQs</Link></li>
                <li><Link href={'/contact'}>Contact</Link></li>
            </ul>

        </>
    )
}

export default Header