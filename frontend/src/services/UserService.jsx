import Api from './Api';

const UserService = {

    LoginUser(data) {
        return Api().post('login', data);
    },

    RegisterUser(data) {
        return Api().post('register', data);
    },

    GetUser() {
        return Api().get('profile');
    },

    LogOut() {
        return Api().get('logout');
    }

}

export default UserService;