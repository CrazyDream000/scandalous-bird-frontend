import { BigNumberish } from "ethers";

export type NFTAuctionInfoProps = {
    name:string;
    description:string;
    image:string;
    tokenId:Number;
    seller:`0x${string}`;
    owner:`0x${string}`;
    winner:`0x${string}`;
    price:number;
    sold:boolean;
    live:boolean;
    biddable:boolean;
    id:number;
    bids:number;
    duration:number;
}

export type CreateAuctionProps = {
    name: string,
    description:string,
    image:string, 
    tokenURI:string, 
    price:string
}

export type NFTCardProps = {
    isLive : boolean;
    tokenID : number;
    id: number;
};
  