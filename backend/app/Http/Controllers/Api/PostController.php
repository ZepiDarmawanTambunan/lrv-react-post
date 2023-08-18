<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use App\Http\Resources\ApiResource;
use App\Models\Post;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PostController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api')->except(['index', 'show']);
    }

    public function index(Request $request)
    {
        try {
            $title = $request->input('title');
            $posts = Post::latest();

            if($title){
                $posts->where('title', 'like', '%'.$title.'%');
            }

            return new ApiResource(true, 'List Data posts', $posts->paginate(5));
        } catch (\Throwable $error) {
            return new ApiResource(false, 'Data Post Gagal ditemukan!', $error->getMessage());
        }
    }

    public function store(StorePostRequest $request)
    {
        try {
            $requestData = $request->validated();
            $image = $request->file('image');
            $image->storeAs('public/posts', $image->hashName());
            $requestData['image'] = $image->hashName();
            $post = Post::create($requestData);
            if (!$post) {
                throw new Exception('Data Post Gagal Ditambahkan!');
            }
            return new ApiResource(true, 'Data Post Berhasil Ditambahkan!', $post);
        } catch (\Throwable $error) {
            return new ApiResource(false, 'Data Post Gagal Ditambahkan!', $error->getMessage());
        }
    }

    public function show($id)
    {
        try {
            $post = Post::find($id);
            if(!$post){
                return new ApiResource(false, 'Data Post Tidak ditemukan!', 'tes');
            }
            return new ApiResource(true, 'Detail Data Post!', $post);
        } catch (\Throwable $error) {
            return new ApiResource(false, 'Data Post Tidak ditemukan', $error->getMessage());
        }
    }

    public function update(UpdatePostRequest $request, $id)
    {
        try {
            $post = Post::find($id);
            if(!$post){
                return new ApiResource(false, 'Data Post Tidak ditemukan!', 'tes');
            }
            $requestData = $request->validated();
            if ($request->hasFile('image')) {
                if ($post->image != null && Storage::exists('/public/posts/'.$post->image)) {
                    Storage::delete('/public/posts/'.$post->image);
                }
                $image = $request->file('image');
                $image->storeAs('public/posts', $image->hashName());
                $requestData['image'] = $image->hashName();
            }
            $post->update($requestData);
            return new ApiResource(true, 'Data Post Berhasil Diubah!', $post);
        } catch (\Throwable $error) {
            return new ApiResource(false, 'Data Post Gagal Diubah!', $error->getMessage());
        }
    }

    public function destroy($id)
    {
        try {
            $post = Post::find($id);
            if(!$post){
                return new ApiResource(false, 'Data Post Tidak ditemukan!', 'tes');
            }
            if ($post->image != null && Storage::exists('/public/posts/'.$post->image)) {
                Storage::delete('/public/posts/'.$post->image);
            }
            $post->delete();
            return new ApiResource(true, 'Data Post Berhasil Dihapus!', null);
        } catch (\Throwable $error) {
            return new ApiResource(false, 'Data Post Gagal Dihapus!', $error->getMessage());
        }
    }
}
