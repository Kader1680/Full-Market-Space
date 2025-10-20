<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Payment;
use App\Models\Order;
use Stripe\Stripe;
use Stripe\PaymentIntent;
use Illuminate\Support\Facades\Auth;

class PaymentController extends Controller
{

    public function countTransactions()
    {
       
        $transactionCount = Payment::count();

        return response()->json(['transaction_count' => $transactionCount]);
    }

    public function createPayment(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'nullable|email',
            'amount' => 'required|numeric|min:1',
            'payment_method_id' => 'required|string',
            'order_id' => 'required|integer', // ✅ add this
        ]);

        try {
            Stripe::setApiKey(env('STRIPE_SECRET'));

            // ✅ Create payment on Stripe
            $paymentIntent = PaymentIntent::create([
                'amount' => (int)($request->amount * 100),
                'currency' => 'usd',
                'payment_method' => $request->payment_method_id,
                'confirm' => true,
                'description' => 'E-commerce Payment',
                'payment_method_types' => ['card'],
            ]);

            // ✅ Save payment in DB
            $payment = Payment::create([
                'user_name' => $request->name,
                'email' => $request->email,
                'amount' => $request->amount,
                'card_last_four' => $paymentIntent->charges->data[0]->payment_method_details->card->last4 ?? null,
                'stripe_payment_id' => $paymentIntent->id,
                'status' => $paymentIntent->status,
            ]);

            // ✅ Update order status
            $order = Order::find($request->order_id);

            if ($order) {
                $order->status = 'confirmed';
                $order->save();
            }

            return response()->json([
                'status' => true,
                'message' => '✅ Payment successful and order confirmed',
                'payment' => $payment,
                'order' => $order,
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}
