import Data from "@/model/Data"


export const getData = async(id : string)=>{
    try{
        return await Data.find({creatdBy:id}).sort({createdAt:-1})
    }catch(error){
        console.log("Error fetching data:", error);
    }
}