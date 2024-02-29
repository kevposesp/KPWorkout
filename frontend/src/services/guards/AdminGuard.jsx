import React, { useContext, useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import UserService from '../UserService';
import UserContext from '@/context/UserContext';
import { useAuth } from '@/hooks/useAuth';

function AdminGuard() {
    const [print, setPrint] = useState(<Navigate to="/home" />);
    const { isAdmin } = useContext(UserContext);
    const { logout } = useAuth();

    const [bol, setBol] = useState(false);

    useEffect(() => {
        UserService.GetUser()
            .then(({ data, status }) => {
                if (status === 200) {
                    if (data.data.type === 'admin') {
                        setPrint(<Outlet />);
                    } else {
                        setPrint(<Navigate to="/home" />);
                    }
                }
                setBol(true);
            })
            .catch((err) => {
                logout()
                setPrint(<Navigate to="/auth/login" />);
            });
    }, [isAdmin]);

    if (bol) {
        return print;
    }
}

export default AdminGuard;