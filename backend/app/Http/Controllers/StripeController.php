<?php

namespace App\Http\Controllers;

use App\Models\Orders;
use App\Models\User;
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
        $chart = auth()->user()->chart;

        $totalAmount = 0;

        foreach ($chart as $product) {
            $totalAmount += $product->price * $product->pivot->quantity;
        }

        $intent = \Stripe\PaymentIntent::create([
            'amount' => $totalAmount * 100,
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

        if ($intent->status == 'succeeded') {
            $order = new Orders();
            $order->fill($request->orderData);
            $order->user_id = auth()->id();
            $order->save();

            $chart = auth()->user()->chart;

            foreach ($chart as $product) {
                $order->products()->attach($product->id, ['quantity' => $product->pivot->quantity]);
                $product->stock -= $product->pivot->quantity;
                $product->save();
            }

            $user = User::find(auth()->id());
            $user->chart()->detach($chart);

            return response()->json($order, 200);
        }

        return response()->json(['payment_intent' => $intent]);
    }
}
