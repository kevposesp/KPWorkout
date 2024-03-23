import { useCallback, useState } from "react"
import StripeService from "../services/StripeService";
import { useToastr } from "./useToastr";
import { useOrder } from "./useOrder";

export function useStripeHook() {

    const [clientSecret, setClientSecret] = useState('');
    const { useCreateToastr } = useToastr();
    const { orders, setOrders, getOrders } = useOrder();

    const useCreatePaymentIntent = useCallback(() => {
        StripeService.CreatePaymentIntent()
            .then(({ data, status }) => {
                if (status === 200) {
                    setClientSecret(data.client_secret);
                }
            })
            .catch(e => {
                useCreateToastr({ status: true, error: 'wrong', message: e.response.data.error})
                console.error(e);
            });
    }, [])

    const useCreateCharge = useCallback((res, orderData) => {
        StripeService.Charge({ payment_intent_id: res, orderData })
            .then(({ data, status }) => {
                if (status === 200) {
                    getOrders()
                    useCreateToastr({ status: true })
                }
            })
            .catch(e => {
                useCreateToastr({ status: true, error: 'wrong', message: e.response.data.error})
                console.error(e);
            });
    }, [])

    return {
        clientSecret,
        setClientSecret,
        useCreatePaymentIntent,
        useCreateCharge
    }
}