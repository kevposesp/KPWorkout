import React, { useEffect, useState } from 'react';
import '@/assets/css/template.scss';

import Menu from '@/components/client/Menu';
import ProfileSettings from '@/components/client/profile/ProfileSettings';
import WishList from '@/components/client/profile/WishList';
import Chart from '@/components/client/profile/Chart';
import Order from '@/components/client/profile/Orders';

import { useAuth } from '@/hooks/useAuth';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBoxArchive, faHeart, faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { faAddressCard } from '@fortawesome/free-regular-svg-icons'

const Profile = () => {

    const [page, setPage] = useState('profile');
    const [localPage, setLocalPage] = useState(localStorage.getItem('page') || false);
    const { user } = useAuth();

    useEffect(() => {
        if (localPage && localPage !== page) {
            setPage(localPage);
        }
    }, []);

    const renderPage = () => {
        switch (page) {
            case 'profile':
                return (<ProfileSettings user={user} />)
            case 'order':
                return (<Order />)
            case 'wishlist':
                return (<WishList />)
            case 'chart':
                return (<Chart />)
            default:
                return (<ProfileSettings user={user} />)
        }
    }

    return (
        <div className=''>
            <Menu />
            <div className="container grid grid-cols-12 items-start gap-6 pt-4 pb-16 m-auto mt-10">
                <div className="col-span-3">
                    <div className="px-4 py-3 shadow flex items-center gap-4">
                        <div className="flex-shrink-0">
                            <img src="../assets/images/avatar.png" alt="profile"
                                className="rounded-full w-14 h-14 border border-gray-200 p-1 object-cover" />
                        </div>
                        <div className="flex-grow">
                            <p className="text-gray-600">Hello,</p>
                            <h4 className="text-gray-800 font-medium">{user.name}</h4>
                        </div>
                    </div>

                    <div className="mt-6 bg-white shadow rounded p-4 divide-y divide-gray-200 space-y-4 text-gray-600">
                        <div className="space-y-1 pl-8">
                            <a className={`block font-medium capitalize transition relative ${page == 'profile' ? 'selected-color' : ''}`} onClick={() => {
                                localStorage.setItem('page', 'profile');
                                setLocalPage('profile');
                                setPage('profile');
                            }}>
                                <span className="absolute -left-8 top-0 text-base">
                                    <FontAwesomeIcon icon={faAddressCard} />
                                </span>
                                Manage account
                            </a>
                        </div>

                        <div className="space-y-1 pl-8 pt-4">
                            <a className={`relative hover:text-primary block font-medium capitalize transition ${page == 'order' ? 'selected-color' : ''}`} onClick={() => {
                                localStorage.setItem('page', 'order');
                                setLocalPage('order');
                                setPage('order')
                            }}>
                                <span className="absolute -left-8 top-0 text-base">
                                    <FontAwesomeIcon icon={faBoxArchive} />
                                </span>
                                My order history
                            </a>
                            {/* <a href="#" className="relative hover:text-primary block capitalize transition">
                                My returns
                            </a>
                            <a href="#" className="relative hover:text-primary block capitalize transition">
                                My Cancellations
                            </a>
                            <a href="#" className="relative hover:text-primary block capitalize transition">
                                My reviews
                            </a> */}
                        </div>

                        <div className="space-y-1 pl-8 pt-4">
                            <a className={`relative text-primary block font-medium capitalize transition ${page == 'wishlist' ? 'selected-color' : ''}`} onClick={() => {
                                localStorage.setItem('page', 'wishlist');
                                setLocalPage('wishlist');
                                setPage('wishlist')
                            }}>
                                <span className="absolute -left-8 top-0 text-base">
                                    <i className="fa-regular fa-heart"></i>
                                    <FontAwesomeIcon icon={faHeart} />
                                </span>
                                My wishlist
                            </a>
                        </div>
                        
                        <div className="space-y-1 pl-8 pt-4">
                            <a className={`relative text-primary block font-medium capitalize transition ${page == 'chart' ? 'selected-color' : ''}`} onClick={() => {
                                localStorage.setItem('page', 'chart');
                                setLocalPage('chart');
                                setPage('chart')
                            }}>
                                <span className="absolute -left-8 top-0 text-base">
                                    <i className="fa-regular fa-heart"></i>
                                    <FontAwesomeIcon icon={faCartShopping} />
                                </span>
                                Chart
                            </a>
                        </div>

                        <div className="space-y-1 pl-8 pt-4">
                            <a href="#" className="relative hover:text-primary block font-medium capitalize transition">
                                <span className="absolute -left-8 top-0 text-base">
                                    <i className="fa-solid fa-right-from-bracket"></i>
                                </span>
                                Logout
                            </a>
                        </div>

                    </div>
                </div>

                {renderPage()}

            </div>
        </div>

    );
};

export default Profile;
