import React from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import useAuthStore from '../../store/auth-store';
import { useNavigate } from 'react-router-dom';

const AdminHeader = () => {
    const navigate = useNavigate();
    const actionLogout = useAuthStore((state) => state.actionLogout);

    const hdlLogout = () => {
        actionLogout();
        navigate('/');
    };

    return (
        <div className="bg-white text-gray-800 h-12 px-4 items-center flex justify-end border-b border-gray-300">
            <div className="relative group bg-white">
                <button
                    className="flex items-center justify-between gap-2
                    hover:text-green-500 hover:scale-110 hover:-translate-y-1 hover:duration-200"
                >
                    <img
                        src={"https://cdn-icons-png.flaticon.com/512/6858/6858504.png"}
                        className="w-8 h-8"
                    />
                    AdminProfile
                    <IoIosArrowDown />
                </button>
                <ul className="absolute bg-white rounded-lg w-full hidden group-hover:block border border-gray-300">
                    <li 
                        onClick={hdlLogout}
                        className="py-2 px-3 cursor-pointer rounded-sm hover:bg-gray-100 hover:duration-200 active:bg-green-400">
                        LogOut
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default AdminHeader;
