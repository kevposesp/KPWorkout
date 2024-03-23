<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class ImageUploadController extends Controller
{

    public function store(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'type' => 'required|string'
        ]);

        $imageName = time() . '.' . $request->image->extension();
        $request->image->move(public_path('uploads'), $imageName);

        $imagePath = 'uploads/' . $imageName;

        if ($request->type == 'user') {
            $user = auth()->user();
            $user = User::find($user->id);

            $request->image->move(public_path('uploads/user'), $imageName);
            $imagePath = 'uploads/user/' . $imageName;

            $user->image_url = $imagePath;
            $user->save();
        }

        return response()->json([
            'success' => 'Imagen cargada con éxito.'
        ]);
    }

}
