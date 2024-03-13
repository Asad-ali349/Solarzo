import express from 'express';

import { addStock, assignStock, deleteStock, getStockDetail, getStocks, updateStock } from '../controllers/stock.js';



const router=express.Router();

router.post('/',addStock);
router.get('/',getStocks);
router.get('/:id',getStockDetail);
router.patch('/:id',updateStock);
router.delete('/:id',deleteStock);
router.post('/assign_stock',assignStock);


export default router;