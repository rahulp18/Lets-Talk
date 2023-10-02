import { PrismaClient } from "@prisma/client";
import { CreateUsernameResponse } from "./types";

export async function verifyAndCreateUsername(args:{userId:string;username:string},prisma:PrismaClient):Promise<CreateUsernameResponse>{
    const {userId,username}=args;
    try {
        const exsitngUSer=await prisma.user.findUnique({
            where:{
                username
            }
        });
        if(exsitngUSer){
            return {
                error:"Username already taken. Try another"
            }
        }
// Update username
await prisma.user.update({
    where:{
        id:userId,
    },
    data:{
        username,
         
        createdAt:new Date()
    }
});
return {success:true};

    } catch (error:any) {
        console.log("createUsername error", error);
    return {
      error: error?.message as string,
    }; 
    }

}