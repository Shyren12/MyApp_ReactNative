import express, { Request, Response } from 'express'
import { PRODUCTS } from '../Models/ProductModel'
import { ProductParams } from '../dto/Product';

const path = 'http://localhost:9000/assets/'

export const createProduct = async (req: Request, res: Response) => {
    const { name, price, oldPrice, description, quantity, inStock, isFeatured, 
        category } = <ProductParams>req.body;

    const files = req.files as [Express.Multer.File];
    const images = files.map((file: Express.Multer.File) => path + file.filename);

    const product = new PRODUCTS({
        name: name,
        images: images,
        price, oldPrice, description, quantity, inStock,isFeatured, category
    });

    try {
        console.log(product)
        await product.save();
        res.status(200).json(`Product created successfully:))) + ${path}!!!`)
    } catch (error) {
        res.status(500).json(`Failed to create Product ${error}:(((`)
    }   
}
export const getProductByCatID = async (req: Request, res: Response) => {
    console.log(req.params.CatID)
    try {

        const result = await PRODUCTS.find({ category: req.params.CatID });
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(`Failed to get Products fetch ${error}:(((`)
    }
}
export const getProductByID = async (req: Request, res: Response) => {
    try {
        const result = await PRODUCTS.findById(req.params.id);
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(`Failed to get Product fetch ${error}:(((`)
    }
}
export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const result = await PRODUCTS.find();
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(`Failed to get Products fetch ${error}:(((`)
    }
}

export const getTrendingProducts = async (req: Request, res: Response) => {
    try {
        const result = await PRODUCTS.find({isFeatured: true}).sort({createdAt: -1}).limit(4)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(`Products get fail! ${error}`)
    }
}




