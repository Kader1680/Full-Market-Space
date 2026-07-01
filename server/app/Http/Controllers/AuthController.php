<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name'     => 'required|string|max:100',
            'email'    => 'required|email',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = User::create([
            'name'     => $request->name,
            'email'    => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $token = JWTAuth::fromUser($user);

        return response()->json([
            'status' => 201,
            'message' => 'Registration successful',
            'token'   => $token,
            'user'    => $user,
        ], 201);
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email'    => 'required|email',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $credentials = $request->only('email', 'password');

        if (!$token = auth('api')->attempt($credentials)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        return response()->json([
            'status' => 200,
            'message' => 'Login successful',
            'token' => $token,
            'user' => auth('api')->user()
        ])->cookie(
            'auth_token',
            $token,
            60 * 24, // minutes
            '/',
            null,
            app()->environment('production'),
            true, // httpOnly
            false,
            'Lax'
        );
        }

    public function logout()
    {
        auth('api')->logout();
        return response()
        ->json(['message' => 'Logged out'])
        ->cookie('auth_token', '', -1);
    }

    public function profile()
    {
    return response()->json([
            'user' => auth('api')->user()
        ]);
    }

    public function costumerscount()
    {
        
        $users = User::where("role", "user")->count();
        $customers = User::with("orders")->get();

        return response()->json([
            'users' => $users, 
            'customers' => $customers 
        ]);
    
    }


    public function index()
    {
        User::all();
        return response()->json([
            'users' => User::all()
        ]);
        
    }

}
