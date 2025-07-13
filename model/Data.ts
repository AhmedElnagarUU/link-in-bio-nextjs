import mongoose from "mongoose";


const DataSchema = new mongoose.Schema({
    title: {type: String , required: true},
    link: {type :String , required:true},
    createdBy :{type:String,required:true}
})

DataSchema.index({createdBy:1})


export default mongoose.models.Data || mongoose.model("Data", DataSchema);