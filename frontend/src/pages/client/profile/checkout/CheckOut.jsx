import React, { useState } from 'react';
import '@/assets/css/template.scss';
import { useChart } from '@/hooks/useChart';
import { useNavigate } from 'react-router-dom';

const CheckOut = () => {

    const { productsChart } = useChart();
    const navigate = useNavigate()

    console.log(productsChart);
    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [country, setCountry] = useState('')

    return (
        <div className="container m-auto grid grid-cols-12 items-start pb-16 pt-4 gap-6">

            <div className="col-span-12">
                <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
                    CheckOut
                </h1>
            </div>
            {/* <div className="col-span-12">
                <div className="flex items-center space-x-2">
                    <a href="#" className="text-primary">Home</a>
                    <span className="text-gray-400">/</span>
                    <p>Checkout</p>
                </div>
            </div> */}


            <div className="temp container m-auto grid grid-cols-12 items-start pb-16 pt-4 gap-6 col-span-12">
                <div className="col-span-8 border border-gray-200 p-4 rounded">
                    <h3 className="text-lg font-medium capitalize mb-4">Checkout</h3>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="first-name" className="text-gray-600">First Name <span
                                    className="text-primary">*</span></label>
                                <input type="text" name="first-name" id="first-name" className="input-box" onChange={(event) => setName(event.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="last-name" className="text-gray-600">Last Name <span
                                    className="text-primary">*</span></label>
                                <input type="text" name="last-name" id="last-name" className="input-box" onChange={(event) => setLastName(event.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="region" className="text-gray-600">Country</label>
                            <input type="text" name="region" id="region" className="input-box" onChange={(event) => setCountry(event.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="address" className="text-gray-600">Street address</label>
                            <input type="text" name="address" id="address" className="input-box" onChange={(event) => setAddress(event.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="city" className="text-gray-600">City</label>
                            <input type="text" name="city" id="city" className="input-box" onChange={(event) => setCity(event.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="phone" className="text-gray-600">Phone number</label>
                            <input type="text" name="phone" id="phone" className="input-box" onChange={(event) => setPhone(event.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="email" className="text-gray-600">Email address</label>
                            <input type="email" name="email" id="email" className="input-box" onChange={(event) => setEmail(event.target.value)} />
                        </div>
                    </div>

                </div>

                <div className="col-span-4 border border-gray-200 p-4 rounded">
                    <h4 className="text-gray-800 text-lg mb-4 font-medium uppercase">order summary</h4>
                    <div className="space-y-2">
                        {productsChart.length === 0 ? <p className="text-gray-600">No products in the cart</p> : productsChart.map(product => (
                            <div className="flex justify-between" key={product.id}>
                                <div className='w-60'>
                                    <h5 className="text-gray-800 font-medium">{product.name}</h5>
                                    {/* <p className="text-sm text-gray-600">Size: M</p> */}
                                </div>
                                <p className="text-gray-600">
                                    x{product.pivot.quantity}
                                </p>
                                <p className="text-gray-800 font-medium">{product.price}</p>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-between border-b border-gray-200 mt-1 text-gray-800 font-medium py-3 uppercas">
                        <p>subtotal</p>
                        <p>{productsChart.reduce((a, o) => a + (o.price * o.pivot.quantity), 0)} €</p>
                    </div>

                    <div className="flex justify-between border-b border-gray-200 mt-1 text-gray-800 font-medium py-3 uppercas">
                        <p>shipping</p>
                        <p>8.00 €</p>
                    </div>

                    <div className="flex justify-between text-gray-800 font-medium py-3 uppercas">
                        <p className="font-semibold">Total</p>
                        <p>{productsChart.reduce((a, o) => a + (o.price * o.pivot.quantity), 0) + 8} €</p>
                    </div>

                    <div className="flex items-center mb-4 mt-2">
                        <input type="checkbox" name="aggrement" id="aggrement"
                            className="text-primary focus:ring-0 rounded-sm cursor-pointer w-3 h-3" />
                        <label htmlFor="aggrement" className="text-gray-600 ml-3 cursor-pointer text-sm">I agree to the <a 
                            className="text-primary">terms & conditions</a></label>
                    </div>

                    <a onClick={() => navigate('payment')}
                        className="block w-full py-3 px-4 text-center text-white bg-primary border border-primary rounded-md hover:bg-transparent hover:text-primary transition font-medium">Place
                        order</a>
                </div>
            </div>
        </div>
    );
};

export default CheckOut;
