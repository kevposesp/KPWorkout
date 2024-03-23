<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class ImageUploadController extends Controller
{

    public function store(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048'
        ]);

        try {
            $imageName = time() . '.' . $request->image->extension();
            $request->image->move(public_path('uploads/user'), $imageName);

            $imagePath = 'uploads/' . $imageName;


            $user = auth()->user();
            $user = User::find($user->id);

            // Delete previous image
            if ($user->image_url) {
                $image_path = public_path($user->image_url);
                if (file_exists($image_path)) {
                    unlink($image_path);
                }
            }

            $imagePath = 'uploads/user/' . $imageName;

            $user->image_url = $imagePath;
            $user->save();


            return response()->json([
                'success' => 'Image uploaded successfully.',
                'image_url' => asset($imagePath)
            ]);
        } catch (\Exception $e) {
            return response()->json([
                "status" => false,
                "message" => $e->getMessage()
            ], 500);
        }
    }
}
