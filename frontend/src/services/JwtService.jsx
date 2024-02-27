const JwtService = {

    destroyToken: () => localStorage.removeItem('jwt'),

    saveToken: (token) => {
        localStorage.setItem('jwt', token)
    },

    getToken: () => localStorage.getItem('jwt')
}

export default JwtService;