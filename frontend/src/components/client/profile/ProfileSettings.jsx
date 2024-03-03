import React from 'react';

const ProfileSettings = ({ user }) => {
    return (
        <div className='col-span-9'>
            <h1>Profile Settings</h1>
            <div className="col-span-9 grid grid-cols-3 gap-4">

                <div className="shadow rounded bg-white px-4 pt-6 pb-8">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-medium text-gray-800 text-lg">Personal Profile</h3>
                        <a href="#" className="text-primary">Edit</a>
                    </div>
                    <div className="space-y-1">
                        <h4 className="text-gray-700 font-medium">{user.name}</h4>
                        <p className="text-gray-800">{user.email}</p>
                        <p className="text-gray-800">{user.phone}</p>
                    </div>
                </div>

                <div className="shadow rounded bg-white px-4 pt-6 pb-8">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-medium text-gray-800 text-lg">Shipping address</h3>
                        <a href="#" className="text-primary">Edit</a>
                    </div>
                    <div className="space-y-1">
                        <h4 className="text-gray-700 font-medium">{user.shipping_name || user.name}</h4>
                        <p className="text-gray-800">{user.shipping_address || 'No hay direccion guardada'}</p>
                        <p className="text-gray-800">{user.shipping_postalcode || 'No hay codigo postal guardado'}</p>
                        <p className="text-gray-800">{user.shipping_phone || user.phone || 'No hay telefono guardado'}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileSettings;
