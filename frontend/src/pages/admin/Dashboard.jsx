import React from 'react';
import { Card } from 'flowbite-react';
import ListCardsCategory from '@/components/admin/Category/ListCardsCategory';
import ListCardsProduct from '@/components/admin/Products/ListCardsProducts';

const Dashboard = () => {

    return (
        <div className='container mx-auto my-3 mt-10'>
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                Dashboard
            </h1>

            <hr className="my-12 h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50" />
            <Card className='h-auto'>
                <ListCardsCategory settingsList={{title: true}} />
                <hr className="my-12 h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50" />
                <ListCardsProduct settingsList={{title: true}} />
            </Card>
        </div>
    );
};

export default Dashboard;
