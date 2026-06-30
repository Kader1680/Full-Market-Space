<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;
       protected $fillable = [
        'user_name',
        'email',
        'card_last_four',
        'currency',
        'amount',
        'stripe_payment_id',
        'status',
    ];
}
