import React, { useState } from "react";
import { Button, Label, TextInput } from 'flowbite-react';
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const Register = () => {

    const { register } = useAuth();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    function sendData() {
        let user = {
            name: name,
            email: email,
            password: password,
            password_confirmation: password2
        }

        if (password !== password2) {
            console.log("Passwords do not match");
            return;
        }

        register(user);

    }

    return (
        <>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Register new account
                            </h1>
                            <form className="flex max-w-md flex-col gap-4">
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="name" value="Your name" />
                                    </div>
                                    <TextInput id="name" type="text" placeholder="name" required shadow onChange={(event) => setName(event.target.value)}/>
                                </div>
                                
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="email" value="Your email" />
                                    </div>
                                    <TextInput id="email" type="email" placeholder="user@example.com" required shadow onChange={(event) => setEmail(event.target.value)}/>
                                </div>

                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="password" value="Your password" />
                                    </div>
                                    <TextInput id="password" type="password" required shadow onChange={(event) => setPassword(event.target.value)}/>
                                </div>
                                
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="password2" value="Repeat your password" />
                                    </div>
                                    <TextInput id="password2" type="password" required shadow onChange={(event) => setPassword2(event.target.value)} />
                                </div>

                                <Button type="button" className="mt-5" onClick={() => sendData()}>Register</Button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Do you already have an account?
                                    <Link to="/auth/login" className="ms-2 font-medium text-primary-600 hover:underline dark:text-primary-500">Sign In</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Register