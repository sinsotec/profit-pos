<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Models\Product;

class ProductController extends Controller
{
    public function index()
    {
        $response = Http::get('http://localhost:3000/articulos/precios/DEMOA');
        $inventario = $response->json();
        return $inventario;//Product::all();
    }

}
