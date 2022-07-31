<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $products = [
            [
                "name" => "Pie de Limon",
                "price" => 18,
                "image" => "img/pie-de-limon.png",
            ],
            [
                "name" => "Pie de Parchita",
                "price" => 20,
                "image" => "img/pie-de-parchita.png",
            ],
            [
                "name" => "Tiramisu",
                "price" => 25,
                "image" => "img/tiramisu.png",
            ],
            [
                "name" => "Tres Leches",
                "price" => 30,
                "image" => "img/tres-leches.png",
            ],
            [
                "name" => "Tres Leches de Chocolate",
                "price" => 40,
                "image" => "img/tres-leches.png",
            ],
            [
                "name" => "Mini Brownies",
                "price" => 16,
                "image" => "img/choco-glaze-donut-peanut.png",
            ],
            [
                "name" => "Mini Cupcakes",
                "price" => 16,
                "image" => "img/choco-glaze-donut.png",
            ],
            [
                "name" => "Mini Suspiros",
                "price" => 6,
                "image" => "img/suspiros.png",
            ],
            [
                "name" => "Suspiros Rellenos",
                "price" => 10,
                "image" => "img/suspiros.png",
            ],
            [
                "name" => "Galletas ChocoChips",
                "price" => 12,
                "image" => "img/galletas-chocochips.png",
            ],
            [
                "name" => "Bandejita Mini Brownies",
                "price" => 16,
                "image" => "img/brownie.png",
            ],
            [
                "name" => "Bandeja 4 Brownie",
                "price" => 10,
                "image" => "img/brownie.png",
            ]
        ];

        DB::table('products')->insert($products);

    }
}
