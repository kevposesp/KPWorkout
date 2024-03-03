<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Orders;
use App\Models\User;

class OrdersController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $orders = Orders::all();
        return response()->json($orders, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'first_name' => 'required',
            'last_name' => 'required',
            'country' => 'required',
            'address' => 'required',
            'city' => 'required',
            'phone' => 'required',
            'email' => 'required'
        ]);

        $userId = auth()->id();

        if ($userId) {
            $order = new Orders();
            $order->fill($request->all());
            $order->user_id = $userId;
            $order->save();

            $chart = auth()->user()->chart;

            foreach ($chart as $product) {
                $order->products()->attach($product->id, ['quantity' => $product->pivot->quantity]);
            }

            $user = User::find($userId);
            $user->chart()->detach($chart);

            return response()->json($order, 201);
        } else {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id)
    {
        $order = Orders::with('products')->findOrFail($id);
        return response()->json($order, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, int $id)
    {
        $request->validate([
            'status' => 'required'
        ]);

        $order = Orders::findOrFail($id);
        $order->update($request->all());

        return response()->json($order, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        $order = Orders::findOrFail($id);
        $order->delete();

        return response()->json(null, 204);
    }

}
