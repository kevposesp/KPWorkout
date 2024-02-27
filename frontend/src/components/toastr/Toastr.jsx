import { Toast } from 'flowbite-react';
import { useContext } from 'react';
import { HiCheck, HiExclamation, HiX } from 'react-icons/hi';
import ToastrContext from '@/context/ToastrContext';

import './Toastr.scss'

function Toastr() {
    const { toastr, setToastr } = useContext(ToastrContext);

    const message = toastr.message ? toastr.message : 'Item moved successfully';
    return (
        <div className='toastr'>
            {toastr.status && (
                <div className="flex flex-col gap-4">
                    {!toastr.error && (
                        <Toast>
                            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
                                <HiCheck className="h-5 w-5" />
                            </div>
                            <div className="ml-3 text-sm font-normal">{message}</div>
                            <Toast.Toggle />
                        </Toast>
                    )}
                    {toastr.error == 'wrong' && (
                        <Toast>
                            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-500 dark:bg-orange-700 dark:text-orange-200">
                                <HiExclamation className="h-5 w-5" />
                            </div>
                            <div className="ml-3 text-sm font-normal">{toastr.message}</div>
                            <Toast.Toggle />
                        </Toast>
                    )}
                    {toastr.error == 'error' && (
                        <Toast>
                            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
                                <HiX className="h-5 w-5" />
                            </div>
                            <div className="ml-3 text-sm font-normal">{toastr.message}</div>
                            <Toast.Toggle />
                        </Toast>
                    )}
                </div>
            )}
        </div>
    );
}

export default Toastr