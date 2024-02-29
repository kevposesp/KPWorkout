<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class CheckJWTAuth
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next)
    {
        // Verificar si el usuario está autenticado con JWT
        $user = Auth::guard('api')->user();

        // Devolver el objeto usuario si está autenticado, o false si no lo está
        return $user ? $user : false;
    }
}
