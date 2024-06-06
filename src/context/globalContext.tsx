import React, { useState, useEffect, useContext, createContext } from "react";

import { useWalletClient, usePublicClient } from "wagmi";

import NFTAuctionContract_ABI from "../abis/NFTAuctionContract_ABI.json";
import { NFTAuctionInfoProps } from "../utils/types";
import { parseEther } from "ethers";

const AUCTION_ADDR = "0xb3220684E5e6857068a0b7189Dc846560e9eeAa7";

type Props = {
  NFTAuctionsInfos?: Array<NFTAuctionInfoProps>;
  getNFTAuctionsInfos?: (sortMode: string) => Promise<void>;
  createAuction?: (
    name: string,
    description: string,
    image: string,
    tokenURI: string,
    id: number
  ) => Promise<boolean>;
  offerAuction?: (
    tokenID: number,
    biddable: boolean,
    price: string,
    duration: number
  ) => Promise<boolean>;
  placeBidAuction?: (tokenID: number, price: string) => Promise<boolean>;
  claimAuction?: (tokenID: number) => Promise<boolean>;
  buyAuctionedNFT?: (tokenID: number, price: string) => Promise<boolean>;
  sortMode?: string;
  setSortMode?: (sortMode: string) => void;
};

const globalContext = createContext<Props>({});

export function useGlobalContext() {
  return useContext(globalContext);
}
const GlobalContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [sortMode, setSortMode] = useState<string>("all");
  const [NFTAuctionsInfos, setNFTAuctionInfos] = useState<
    Array<NFTAuctionInfoProps>
  >([]);

  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();

  useEffect(() => {
    getNFTAuctionsInfos("all");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getNFTAuctionsInfos = async (sortMode: string) => {
    if (!publicClient) return;
    let AuctionsLists = [];
    console.log("---------sort mode-----------", sortMode);
    if (sortMode === "all") {
      AuctionsLists = (await publicClient.readContract({
        abi: NFTAuctionContract_ABI,
        address: AUCTION_ADDR as `0x${string}`,
        functionName: "getAllAuctions",
      })) as Array<NFTAuctionInfoProps>;
    } else if (sortMode === "live") {
      AuctionsLists = (await publicClient.readContract({
        abi: NFTAuctionContract_ABI,
        address: AUCTION_ADDR as `0x${string}`,
        functionName: "getLiveAuctions",
      })) as Array<NFTAuctionInfoProps>;
    } else if (sortMode === "sold") {
      AuctionsLists = (await publicClient.readContract({
        abi: NFTAuctionContract_ABI,
        address: AUCTION_ADDR as `0x${string}`,
        functionName: "getSoldAuction",
      })) as Array<NFTAuctionInfoProps>;
    } else if (sortMode === "unsold") {
      AuctionsLists = (await publicClient.readContract({
        abi: NFTAuctionContract_ABI,
        address: AUCTION_ADDR as `0x${string}`,
        functionName: "getUnsoldAuction",
      })) as Array<NFTAuctionInfoProps>;
    } else {
      AuctionsLists = (await publicClient.readContract({
        abi: NFTAuctionContract_ABI,
        address: AUCTION_ADDR as `0x${string}`,
        functionName: "getMyAuctions",
      })) as Array<NFTAuctionInfoProps>;
    }
    if (AuctionsLists) {
      setNFTAuctionInfos(AuctionsLists);
      console.log(AuctionsLists);
    }
  };

  const offerAuction = async (
    tokenID: number,
    biddable: boolean,
    price: string,
    duration: number
  ) => {
    let isTxConfirmed = false;

    if (!walletClient || !publicClient) return false;
    const success = await walletClient?.writeContract({
      abi: NFTAuctionContract_ABI,
      address: AUCTION_ADDR as `0x${string}`,
      functionName: "offerAuction",
      args: [
        tokenID,
        biddable,
        duration % 60,
        Math.trunc((duration % 3600) / 60),
        Math.trunc(duration / 3600),
        0,
        parseEther(Number(price).toString()),
      ],
      value: parseEther(Number(price).toString()),
    });
    await publicClient?.waitForTransactionReceipt({ hash: success! });

    isTxConfirmed = true;
    console.log("-------getting NFT Auction----------");
    await getNFTAuctionsInfos(sortMode);
    console.log("-------update NFT AuctionInfo-------");
    return isTxConfirmed;
  };

  const createAuction = async (
    name: string,
    description: string,
    image: string,
    tokenURI: string,
    id: number
  ) => {
    let isTxConfirmed = false;

    if (!walletClient || !publicClient) return false;
    const success = await walletClient?.writeContract({
      abi: NFTAuctionContract_ABI,
      address: AUCTION_ADDR as `0x${string}`,
      functionName: "createAuction",
      args: [
        name,
        description,
        image,
        tokenURI,
        parseEther(Number(id).toString()),
      ],
    });
    await publicClient?.waitForTransactionReceipt({ hash: success! });

    isTxConfirmed = true;
    console.log("-------getting NFT Auction----------");
    await getNFTAuctionsInfos(sortMode);
    console.log("-------update NFT AuctionInfo-------");
    return isTxConfirmed;
  };

  const placeBidAuction = async (tokenID: number, price: string) => {
    let isTxConfirmed = false;

    if (!walletClient || !publicClient) return false;
    const success = await walletClient?.writeContract({
      abi: NFTAuctionContract_ABI,
      address: AUCTION_ADDR as `0x${string}`,
      functionName: "placeBid",
      args: [tokenID],
      value: parseEther(Number(price).toString()),
    });
    await publicClient?.waitForTransactionReceipt({ hash: success! });

    isTxConfirmed = true;
    console.log("-------getting NFT Auction----------");
    await getNFTAuctionsInfos(sortMode);
    console.log("-------update NFT AuctionInfo-------");
    return isTxConfirmed;
  };

  const claimAuction = async (tokenID: number) => {
    let isTxConfirmed = false;

    if (!walletClient || !publicClient) return false;
    const success = await walletClient?.writeContract({
      abi: NFTAuctionContract_ABI,
      address: AUCTION_ADDR as `0x${string}`,
      functionName: "claimPrize",
      args: [tokenID],
    });
    await publicClient?.waitForTransactionReceipt({ hash: success! });

    isTxConfirmed = true;
    console.log("-------getting NFT Auction----------");
    await getNFTAuctionsInfos(sortMode);
    console.log("-------update NFT AuctionInfo-------");
    return isTxConfirmed;
  };

  const buyAuctionedNFT = async (tokenID: number, price: string) => {
    console.log(parseEther(Number(price).toString()));
    let isTxConfirmed = false;
    
    if (!walletClient || !publicClient) return false;
    const success = await walletClient?.writeContract({
      abi: NFTAuctionContract_ABI,
      address: AUCTION_ADDR as `0x${string}`,
      functionName: "buyAuctionedItem",
      args: [tokenID],
      value: parseEther(Number(price).toString()),
    });
    await publicClient?.waitForTransactionReceipt({ hash: success! });

    isTxConfirmed = true;
    console.log("-------getting NFT Auction----------");
    await getNFTAuctionsInfos(sortMode);
    console.log("-------update NFT AuctionInfo-------");
    return isTxConfirmed;
  };

  const value = {
    NFTAuctionsInfos,
    sortMode,
    setSortMode,
    getNFTAuctionsInfos,
    createAuction,
    offerAuction,
    placeBidAuction,
    claimAuction,
    buyAuctionedNFT,
  };
  return (
    <globalContext.Provider value={value}>{children}</globalContext.Provider>
  );
};

export default GlobalContextProvider;
