<?php

namespace App\Http\Controllers;

use App\Models\Categories;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CategoriesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Categories::with('childrenCategories')
            ->whereNull('parent_id')
            ->get();

        return response()->json($categories, 200);
    }

    /**
     * Display all categories with parent if exists.
     */
    public function allCategories()
    {
        $categories = Categories::with('parentCategory')->get();
        return response()->json($categories, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'description' => 'required',
            'image' => 'required'
        ]);

        // Check if the category has a parent
        $parent_id = $request->input('parent_id');
        if ($parent_id) {
            // Check if the parent category exists and is a leaf
            $parentCategory = Categories::findOrFail($parent_id);
            if (!$parentCategory->is_leaf) {
                return response()->json(['message' => 'Cannot create a subcategory under a non-leaf category'], 422);
            }
            $request['is_leaf'] = 0;
        }

        $request['slug'] = Str::slug($request->title);

        // Crear la categoría
        $category = Categories::create($request->all());

        return response()->json($category, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $category = Categories::with('childrenCategories')->findOrFail($id);
        return response()->json($category, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'title' => 'required',
            'description' => 'required',
            'image' => 'required'
        ]);

        $parent_id = $request->input('parent_id');

        if ($parent_id) {
            $parentCategory = Categories::findOrFail($parent_id);
            if (!$parentCategory->is_leaf) {
                return response()->json(['message' => 'Cannot create a subcategory under a non-leaf category'], 422);
            }
            $request['is_leaf'] = 0;
        } else {
            $request['is_leaf'] = 1;
            $request['parent_id'] = null;
        }

        $category = Categories::findOrFail($id);
        $category->update($request->all());

        return response()->json($category, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $category = Categories::findOrFail($id);

        // Verificar si la categoría tiene subcategorías
        if ($category->childrenCategories()->exists()) {
            return response()->json(['message' => 'Cannot delete a category with subcategories'], 422);
        }

        $category->products()->detach();

        $category->delete();

        return response()->json(null, 204);
    }

    /**
     * Add or remove a product from the category.
     */
    public function updateProduct(Request $request, string $id)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id'
        ]);

        $category = Categories::findOrFail($id);
        $product_id = $request->product_id;

        // Verificar si la relación ya existe
        if ($category->products()->where('products.id', $product_id)->exists()) {
            // Si la relación existe, la eliminamos
            $category->products()->detach($product_id);
            return response()->json(['message' => 'El producto fue eliminado de la categoría'], 200);
        }

        // Si la relación no existe, la agregamos
        $category->products()->attach($product_id);
        return response()->json(['message' => 'El producto fue agregado a la categoría'], 200);
    }
}
