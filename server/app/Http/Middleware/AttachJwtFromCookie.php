<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class AttachJwtFromCookie
{
    public function handle(Request $request, Closure $next)
    {
        // If the Authorization header is missing but our cookie exists, inject it
        if (!$request->headers->has('Authorization') && $request->hasCookie('auth_token')) {
            $token = $request->cookie('auth_token');
            $request->headers->set('Authorization', 'Bearer ' . $token);
        }

        return $next($request);
    }
}