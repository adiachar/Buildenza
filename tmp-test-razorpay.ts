import Razorpay from 'razorpay';
import 'dotenv/config';

async function test() {
    const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID as string,
        key_secret: process.env.RAZORPAY_KEY_SECRET as string,
    });

    try {
        const order = await razorpay.orders.create({
            amount: 500,
            currency: "USD",
            receipt: "receipt_cmq1234567890123456789012_monthly"
        });
        console.log("SUCCESS:", order);
    } catch (e: any) {
        console.log("ERROR OBJECT:", JSON.stringify(e));
        console.log("ERROR MESSAGE:", e.message);
    }
}
test();
