<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Categories extends Model
{

    use HasFactory;

    protected $fillable = [
        'title', 'description', 'image', 'slug', 'parent_id', 'is_leaf'
    ];

    protected function slug(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => $value,
            set: fn ($value) => Str::slug($this->title) . '-' . Str::random(5)
        );
    }

    public function parentCategory(): BelongsTo
    {
        return $this->belongsTo(Categories::class, 'parent_id');
    }

    public function childrenCategories(): HasMany
    {
        return $this->hasMany(Categories::class, 'parent_id');
    }

    public function products(): BelongsToMany
    {
        return $this->belongsToMany(Products::class);
    }

}
