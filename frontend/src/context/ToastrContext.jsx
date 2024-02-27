import React, { useState, useEffect } from 'react'

const Context = React.createContext({})

export function ToastrContext({ children }) {
    const [toastr, setToastr] = useState([])

    useEffect(function () {
        setToastr({ status: false })
    }, [setToastr]);

    return <Context.Provider value={{ toastr, setToastr }}>
        {children}
    </Context.Provider>
}

export default Context