<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Orders extends Model
{
    use HasFactory;

    protected $fillable = [
        'first_name',
        'last_name',
        'country',
        'address',
        'city',
        'phone',
        'email',
        'status'
    ];

    protected $appends = ['total_amount'];

    public function getTotalAmountAttribute()
    {
        return $this->calculateTotalAmount();
    }

    protected function calculateTotalAmount()
    {
        $totalAmount = 0;

        foreach ($this->products as $product) {
            $totalAmount += $product->price * $product->pivot->quantity;
        }

        return $totalAmount;
    }

    /**
     * Get the products for the order.
     */
    public function products()
    {
        return $this->belongsToMany(Products::class, 'order_product', 'order_id', 'product_id')
        ->withPivot('quantity')
        ->withTimestamps()
        ->withInactive();
    }

    /**
     * Get the user that owns the order.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

}
