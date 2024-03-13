import mongoose from 'mongoose';

const assignedStockSchema= mongoose.Schema({
    stock_id:{
        required:true,
        type:mongoose.SchemaTypes.ObjectId,
    },
    team_id:{ 
        required:true,
        type:mongoose.SchemaTypes.ObjectId
    },
    quantity:{ 
        required:true,
        type:Number
    },
},{
    timestamps:true,
    strict: false // Allow unknown fields
});

const assignedStockModel= mongoose.model('assignedStock',assignedStockSchema);

export default assignedStockModel;


