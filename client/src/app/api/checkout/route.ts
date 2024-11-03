import { NextResponse } from "next/server";
import Stripe from 'stripe'

const stripe = new Stripe('sk_test_51QEJM0P0p4yyHMWvgkrsnnmPC5FKV25cnAmHvzh1tSzR2YJkF8vMIvRyJZUY5ueh7fkCqIQjmPIul2xvUQ4OGGsF009LLawD3J')

export async function POST() {
    console.log(stripe);
    
    const session = await stripe.checkout.sessions.create({
        success_url:'http://localhost:3000/success',
        line_items:[
            {
                price_data:{
                    currency:'usd',
                    product_data:{
                        name:'Cuidar a mis perros',
                        images:['https://media-cldnry.s-nbcnews.com/image/upload/t_nbcnews-fp-1024-512,f_auto,q_auto:best/rockcms/2022-08/220805-border-collie-play-mn-1100-82d2f1.jpg']
                    },
                    unit_amount:2000,
                    
                },
                quantity:1
            
            }
        ],
        mode:'payment'
    })
    console.log(session);
    
    return NextResponse.json(session.url)
}