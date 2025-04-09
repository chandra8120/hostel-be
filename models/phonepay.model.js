import mongoose from "mongoose";

const phonepaySchema=new mongoose.Schema({
    adminId:{type:mongoose.Schema.Types.ObjectId,ref:"Admin",required:true},
    image:{type:String,required:true},
    phone:{type:Number,required:true},
    name:{type:String,required:true},
    description:{type:String}
})
export default mongoose.model("Phonepay",phonepaySchema)