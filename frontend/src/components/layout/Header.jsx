import { Avatar, Dropdown, Navbar } from 'flowbite-react';
import './Header.scss'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

function Header() {

    const Navigate = useNavigate();
    const { user, logout } = useAuth();

    const redirects = {
        home: () => Navigate('/home'),
        shop: () => Navigate('/shop'),
        dashboard: () => Navigate('/admin/dashboard'),
        contact: () => Navigate('/contactus'),
        profile: () => Navigate('/profile'),
        login: () => Navigate('/auth/login'),
    }

    return (
        <Navbar fluid rounded>
            <Navbar.Brand>
                {/* <img src="/favicon.svg" className="mr-3 h-6 sm:h-9" alt="TrailBlaze Logo" /> */}
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white cursor-pointer" onClick={redirects.home}>KP WorkOut</span>
            </Navbar.Brand>
            <div className="flex md:order-2">
                {Object.entries(user).length > 0 ? (
                    <Dropdown
                        arrowIcon={false}
                        inline
                        label={
                            <div>
                                <Avatar alt="User settings" img={user.image_url} rounded />
                                {user.unread_notifications > 0 && (
                                    <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-0 mt-1 -end-0 me-1 dark:border-gray-900">{user.unread_notifications}</div>
                                )}
                            </div>
                        }
                    >
                        <Dropdown.Header>
                            <span className="block text-sm">{user.name}</span>
                        </Dropdown.Header>
                        {user.type === "admin" && <Dropdown.Item onClick={redirects.dashboard}>Dashboard</Dropdown.Item>}
                        <Dropdown.Item onClick={redirects.profile}>Profile</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={() => logout()}>Sign out</Dropdown.Item>
                    </Dropdown>
                ) : (
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={redirects.login}>Login</button>
                )}
                <Navbar.Toggle />
            </div>
            <Navbar.Collapse>
                <Navbar.Link onClick={redirects.home} active>
                    Home
                </Navbar.Link>
                <Navbar.Link onClick={redirects.shop}>Shop</Navbar.Link>
                <Navbar.Link onClick={redirects.contact}>Contact</Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Header;