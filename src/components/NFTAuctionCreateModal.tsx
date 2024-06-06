import {useState } from "react"

type NFTAuctionCreateModalProps = {
    executeOfferFunc:(tokenID:number, biddable:boolean, price: string, duration:number)=>void,
    setIsShow:(value: boolean)=>void,
    tokenID:number
}

const NFTAuctionCreateModal: React.FC<NFTAuctionCreateModalProps> = ({setIsShow, executeOfferFunc, tokenID}) => {
    const [hour, setHour] = useState<number>(0);
    const [minute, setMinute] = useState<number>(0);
    const [second, setSecond] = useState<number>(0);
    const [bidAmont, setBidAmount] = useState<string>("0");
    return <div className=" w-screen h-screen fixed left-0 top-0 z-50 bg-black/30 flex justify-center items-center" onClick={()=>setIsShow(false)}>
        <div className="max-w-[320px] w-full top-40 bg-orange-500 py-4" onClick={(e)=>{e.stopPropagation();}}>
            <div className="w-full h-full px-6 py-2 flex flex-col items-center">
                <div className="text-white text-xl">Offer Auction</div>
                <div className="Time Picker w-full items-center text-white pt-4">
                    <div className="flex justify-between w-full items-center">
                        <div className="flex flex-col items-center">
                            <div className="text-white">Hour</div>
                            <input type="number" className="text-black text-right bg-white rounded-sm outline-none p-2 text-xl w-16" value={hour} onChange={(e)=>{if(Number(e.target.value) <= 23) setHour(Number(e.target.value))}}/>
                        </div>
                        <div className="pt-6">:</div>
                        
                        <div className="flex flex-col items-center">
                            <div className="text-white">Minute</div>
                            <input type="number" className="text-black text-right bg-white rounded-sm outline-none p-2 text-xl w-16" value={minute} onChange={(e)=>{if(Number(e.target.value) <= 59) setMinute(Number(e.target.value))}}/>
                        </div>
                        <div className="pt-6">:</div>
                        <div className="flex flex-col items-center">
                            <div className="text-white">Second</div>
                            <input type="number" className="text-black text-right bg-white rounded-sm outline-none p-2 text-xl w-16" value={second} onChange={(e)=>{if(Number(e.target.value) <= 59) setSecond(Number(e.target.value))}}/>
                        </div>
                    </div>
                </div>
                <div className="py-4 relative">
                    <input className="w-full bg-white p-2 outline-none" onChange={(e)=>{setBidAmount(e.target.value)}}></input>
                    <div className="absolute right-2 top-6 text-gray-500 z-10">LAVA</div>
                </div>
                <div className="flex gap-2">
                <button className="bg-orange-600 w-full p-2 text-white hover:bg-orange-400 transition" onClick={()=>{executeOfferFunc(tokenID, true, bidAmont, Number(second + 60 * minute + 3600 * hour)); setIsShow(false)}}>Create Auction</button>
                <button className="bg-orange-600 w-full p-2 text-white hover:bg-orange-400 transition" onClick={()=>{executeOfferFunc(tokenID, false, bidAmont, Number(second + 60 * minute + 3600 * hour)); setIsShow(false)}}>Create NFT Sale</button>
                </div>
            </div>
        </div>
    </div>
}
export default NFTAuctionCreateModal