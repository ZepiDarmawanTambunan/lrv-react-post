<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;

class RegisterController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name'      => 'required',
            'email'     => 'required|email|unique:users',
            'password'  => 'required|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $user = User::create([
            'name'      => $request->name,
            'email'     => $request->email,
            'password'  => bcrypt($request->password),
        ]);

        if (!$token = JWTAuth::attempt(['email' => $user->email, 'password' => $request->password])) {
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan',
            ], 401);
        }

        return response()->json([
            'success'       => true,
            'user'          => $user,
            'access_token'  => $token,
            'token_type'    => 'bearer',
        ], 201);
    }
}



