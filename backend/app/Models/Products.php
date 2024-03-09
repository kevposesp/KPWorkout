<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Str;

class Products extends Model
{

    use HasFactory;

    protected $fillable = [
        'name', 'description', 'price', 'stock', 'slug'
    ];

    protected $appends = ['images'];

    protected function slug(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => $value,
            set: fn ($value) => Str::slug($this->name) . '-' . Str::random(5)
        );
    }

    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(Categories::class, 'categories_products', 'product_id', 'category_id');
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'favorite_products', 'product_id', 'user_id')->withTimestamps();
    }

    public function images()
    {
        return $this->hasMany(ProductsImages::class);
    }

    public function getImagesAttribute()
    {
        return $this->images()->get()->pluck('image');
    }

    public function filters()
    {
        return $this->belongsToMany(Filters::class, 'products_filters', 'product_id', 'filter_id');
    }

}
