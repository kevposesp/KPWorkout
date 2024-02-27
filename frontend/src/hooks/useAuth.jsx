import { useContext } from 'react';
import UserContext from '@/context/UserContext';
import UserService from '@/services/UserService';
import JwtService from '@/services/JwtService';
import { useToastr } from './useToastr';
import { useNavigate } from 'react-router-dom';

export function useAuth() {

    const { user, setUser, setToken, setIsAuth, isAdmin, setIsAdmin } = useContext(UserContext)
    const { useCreateToastr } = useToastr();

    const Navigate = useNavigate();

    const login = (data) => {
        UserService.LoginUser(data)
            .then(({ data, status }) => {
                if (status === 200) {
                    useCreateToastr({ status: true })
                    setUser(data);
                    setToken(data.token);
                    JwtService.saveToken(data.token);
                    setIsAuth(true);
                    setIsAdmin(data.role === 'Admin');
                    Navigate('/home')
                }
            })
            .catch(e => console.error(e));
    };

    const register = (user) => {
        UserService.RegisterUser(user)
            .then(({ data, status }) => {
                if (status === 200) {
                    useCreateToastr({ status: true })
                    Navigate('/auth/login')
                }
            })
            .catch(e => console.error(e));
    };

    const logout = () => {
        setUser({});
        setToken(false);
        setIsAuth(false);
        setIsAdmin(false);
        JwtService.destroyToken();
        Navigate('/auth/login')
        useCreateToastr({ status: true })
    }

    return { user, setUser, login, register, logout, isAdmin };
}
