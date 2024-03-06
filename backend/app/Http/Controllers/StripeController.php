<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class StripeController extends Controller
{

    // ApiKey
    public function __construct()
    {
        \Stripe\Stripe::setApiKey(env('STRIPE_SECRET'));
    }

    // Payment Intent

    public function createPaymentIntent(Request $request)
    {
        $intent = \Stripe\PaymentIntent::create([
            'amount' => 1000,
            'currency' => 'eur'
        ]);

        return response()->json(['client_secret' => $intent->client_secret]);
    }

    // Payment retrieve
    public function retrievePaymentIntent(Request $request)
    {
        $intent = \Stripe\PaymentIntent::retrieve(
            $request->payment_intent_id
        );

        return response()->json(['payment_intent' => $intent]);
    }
}
