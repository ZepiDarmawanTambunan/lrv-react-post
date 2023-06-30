<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index(Request $request)
    {
        try {
            $query = $request->input('query');
            $users = User::latest();

            if($query){
                $users->where('name', 'like', '%'.$query.'%')
                ->orWhere('email', 'like', '%'.$query.'%');
            }

            $users->whereNotIn('id', [auth()->id()]);

            return new UserResource(true, 'List Data users', $users->paginate(5));
        } catch (\Throwable $error) {
            return new UserResource(false, 'Data Users Gagal ditemukan!', $error->getMessage());
        }
    }

    public function store(StorePostRequest $request)
    {

    }

    public function show($id)
    {

    }

    public function update(UpdatePostRequest $request, $id)
    {

    }

    public function destroy($id)
    {

    }
}
