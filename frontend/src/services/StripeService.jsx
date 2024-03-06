import Api from './Api';

const StripeService = {


    CreatePaymentIntent() {
        return Api().post(`create-payment-intent`);
    },

    Charge(data) {
        return Api().post(`retrieve-payment`, data);
    }

}

export default StripeService;