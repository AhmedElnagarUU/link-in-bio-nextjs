import connectDB from "@/lib/mongoose"
import Data from "@/model/Data"

type props= {
    // user:any,
    data:any
}


export const addData = async (formData:FormData) => {
 await connectDB()

    console.log(formData)

//     const userId = user._id.toString();
//     const { title, link } = data;

//     try{
//         await Data.create({
//             title,
//             link,
//             createdBy: userId
//         })
//     }catch(err){
//         console.error("Error adding data:", err);
//         throw new Error("Failed to add data");
//     }
    
}