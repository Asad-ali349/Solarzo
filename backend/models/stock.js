import mongoose from 'mongoose';

const stockSchema= mongoose.Schema({
    name:{
        required:true,
        type:String,
    },
    quantity:{ 
        required:true,
        type:Number
    }
},{
    timestamps:true,
    strict: false // Allow unknown fields
});

const stockModel= mongoose.model('Stock',stockSchema);

export default stockModel;


