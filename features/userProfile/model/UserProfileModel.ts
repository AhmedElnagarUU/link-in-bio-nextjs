import mongoose from "mongoose";



const userProfileSchema = new mongoose.Schema({
       creartedBy: { type: String, required: true,  },
       name: {  type: String, required: true, },
       bio: { type: String, default: "",},
    }, {
    timestamps: true,
})


userProfileSchema.index({ creartedBy: 1 });

export default mongoose.models.UserProfile || mongoose.model("UserProfile", userProfileSchema);