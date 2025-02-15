import bcrypt from "bcryptjs"
import  CredentialsProvider  from "next-auth/providers/credentials";
import db from "@repo/database/client"

export const authOption = {
    providers :[
        CredentialsProvider({
            name:"Credentials",
            credentials:{
                phone_number:{
                    label: "Phone number",
                    type:"text",
                    placeholder:"1234567890",
                    required: true
                },
                password:{
                    label:"Password", 
                    type:"password",
                    required:true
                },
            },
            async authorize(credentials:any){

                const hashedPassword = await bcrypt.hash(credentials.password,10)
                const existingUser = await db.user.findFirst({
                    where:{
                         phone_number: credentials.phone_number
                    }
                });

                if(existingUser){
                    const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password)
                    if(passwordValidation){
                        return {
                            id:existingUser.id.toString(),
                            name:existingUser.name,
                            email:existingUser.email
                        }
                    }
                    return null;
                }
                try{
                    const user = await db.user.create({
                        data:{
                            phone_number: credentials.phone_number,
                            password: hashedPassword
                        }
                    });

                    return {
                        id: user.id.toString(),
                        name:user.name,
                        email: user.email
                    }
                }catch(e){
                    console.log(e)
                }
                return null
            }
        })
    ],
    secret:process.env.JWT_SECRET || "secret",

    callbacks:{
        async session({token,session}:any){
            session.user.id = token.sub
            return session
        }
    }
}