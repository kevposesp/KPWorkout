import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { Button } from 'flowbite-react';
import { useToastr } from '@/hooks/useToastr';
import { useAuth } from '@/hooks/useAuth';
import secrets from '@/secrets';

export default function ContactUs() {
    const form = useRef();
    const { useCreateToastr } = useToastr();
    const { user } = useAuth();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm(secrets.EMAILJS.SERVICE_ID, secrets.EMAILJS.TEMPLATE_ID, form.current, {
                publicKey: secrets.EMAILJS.PUBLIC_KEY,
            })
            .then(
                () => {
                    useCreateToastr({ status: true , message: 'Email sent successfully'})
                    form.current.reset();
                },
                (error) => {
                    console.log('FAILED...', error.text);
                    useCreateToastr({ status: true, error: 'error', message: 'Email failed to send'})
                },
            );
    };

    return (

        <section className="bg-white dark:bg-gray-900">
            <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">Contact Us</h2>
                <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">Got a technical issue? Want to send feedback about a beta feature? Need details about our Business plan? Let us know.</p>
                <form ref={form} onSubmit={sendEmail} className="space-y-8">
                    <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your name</label>
                        <input type="text" id="name" name='user_name' defaultValue={user.name} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" disabled required />
                    </div>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
                        <input type="email" id="email" name='user_email' defaultValue={user.email} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" disabled required />
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Your message</label>
                        <textarea id="message" name='message' rows="6" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Leave a comment..."></textarea>
                    </div>
                    <Button color="blue" type='submit'>Send Message</Button>
                </form>
            </div>
        </section>
    );
};