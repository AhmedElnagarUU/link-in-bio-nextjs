"use server"
import connectDB from "@/lib/mongoose"
import Data from "@/features/userProfile/model/UserProfileModel"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"


type props= {
    // user:any,
    data:any
}


export const addData = async (formData:FormData) => {
 await connectDB()
console.log("Adding data...")
const {getUser} = getKindeServerSession()
const user = await getUser()
const title = formData.get('title')
const link = formData.get('link')
console.log(`this is the id for user${user?.id}`)
console.log(title)
console.log(link)

 try{

       await Data.create(
        {
            title,
            link,
            createdBy:user?.id
        }
       )

 }catch(err){
    console.log(`this error is coming from addData.ts: ${err}`)
 }


}