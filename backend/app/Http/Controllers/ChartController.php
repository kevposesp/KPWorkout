<?php

namespace App\Http\Controllers;

use App\Models\Products;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ChartController extends Controller
{
    /**
     * Add product from user's chart.
     */
    public function addProductToUserChart(Request $request, string $id)
    {
        $user = User::find(auth()->user()->id ?? null);

        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $product = Products::findOrFail($id);

        if ($user->chart()->where('product_id', $product->id)->exists()) {
            $user->chart()->updateExistingPivot($product->id, ['quantity' => DB::raw('quantity + 1')]);
        } else {
            $user->chart()->attach($product->id, ['quantity' => 1]);
        }

        $product = $user->chart()->where('product_id', $product->id)->first();
        return response()->json(['message' => 'Producto añadido al carrito', 'product' => $product], 200);
    }

    /**
     * Remove product from user's chart.
     */
    public function removeProductFromUserChart(Request $request, string $id)
    {
        $user = User::find(auth()->user()->id ?? null);

        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $product = Products::findOrFail($id);

        if ($user->chart()->where('product_id', $product->id)->exists()) {
            $currentQuantity = $user->chart()->where('product_id', $product->id)->value('quantity');
            if ($currentQuantity > 1) {
                $user->chart()->where('product_id', $product->id)->decrement('quantity');
            } else {
                $user->chart()->detach($product->id);
            }
            return response()->json(['message' => 'Producto eliminado del carrito'], 200);
        } else {
            return response()->json(['error' => 'El producto no está en el carrito del usuario'], 404);
        }
    }
}
