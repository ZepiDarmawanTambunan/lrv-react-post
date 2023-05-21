<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;

class LoginController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'email' => 'required',
            'password' => 'required'
        ]);

        if($validator->fails()){
            return response()->json($validator->errors(), 422);
        }

        $credentials = $request->only('email', 'password');
        // if(! $token = auth()->attempt($credentials)){
        //     return response()->json([
        //         'success' => false,
        //         'message' => 'Email atau password anda salah'
        //     ], 401);
        // }

        if(! $token = JWTAuth::attempt($credentials)){
            return response()->json([
                'success' => false,
                'message' => 'Email atau password anda salah'
            ], 401);
        }

        return response()->json([
            'success' => true,
            'user' => auth()->user(),
            'access_token' => $token,
            'token_type' => 'bearer',
        ], 201);
    }
}
