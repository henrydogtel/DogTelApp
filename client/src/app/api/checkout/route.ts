import { NextResponse } from "next/server";
import Stripe from 'stripe';

const stripe = new Stripe('sk_test_51QEJM0P0p4yyHMWvgkrsnnmPC5FKV25cnAmHvzh1tSzR2YJkF8vMIvRyJZUY5ueh7fkCqIQjmPIul2xvUQ4OGGsF009LLawD3J', {
  
});

export async function POST(request: Request) {
  const { appointmentId, totalAmount, sitterName, dogNames, successUrl, cancelUrl } = await request.json();

  try {
    // Crear la sesión de Stripe Checkout
    const session = await stripe.checkout.sessions.create({
      success_url: `${successUrl}?payment_success=true&appointment_id=${appointmentId}`,
      cancel_url: cancelUrl,
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Appointment for ${sitterName}`,
              description: `Pet Sitting for dogs: ${dogNames.join(', ')}`,
              images: ['https://media-cldnry.s-nbcnews.com/image/upload/t_nbcnews-fp-1024-512,f_auto,q_auto:best/rockcms/2022-08/220805-border-collie-play-mn-1100-82d2f1.jpg'],
            },
            unit_amount: totalAmount * 100, // Convertir a centavos
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      metadata: {
        appointment_id: appointmentId,
      },
    });

    // Regresar la URL de la sesión de Stripe
    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'An error occurred while creating the Stripe session.' }, { status: 500 });
  }
}
