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
    public function addProductToUserChart(Request $request, string $id, int $qty)
    {
        $user = User::find(auth()->user()->id ?? null);

        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $product = Products::findOrFail($id);

        if ($user->chart()->where('product_id', $product->id)->exists()) {
            $currentQuantity = $user->chart()->where('product_id', $product->id)->value('quantity');
            if ($currentQuantity + $qty > $product->stock) {
                return response()->json(['error' => 'There is not enough stock'], 400);
            }
            $user->chart()->updateExistingPivot($product->id, ['quantity' => DB::raw('quantity + ' . $qty)]);
        } else {
            if ($product->stock < 1) {
                return response()->json(['error' => 'There is not enough stock'], 400);
            }
            $user->chart()->attach($product->id, ['quantity' => 1]);
        }

        $product = $user->chart()->where('product_id', $product->id)->first();
        return response()->json(['message' => 'Product added to cart', 'product' => $product], 200);
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
            return response()->json(['message' => 'Product removed from cart'], 200);
        } else {
            return response()->json(['error' => 'The product is not in the users cart'], 404);
        }
    }

    /**
     * Remove product line from user's chart.
     */
    public function removeProductLineFromUserChart(Request $request, string $id)
    {
        $user = User::find(auth()->user()->id ?? null);

        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $product = Products::findOrFail($id);

        if ($user->chart()->where('product_id', $product->id)->exists()) {
            $user->chart()->detach($product->id);
            return response()->json(['message' => 'Product removed from cart'], 200);
        } else {
            return response()->json(['error' => 'The product is not in the users cart'], 404);
        }
    }
}
