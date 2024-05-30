import { useEffect, useState } from "react";
import NFTCard from "../components/NFTCard";
import { nftLists } from "../utils/constants";
import { useGlobalContext } from "../context/globalContext";
import { formatEther } from "ethers";
import { useAccount } from "wagmi";
const Home = () => {
  const {address} = useAccount();
  const [NFTListContent, setNFTListContent] = useState();
  const {NFTAuctionsInfos, sortMode, setSortMode, getNFTAuctionsInfos} = useGlobalContext();
  const [update, setUpdate] = useState<boolean>(false)
  useEffect(() => {
    const interval = setInterval(() => {
    if(getNFTAuctionsInfos && sortMode)
    {
      console.log("-------getting Auction Lists---------");
      getNFTAuctionsInfos(sortMode);
      setUpdate(!update);
    }
    }, 10000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getNFTAuctionsInfos, update]);

  useEffect(() => {
    const res = nftLists.map((nftItem, index) => {
      let isLive = false;
      let isCreated = false;
      let tokenID = -1;
      NFTAuctionsInfos?.map((nftAuctionInfo, index) => {
        const nftAuctionID:number = Number(formatEther(nftAuctionInfo.id.toString()));
        if(nftAuctionID === nftItem.id)
        {
          nftAuctionInfo.live === true?isLive=true:isLive=false;
          isCreated = true;
          tokenID = Number(nftAuctionInfo.tokenId);
        }
        return true; 
      });
      if(isCreated || (address==="0x58cCd9d9F461FC2D821CbaB2E631A348f52dc795" && (sortMode === "owns" || sortMode==="all")))
        return (<NFTCard isLive = {isLive} tokenID = {tokenID} id = {index}></NFTCard>);
      return null; 
    })
    setNFTListContent(res as any);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [NFTAuctionsInfos]);

  useEffect(()=>{
    if(getNFTAuctionsInfos && sortMode)
      getNFTAuctionsInfos(sortMode);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortMode]);

  return (
    <div className="w-full h-[calc(100%-150px)] retro">
      <div className="flex relative flex-col sm:flex-row justify-between px-10 lg:px-20 py-10 w-full gap-4 h-[400px]">
        <img alt="hero overview" src="/images/hero_background.png" className="absolute left-0 top-0 w-full h-[400px] -z-10"></img>
        {/* <div className="max-w-[350px] w-full border-orange-600 border-[1px] relative">
          <div className="bg-white p-1">
           
          </div>
          <div className=" absolute w-full h-full bg-orange-600 left-2 top-2 -z-10"></div>
        </div> */}
         <img alt="hero" src="/images/logo.png" className="mt-28 w-[200px] h-[200px] animate-bounce hidden sm:block" />
        <div className="flex flex-col items-center sm:items-end retro gap-4 justify-center h-full">
          <div className="text-center sm:text-right text-lg lg:text-2xl text-white">
            Scandalous Birds
          </div>
          <div className="text-4xl text-center sm:text-right  md:text-[60px] leading-none text-white">Scandalous<br/> Birds</div>
          <div className="text-xl md:text-3xl text-center sm:text-right  text-white">
            NFT Auction Project
          </div>
        </div>
      </div>

      <div className="flex flex-col bg-orange-500 w-full">
        <div className="flex flex-col  px-10 lg:px-20 py-10 w-full gap-4">
          <div className="flex flex-wrap gap-2">
            <div
              className={`${
                sortMode === "all"
                  ? "text-orange-500 bg-white border-2 border-white"
                  : "bg-transparent border-white border-2 text-white"
              } flex justify-center items-center  text-sm px-2 py-1 transition hover:text-orange-500 hover:bg-white cursor-pointer`}
              onClick={() => {
                if (setSortMode) setSortMode("all");
              }}
            >
              All
            </div>
            <div
              className={`${
                sortMode === "live"
                  ? "text-orange-500 bg-white border-2 border-white"
                  : "bg-transparent border-white border-2 text-white"
              } flex justify-center items-center  text-sm px-2 py-1 transition hover:text-orange-500 hover:bg-white cursor-pointer text-nowrap`}
              onClick={() => {
                if (setSortMode) setSortMode("live");
              }}
            >
              Live 
            </div>
            <div
              className={`${
                sortMode === "sold"
                  ? "text-orange-500 bg-white border-2 border-white"
                  : "bg-transparent border-white border-2 text-white"
              } flex justify-center items-center  text-sm px-2 py-1 transition hover:text-orange-500 hover:bg-white cursor-pointer text-nowrap`}
              onClick={() => {
                if (setSortMode) setSortMode("sold");
              }}
            >
              Sold
            </div>
            <div
              className={`${
                sortMode === "unsold"
                  ? "text-orange-500 bg-white border-2 border-white"
                  : "bg-transparent border-white border-2 text-white"
              } flex justify-center items-center  text-sm px-2 py-1 transition hover:text-orange-500 hover:bg-white cursor-pointer text-nowrap`}
              onClick={() => {
                if (setSortMode) setSortMode("unsold");
              }}
            >
              UnSold
            </div>
            <div
              className={`${
                sortMode === "owns"
                  ? "text-orange-500 bg-white border-2 border-white"
                  : "bg-transparent border-white border-2 text-white"
              } flex justify-center items-center  text-sm px-2 py-1 transition hover:text-orange-500 hover:bg-white cursor-pointer text-nowrap`}
              onClick={() => {
                if (setSortMode) setSortMode("owns");
              }}
            >
              My NFTs
            </div>
          </div>
          <div className="flex flex-col sm:grid grid-cols-12 gap-8 xl:gap-16 w-full">
            {NFTListContent !== undefined && NFTListContent[0]===null?<div className="col-span-12 flex justify-center py-40 text-white retro">No datas</div>:NFTListContent}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
