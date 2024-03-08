import Stocks from "../models/stock.js";
import Joi from "joi";

const addStockSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    quantity: Joi.number(),
}).unknown();

export const addStock= async (req,res)=>{
    const stock=req.body;
    try {
        const { error, value } = addStockSchema.validate(req.body);

        if (error) {
            // Return a 400 Bad Request response if validation fails
            return res.status(400).json({ message: error.details[0].message });
        }

        const existingStock=await Stocks.findOne({name:stock.name});
        
        if(existingStock){
            return res.status(400).json({ message: "Stock with given name already exist..." });
        }

        const newStock=new Stocks(stock);
        const saveStock=await newStock.save();
        if(!saveStock)
            return res.status(400).json({ message: "Some thing went wrong..." });
        
        return res.status(200).json({ message: "Stocks added sucessfully..." });

    } catch (error) {
        console.log('error:'+error);
        res.status(500).json(error)
    }
};

export const getStocks=async (req,res)=>{
    try {
        const stocks=await Stocks.find();
        return res.status(200).json(stocks);
    } catch (error) {
        console.log('error:'+error);
        res.status(500).json(error)
    }
}
export const getStockDetail=async (req,res)=>{
    const {id}=req.params;
    try {
        const stock=await Stocks.findOne({_id:id});
        return res.status(200).json(stock);
    } catch (error) {
        console.log('error:'+error);
        res.status(500).json(error)
    }
}


export const updateStock= async (req,res)=>{
    const stock=req.body;
    const {id}=req.params;
    try {
        const { error, value } = addStockSchema.validate(req.body);

        if (error) {
            // Return a 400 Bad Request response if validation fails
            return res.status(400).json({ message: error.details[0].message });
        }

        const existingStock=await Stocks.findOne({name:stock.name,_id:{$ne:id}});
        if(existingStock){
            return res.status(400).json({ message: "Stock with given name already exist..." });
        }

        const updateStock=await Stocks.findOneAndUpdate({_id:id},stock,{new:true});
        if(!updateStock)
            return res.status(400).json({ message: "Some thing went wrong..." });
        
        return res.status(200).json({ message: "Stocks updated sucessfully..." });

    } catch (error) {
        console.log('error:'+error);
        res.status(500).json(error)
    }
};

export const deleteStock= async (req,res)=>{
    const {id}=req.params;
    try {
        const deleteStock=await Stocks.findByIdAndDelete({_id:id});
        if(!deleteStock)
            return res.status(400).json({ message: "Some thing went wrong..." });
        
        return res.status(200).json({ message: "Stocks Deleted sucessfully..." });
    } catch (error) {
        console.log('error:'+error);
        res.status(500).json(error)
    }

}