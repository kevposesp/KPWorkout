<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    // User Register (POST, formdata)
    public function register(Request $request)
    {

        try {
            $request->validate([
                "name" => "required",
                "email" => "required|email|unique:users",
                "password" => "required|confirmed"
            ]);

            // User Model
            User::create([
                "name" => $request->name,
                "email" => $request->email,
                "password" => Hash::make($request->password),
                "type" => "client"
            ]);

            // Response
            return response()->json([
                "status" => true,
                "message" => "User registered successfully"
            ]);
        } catch (\Exception $e) {
            return response()->json([
                "status" => false,
                "message" => $e->getMessage()
            ], 500);
        }
    }

    // User Login (POST, formdata)
    public function login(Request $request)
    {

        try {
            $request->validate([
                "email" => "required|email",
                "password" => "required"
            ]);

            // JWTAuth
            $token = JWTAuth::attempt([
                "email" => $request->email,
                "password" => $request->password
            ]);

            if (!empty($token)) {

                return response()->json([
                    "status" => true,
                    "message" => "User logged in succcessfully",
                    "token" => $token
                ]);
            }

            return response()->json([
                "status" => false,
                "message" => "Invalid credentials"
            ], 500);
        } catch (\Exception $e) {
            return response()->json([
                "status" => false,
                "message" => $e->getMessage()
            ], 500);
        }
    }

    // User Profile (GET)
    public function profile()
    {

        $userdata = auth()->user();

        return response()->json([
            "status" => true,
            "message" => "Profile data",
            "data" => $userdata
        ]);
    }

    // User Logout (GET)
    public function logout()
    {

        auth()->logout();

        return response()->json([
            "status" => true,
            "message" => "User logged out successfully"
        ]);
    }
}
