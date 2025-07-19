"use server"
import Data from "@/features/links/model/LinkModel"
import connectDB from "@/lib/mongoose"


export const getData = async(id : string)=>{
    console.log(`this is the id from getData.ts ${id}`)
    await connectDB()
    try{
        const data = await Data.find({createdBy:id})
       const convertedData = data.map((item:any) => ({
            id: item._id.toString(),  
            title: item.title,
            link: item.link,
            createdBy: item.createdBy
        }));  
      return convertedData   
    }catch(error){
        console.log("Error fetching data:", error);
    }
}