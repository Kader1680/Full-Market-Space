<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Payment;
use Stripe\Stripe;
use Stripe\PaymentIntent;

class PaymentController extends Controller
{
    public function createPayment(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'nullable|email',
            'amount' => 'required|numeric|min:1',
            'payment_method_id' => 'required|string',
        ]);

        try {
            Stripe::setApiKey(env('STRIPE_SECRET'));

            // Create PaymentIntent
            $paymentIntent = PaymentIntent::create([
                'amount' => $request->amount * 100, // in cents
                'currency' => 'usd',
                'payment_method' => $request->payment_method_id,
                'confirmation_method' => 'manual',
                'confirm' => true,
                'return_url' => url('/payment/success'),
            ]);

            // Store payment
            $payment = Payment::create([
                'user_name' => $request->name,
                'email' => $request->email,
                'amount' => $request->amount,
                'stripe_payment_id' => $paymentIntent->id,
                'status' => $paymentIntent->status,
            ]);

            return response()->json([
                'status' => true,
                'message' => 'Payment created successfully',
                'payment' => $payment,
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}
