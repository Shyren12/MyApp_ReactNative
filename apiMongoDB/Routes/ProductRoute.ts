import express, { Request, Response } from 'express'
import multer from 'multer'
import path from 'path'
import { createProduct, getAllProducts, getProductByCatID, getProductByID, getTrendingProducts} from '../Controllers'
import { get } from 'http';

const router = express.Router();
const imagesStorage = multer.diskStorage({
    destination: function (req, file, cb)  {
        cb(null, 'assets')
    },

    filename: function (req, file, cb)  {
        cb(null, req.body.name + '-' + Date.now() + path.extname(file.originalname))
    }
})

const images = multer({ storage: imagesStorage }).array('images');

router.post('/createProduct', images, createProduct);
router.get('/getProductByCatID/:CatID', getProductByCatID);
router.get('/getProductByID/:id', getProductByID);
router.get('/getAllProducts', getAllProducts);
router.get('/getTrendingProducts', getTrendingProducts)
//router.get('/getFeaturedProducts/:isFeatured', getFeaturedProducts);

export { router as ProductRoute };