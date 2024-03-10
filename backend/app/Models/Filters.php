<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Filters extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'name'
    ];

    protected $appends = ['products_count'];


    public function products()
    {
        return $this->belongsToMany(Products::class, 'products_filters', 'filter_id', 'product_id');
    }

    public function getProductsCountAttribute()
    {
        return $this->calculateTotalProductsCount();
    }

    protected function calculateTotalProductsCount()
    {
        $totalCount = $this->products()->count();

        return $totalCount;
    }
}
