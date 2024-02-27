import { Avatar, Dropdown, Navbar } from 'flowbite-react';
import './Header.scss'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

function Header() {

    const Navigate = useNavigate();
    const { user, logout } = useAuth();

    const redirects = {
        home: () => Navigate('/home'),
        stations: () => Navigate('/admin/dashboard/stations'),
        admin: () => Navigate('/admin'),
        contact: () => Navigate('/contactus'),
        profile: () => Navigate('/profile'),
        pricing: () => Navigate('/pricing'),
        login: () => Navigate('/auth/login'),

    }

    return (
        <Navbar fluid rounded>
            <Navbar.Brand>
                {/* <img src="/favicon.svg" className="mr-3 h-6 sm:h-9" alt="TrailBlaze Logo" /> */}
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white cursor-pointer" onClick={redirects.home}>TrailBlaze</span>
            </Navbar.Brand>
            <div className="flex md:order-2">
                {Object.entries(user).length > 0 ? (
                    <Dropdown
                        arrowIcon={false}
                        inline
                        label={
                            <div>
                                <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
                                {user.unread_notifications > 0 && (
                                    <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-0 mt-1 -end-0 me-1 dark:border-gray-900">{user.unread_notifications}</div>
                                )}
                            </div>
                        }
                    >
                        <Dropdown.Header>
                            <span className="block text-sm">{user.name}</span>
                        </Dropdown.Header>
                        {user.type === "admin" && <Dropdown.Item onClick={redirects.admin}>Dashboard</Dropdown.Item>}
                        <Dropdown.Item>Settings</Dropdown.Item>
                        <Dropdown.Item onClick={redirects.profile}>Profile</Dropdown.Item>
                        <Dropdown.Item>Earnings</Dropdown.Item>
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
                <Navbar.Link href="#">About</Navbar.Link>
                <Navbar.Link href="#">Services</Navbar.Link>
                <Navbar.Link onClick={redirects.pricing}>Pricing</Navbar.Link>
                <Navbar.Link onClick={redirects.contact}>Contact</Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Header;