<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\ApiResource;
use App\Models\User;
use Exception;
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

            return new ApiResource(true, 'List Data users', $users->paginate(5));
        } catch (\Throwable $error) {
            return new ApiResource(false, 'Data Users Gagal ditemukan!', $error->getMessage());
        }
    }

    public function store(StoreUserRequest $request)
    {
        try {
            $requestData = $request->validated();
            $post = User::create($requestData);
            if (!$post) {
                throw new Exception('Data Post Gagal Ditambahkan!');
            }
            return new ApiResource(true, 'Data User Berhasil Ditambahkan!', $post);
        } catch (\Throwable $error) {
            return new ApiResource(false, 'Data User Gagal Ditambahkan!', $error->getMessage());
        }
    }

    public function show(User $user)
    {
        try {
            if(!$user){
                return new ApiResource(false, 'Data User Tidak ditemukan!', []);
            }
            return new ApiResource(true, 'Detail Data User!', $user);
        } catch (\Throwable $error) {
            return new ApiResource(false, 'Data User Tidak ditemukan', $error->getMessage());
        }
    }

    public function update(UpdateUserRequest $request, User $user)
    {
        try {
            if(!$user){
                return new ApiResource(false, 'Data User Tidak ditemukan!', 'tes');
            }
            $requestData = $request->validated();
            $user->update($requestData);
            return new ApiResource(true, 'Data User Berhasil Diubah!', $user);
        } catch (\Throwable $error) {
            return new ApiResource(false, 'Data User Gagal Diubah!', $error->getMessage());
        }
    }

    public function destroy(User $user)
    {
        try {
            if(!$user){
                return new ApiResource(false, 'Data User Tidak ditemukan!', []);
            }
            $user->delete();
            return new ApiResource(true, 'Berhasil Hapus Data User!', []);
        } catch (\Throwable $error) {
            return new ApiResource(false, 'Data User Tidak ditemukan', $error->getMessage());
        }
    }
}
