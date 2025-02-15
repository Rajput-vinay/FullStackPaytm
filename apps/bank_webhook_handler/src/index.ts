import express from "express"
import db from "@repo/database/client"
import {z} from "zod"
import {Request, Response} from "express"

const app = express()
app.use(express.json())


//  Define the schema for the payment object
const paymentSchema = z.object({
token : z.string(),
userId: z.string(),
amount : z.string(),
})


interface PaymentInformation {
    token: string
    userId: string
    amount: string
}


app.post("/hdfcWebhook", async (req: Request , res: Response): Promise<any> => {

    try {
        
        const result = paymentSchema.safeParse(req.body);

        if(!result.success){
            return res.status(400).json({error: "Invalid request body"})
        }


        const paymentInformation: PaymentInformation ={
            token: result.data.token,
            userId: result.data.userId,
            amount: result.data.amount
        }

        
        //  Save the payment information to the database

        await db.$transaction([
            //  increment the user's balance ,
            db.balance.updateMany({
                where:{
                    userId: Number(paymentInformation.userId)
                },
                data:{
                    amount:{
                        increment: Number(paymentInformation.amount)
                    }
                }
            }),

            //  update the payment status to success
            db.onRampTransaction.updateMany({
                where:{
                    token: paymentInformation.token
                },
                data:{
                    status: "Success"
                }
            })
        ]);
        res.json({
            message:"Captured payment successfully"
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({error: "Internal server error occurred"})     

    }
});

app.listen(3003, () => {
    console.log("Server is running on port 3000")
})