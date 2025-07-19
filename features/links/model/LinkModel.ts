import mongoose from "mongoose";


const LinkSchema = new mongoose.Schema({
    title: {type: String , required: true},
    link: {type :String , required:true},
    icon : {type: String, default: "https://lynqur.com/favicon.ico"},
    description: {type: String, default: ""},
    createdBy :{type:String,required:true}
})

LinkSchema.index({createdBy:1})


export default mongoose.models.Link || mongoose.model("Link", LinkSchema);

