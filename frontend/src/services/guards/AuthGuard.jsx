import React, { useContext, useEffect, useState } from 'react';
import { Navigate, Outlet } from "react-router-dom";
import UserContext from '@/context/UserContext';
import UserService from '../UserService';
import { useAuth } from '@/hooks/useAuth';

export function NoAuthGuard() {
    const { isAuth } = useContext(UserContext);
    return !isAuth ? <Outlet /> : <Navigate to="/home" />
}

export function AuthGuard() {
    const [print, setPrint] = useState(<Navigate to="/auth/login" />);
    const { isAuth } = useContext(UserContext);
    const { logout } = useAuth();

    const [ bol, setBol ] = useState(false);

    useEffect(() => {
        UserService.GetUser()
            .then(({ status }) => {
                if (status == 200) {
                    setPrint(<Outlet />)
                }
                setBol(true);
            })
            .catch((err) => {
                logout()
                setPrint(<Navigate to="/auth/login" />);
            });
    }, [isAuth]);

    if (bol) {
        return print;
    }
}