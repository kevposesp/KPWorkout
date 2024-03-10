<?php

namespace App\Http\Controllers;

use App\Models\Categories;
use App\Models\Products;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class ProductsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Products::all();

        // Obtener el usuario autenticado, si existe
        $user = User::find(auth()->user()->id ?? null);

        // Si el usuario está autenticado, obtener sus productos favoritos
        $favoriteProducts = $user ? $user->favoriteProducts()->pluck('product_id')->toArray() : [];

        // isFavotite
        $products->transform(function ($product) use ($favoriteProducts) {
            $product->is_favorite = in_array($product->id, $favoriteProducts);
            return $product;
        });

        return response()->json($products, 200);
    }

    /**
     * Display a listing of the resource.
     */
    public function indexA()
    {
        $products = Products::all();

        // Obtener el usuario autenticado, si existe
        $user = User::find(auth()->user()->id ?? null);

        // Si el usuario está autenticado, obtener sus productos favoritos
        $favoriteProducts = $user ? $user->favoriteProducts()->pluck('product_id')->toArray() : [];

        // isFavotite
        $products->transform(function ($product) use ($favoriteProducts) {
            $product->is_favorite = in_array($product->id, $favoriteProducts);
            return $product;
        });

        return response()->json($products, 200);
    }

    /**
     * All products with filters and pagination
     */
    public function allFiltered(Request $request)
    {
        $products = Products::query();

        // Filtrar por texto en nombre o descripción
        if ($request->has('text')) {
            $text = $request->input('text');
            $products->where(function ($query) use ($text) {
                $query->where('name', 'like', "%$text%")
                    ->orWhere('description', 'like', "%$text%");
            });
        }

        // Filtrar por rango de precio mínimo
        if ($request->has('minPrice')) {
            $minPrice = $request->input('minPrice');
            $products->where('price', '>=', $minPrice);
        }

        // Filtrar por rango de precio máximo
        if ($request->has('maxPrice')) {
            $maxPrice = $request->input('maxPrice');
            if ($maxPrice > 0) {
                $products->where('price', '<=', $maxPrice);
            }
        }

        // Filtrar por cantidad de stock mínimo
        if ($request->has('stock')) {
            $stock = $request->input('stock');
            $products->where('stock', '>=', $stock);
        }

        // Filtrar por categorías
        if ($request->has('categories')) {
            $categories = $request->input('categories');
            if ($categories && is_array($categories) && count($categories) > 0) {
                $categories = Categories::whereIn('id', $categories)->get()->pluck('id')->toArray();
                $categories = array_merge($categories, Categories::whereIn('parent_id', $categories)->get()->pluck('id')->toArray());
                $products->whereHas('categories', function ($query) use ($categories) {
                    $query->whereIn('categories.id', $categories);
                });
            }
        }

        // Filtrar por filtros
        if ($request->has('filters')) {
            $filters = $request->input('filters');
            if ($filters && is_array($filters) && count($filters) > 0) {
                $products->whereHas('filters', function ($query) use ($filters) {
                    $query->whereIn('filters.id', $filters);
                });
            }
        }

        // Filtrar cantidad de resultados
        if ($request->has('quantity')) {
            $quantity = $request->input('quantity');
            $products = $products->limit($quantity);
        }

        // Ordenar resultados
        if ($request->has('orderBy') && $request->has('order')) {
            $orderBy = $request->input('orderBy');
            if ($orderBy != '') {
                $order = $request->input('order') === 'desc' ? 'desc' : 'asc';
                $products->orderBy($orderBy, $order);
            }
        }

        // Excluir product id
        if ($request->has('exclude')) {
            $exclude = $request->input('exclude');
            $products->where('id', '!=', $exclude);
        }


        // Obtener el usuario autenticado, si existe
        $user = User::find(auth()->user()->id ?? null);

        // Si el usuario está autenticado, obtener sus productos favoritos
        $favoriteProducts = $user ? $user->favoriteProducts()->pluck('product_id')->toArray() : [];

        // Modificar los resultados para incluir información sobre si son favoritos o no
        $products = $products->get()->map(function ($product) use ($favoriteProducts) {
            $product->is_favorite = in_array($product->id, $favoriteProducts);
            return $product;
        });

        return response()->json($products, 200);
    }

    /**
     * All products with filters and pagination
     */
    public function allFilteredA(Request $request)
    {
        $products = Products::query();

        // Filtrar por texto en nombre o descripción
        if ($request->has('text')) {
            $text = $request->input('text');
            $products->where(function ($query) use ($text) {
                $query->where('name', 'like', "%$text%")
                    ->orWhere('description', 'like', "%$text%");
            });
        }

        // Filtrar por rango de precio mínimo
        if ($request->has('minPrice')) {
            $minPrice = $request->input('minPrice');
            $products->where('price', '>=', $minPrice);
        }

        // Filtrar por rango de precio máximo
        if ($request->has('maxPrice')) {
            $maxPrice = $request->input('maxPrice');
            if ($maxPrice > 0) {
                $products->where('price', '<=', $maxPrice);
            }
        }

        // Filtrar por cantidad de stock mínimo
        if ($request->has('stock')) {
            $stock = $request->input('stock');
            $products->where('stock', '>=', $stock);
        }

        // Filtrar por categorías
        if ($request->has('categories')) {
            $categories = $request->input('categories');
            if ($categories && is_array($categories) && count($categories) > 0) {
                $categories = Categories::whereIn('id', $categories)->get()->pluck('id')->toArray();
                $categories = array_merge($categories, Categories::whereIn('parent_id', $categories)->get()->pluck('id')->toArray());
                $products->whereHas('categories', function ($query) use ($categories) {
                    $query->whereIn('categories.id', $categories);
                });
            }
        }

        // Filtrar por filtros
        if ($request->has('filters')) {
            $filters = $request->input('filters');
            if ($filters && is_array($filters) && count($filters) > 0) {
                $products->whereHas('filters', function ($query) use ($filters) {
                    $query->whereIn('filters.id', $filters);
                });
            }
        }

        // Filtrar cantidad de resultados
        if ($request->has('quantity')) {
            $quantity = $request->input('quantity');
            $products = $products->limit($quantity);
        }

        // Ordenar resultados
        if ($request->has('orderBy') && $request->has('order')) {
            $orderBy = $request->input('orderBy');
            if ($orderBy != '') {
                $order = $request->input('order') === 'desc' ? 'desc' : 'asc';
                $products->orderBy($orderBy, $order);
            }
        }

        // Excluir product id
        if ($request->has('exclude')) {
            $exclude = $request->input('exclude');
            $products->where('id', '!=', $exclude);
        }

        // Obtener el usuario autenticado, si existe
        $user = User::find(auth()->user()->id ?? null);

        // Si el usuario está autenticado, obtener sus productos favoritos
        $favoriteProducts = $user ? $user->favoriteProducts()->pluck('product_id')->toArray() : [];

        // Modificar los resultados para incluir información sobre si son favoritos o no
        $products = $products->get()->map(function ($product) use ($favoriteProducts) {
            $product->is_favorite = in_array($product->id, $favoriteProducts);
            return $product;
        });

        return response()->json($products, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'description' => 'required',
            'price' => 'required|numeric',
            'stock' => 'required|integer',
            'images' => 'required|array',
        ]);

        $request['slug'] = Str::slug($request->name);

        $product = Products::create($request->all());

        foreach ($request->images as $image) {
            $product->images()->create(['image' => $image]);
        }

        return response()->json($product, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $product = Products::findOrFail($id);

        // Obtener el usuario autenticado, si existe
        $user = User::find(auth()->user()->id ?? null);

        // Si el usuario está autenticado, obtener sus productos favoritos
        $favoriteProducts = $user ? $user->favoriteProducts()->pluck('product_id')->toArray() : [];

        // Modificar el resultado para incluir información sobre si es favorito o no
        $product->is_favorite = in_array($product->id, $favoriteProducts);

        // Devolver categorias
        $product->categories = $product->categories()->get();

        return response()->json($product, 200);
    }

    /**
     * Display the specified resource.
     */
    public function showA(string $id)
    {
        $product = Products::findOrFail($id);
        return response()->json($product, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'name' => 'required',
            'description' => 'required',
            'price' => 'required|numeric',
            'stock' => 'required|integer'
        ]);

        $product = Products::findOrFail($id);
        $product->update($request->all());

        // Comprobar si hay imágenes para actualizar
        if ($request->has('images')) {
            // Eliminar las imágenes anteriores
            $product->images()->delete();

            // Agregar las nuevas imágenes
            foreach ($request->images as $image) {
                $product->images()->create(['image' => $image]);
            }
        }

        return response()->json($product, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $product = Products::findOrFail($id);
        $product->delete();

        return response()->json(null, 204);
    }

    /**
     * Add or remove a category from the product.
     */
    public function updateCategory(Request $request, string $id)
    {
        $request->validate([
            'category_id' => 'required|exists:categories,id'
        ]);

        $product = Products::findOrFail($id);
        $category_id = $request->category_id;

        // Verificar si la relación ya existe
        if ($product->categories()->where('categories.id', $category_id)->exists()) {
            // Si la relación existe, la eliminamos
            $product->categories()->detach($category_id);
            return response()->json(['message' => 'La categoría fue eliminada del producto'], 200);
        }

        // Si la relación no existe, la agregamos
        $product->categories()->attach($category_id);
        return response()->json(['message' => 'La categoría fue agregada al producto'], 200);
    }

    /**
     * Add or remove a product from user's favorites.
     */
    public function toggleFavorite(Request $request, string $id)
    {
        // Obtener el usuario autenticado
        $user = User::find(auth()->user()->id ?? null);


        // Verificar si el usuario está autenticado
        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $product = Products::findOrFail($id);

        // Verificar si el producto ya está en favoritos del usuario
        if ($user->favoriteProducts()->where('product_id', $product->id)->exists()) {
            // Si el producto está en favoritos, lo eliminamos
            $user->favoriteProducts()->detach($product->id);
            return response()->json(['message' => 'Producto eliminado de favoritos'], 200);
        } else {
            // Si el producto no está en favoritos, lo agregamos
            $user->favoriteProducts()->attach($product->id);
            return response()->json(['message' => 'Producto agregado a favoritos'], 200);
        }
    }
}
