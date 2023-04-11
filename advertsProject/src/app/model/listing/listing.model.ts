import { Seller } from "../seller/seller.model";

export interface Listing{
    _id: string;
    title: string;
    description:string;
    price:number;
    image_url:string;
    showPhone?: boolean;
    seller: {name: string, email: string, phone: string};
    
  }
