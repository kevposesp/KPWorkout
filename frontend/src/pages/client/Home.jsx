import React from 'react';
import deliveryVan from '@/assets/images/icons/delivery-van.svg';
import moneyBack from '@/assets/images/icons/money-back.svg';
import serviceHours from '@/assets/images/icons/service-hours.svg';
import ListCategoriesHome from '@/components/client/lists/ListCategoriesHome';
import ListNewProducts from '@/components/client/lists/ListNewProducts';
import Menu from '@/components/client/Menu';
import { useNavigate } from 'react-router-dom';

const Home = () => {

  const navigate = useNavigate();

  return (
    <div className=''>
      <div className="relative w-full h-96 bg-cover bg-center" style={{ backgroundImage: "url('https://picsum.photos/1200/300/?blur')" }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold">¡Bienvenido a nuestra tienda!</h1>
            <p className="mt-4 text-lg">Explora nuestras últimas ofertas</p>
            <button className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600" onClick={() => navigate('/shop')}>Ver ofertas</button>
          </div>
        </div>
      </div>

      {/* <!-- Menú principal --> */}
      <Menu />

      <div className="container mx-auto my-3 px-3 sm:px-6">

        {/* <!-- features --> */}
        <div className="container py-16">
          <div className="w-10/12 grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto justify-center">
            <div className="border border-primary rounded-sm px-3 py-6 flex justify-center items-center gap-5">
              <img src={deliveryVan} alt="Delivery" className="w-12 h-12 object-contain" />
              <div>
                <h4 className="font-medium capitalize text-lg">Free Shipping</h4>
                <p className="text-gray-500 text-sm">Order over $200</p>
              </div>
            </div>
            <div className="border border-primary rounded-sm px-3 py-6 flex justify-center items-center gap-5">
              <img src={moneyBack} alt="Delivery" className="w-12 h-12 object-contain" />
              <div>
                <h4 className="font-medium capitalize text-lg">Money Rturns</h4>
                <p className="text-gray-500 text-sm">30 days money returs</p>
              </div>
            </div>
            <div className="border border-primary rounded-sm px-3 py-6 flex justify-center items-center gap-5">
              <img src={serviceHours} alt="Delivery" className="w-12 h-12 object-contain" />
              <div>
                <h4 className="font-medium capitalize text-lg">24/7 Support</h4>
                <p className="text-gray-500 text-sm">Customer support</p>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- ./features --> */}

        <ListCategoriesHome />

        <ListNewProducts />

      </div>
    </div>
  );
};

export default Home;
