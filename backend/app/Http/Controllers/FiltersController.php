<?php

namespace App\Http\Controllers;

use App\Models\Filters;
use Illuminate\Http\Request;

class FiltersController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $filters = Filters::with('products')->get();

        $filteredData = [];

        foreach ($filters as $filter) {
            $title = $filter->title;
            $name = $filter->name;
            $id = $filter->id;

            if (!isset($filteredData[$title])) {
                $filteredData[$title] = [];
            }

            $filteredData[$title][] = [
                'id' => $id,
                'name' => $name,
            ];
        }

        return response()->json($filteredData);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'name' => 'required'
        ]);

        $filter = Filters::create($request->all());

        return response()->json($filter, 201);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'title' => 'required',
            'name' => 'required'
        ]);

        $filter = Filters::findOrFail($id);
        $filter->update($request->all());

        return response()->json($filter, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $filter = Filters::findOrFail($id);
        $filter->delete();

        return response()->json(null, 204);
    }

    /**
     * Add or remove a product from a filter.
     */
    public function addOrRemoveProduct(Request $request, string $filterId, string $productId)
    {
        $filter = Filters::findOrFail($filterId);
        $product = $filter->products()->find($productId);

        if ($product) {
            $filter->products()->detach($productId);
            return response()->json(['message' => 'Product removed from filter'], 200);
        }

        $filter->products()->attach($productId);
        return response()->json(['message' => 'Product added to filter'], 200);
    }
}
