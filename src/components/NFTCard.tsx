import { useGlobalContext } from "../context/globalContext";
import { useEffect, useState } from "react";
import { NFTCardProps } from "../utils/types";
import { nftLists } from "../utils/constants";
import { Hourglass } from "react-loader-spinner";
import NFTAuctionCreateModal from "./NFTAuctionCreateModal";
import { NFTAuctionInfoProps } from "../utils/types";
import { formatEther } from "ethers";
import { formatTime } from "../utils/format";

const NFTCard: React.FC<NFTCardProps> = ({ isLive, tokenID, id }) => {
  const {
    NFTAuctionsInfos,
    createAuction,
    offerAuction,
    placeBidAuction,
    claimAuction,
    buyAuctionedNFT,
  } = useGlobalContext();
  const [showNFTAuctioninfo, setShowNFTAuctioninfo] =
    useState<NFTAuctionInfoProps>();
  //const [inputAuctionPrice, setInputAuctionPrice] = useState<number>(0.0);
  const [inputBidAmount, setInputBidAmount] = useState("");
  const [isCreateTX, setIsCreateTX] = useState(false);
  const [isCreateModal, setIsCreateModal] = useState(false);
  const [duration, setDuration] = useState<number>(0);

  // const [update, setUpdate] = useState<boolean>(false);
  // const [duration, setDuration] = useState<number>(0);
  useEffect(() => {
    if (!NFTAuctionsInfos || tokenID === -1 || NFTAuctionsInfos.length === 0)
      return;
    if (!NFTAuctionsInfos[tokenID - 1]) return;
    setShowNFTAuctioninfo(NFTAuctionsInfos[tokenID - 1] as any);
    setDuration(
      Math.trunc(
        (Number(NFTAuctionsInfos[tokenID - 1]?.duration) * 1000 -
          Number(new Date())) /
          1000
      )
    );
  }, [NFTAuctionsInfos, tokenID]);

  useEffect(() => {
    if (isCreateModal === false) setIsCreateTX(false);
  }, [isCreateModal]);

  useEffect(() => {
    if (duration > 0) {
      const interval = setInterval(() => {
        setDuration(duration - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [duration]);

  const onCreateAuction = async () => {
    console.log("-----------creating auction----------");
    try {
      // Set the "isCreateTX" flag to true to indicate that the auction creation process has started
      setIsCreateTX(true);
      // Check if the NFT has already been created
      // Retrieve the necessary information about the NFT
      const { name, description, image } = nftLists[id];
      const tokenURI = `https://eu.starton-ipfs.com/ipfs//bafybeibboc3z6lnp2afaq4r5ivdxspmfhjmdukldikwrbu7n3acqur4wyi/${id}.json`;
      // Create the auction
      if (createAuction) {
        // Call the "createAuction" function to create the new auction
        const success = await createAuction(
          name,
          description,
          image,
          tokenURI,
          id + 1
        );
        // If the auction creation was successful, close the create modal
        if (success) setIsCreateTX(false);
      }
    } catch (error) {
      // Log any errors that occurred during the auction creation process
      console.error(error);
    } finally {
      // Set the "isCreateTX" flag to false to indicate that the auction creation process has completed
      setIsCreateTX(false);
      setIsCreateModal(false);
    }
  };

  const onOfferAuction = async (
    tokenID: number,
    biddable: boolean,
    price: string,
    duration: number
  ) => {
    console.log("-----------offering auction----------");
    try {
      // Set the "isCreateTX" flag to true to indicate that the auction creation process has started
      setIsCreateTX(true);
      // Check if the NFT has already been created
      // Retrieve the necessary information about the NFT
      // Create the auction
      if (offerAuction) {
        // Call the "createAuction" function to create the new auction
        const success = await offerAuction(tokenID, biddable, price, duration);
        // If the auction creation was successful, close the create modal
        if (success) setIsCreateTX(false);
      }
    } catch (error) {
      // Log any errors that occurred during the auction creation process
      console.error(error);
    } finally {
      // Set the "isCreateTX" flag to false to indicate that the auction creation process has completed
      setIsCreateTX(false);
      setIsCreateModal(false);
    }
  };

  const onPlaceBidAuction = async () => {
    console.log("-----------placing bid auction----------");
    try {
      // Set the "isCreateTX" flag to true to indicate that the auction creation process has started
      setIsCreateTX(true);
      // Check if the NFT has already been created
      // Retrieve the necessary information about the NFT
      // Create the auction
      if (placeBidAuction) {
        // Call the "createAuction" function to create the new auction
        const success = await placeBidAuction(tokenID, inputBidAmount);
        // If the auction creation was successful, close the create modal
        if (success) setIsCreateTX(false);
      }
    } catch (error) {
      // Log any errors that occurred during the auction creation process
      console.error(error);
    } finally {
      // Set the "isCreateTX" flag to false to indicate that the auction creation process has completed
      setIsCreateTX(false);
      setIsCreateModal(false);
    }
  };

  const onClaimAuction = async () => {
    console.log("-----------claiming auction----------");
    try {
      // Set the "isCreateTX" flag to true to indicate that the auction creation process has started
      setIsCreateTX(true);
      // Check if the NFT has already been created
      // Retrieve the necessary information about the NFT
      // Create the auction
      if (claimAuction) {
        // Call the "createAuction" function to create the new auction
        const success = await claimAuction(tokenID);
        // If the auction creation was successful, close the create modal
        if (success) setIsCreateTX(false);
      }
    } catch (error) {
      // Log any errors that occurred during the auction creation process
      console.error(error);
    } finally {
      // Set the "isCreateTX" flag to false to indicate that the auction creation process has completed
      setIsCreateTX(false);
      setIsCreateModal(false);
    }
  };

  const onBuyAuctionedNFT = async () => {
    console.log("-----------onBuyAuctionedNFT auction----------");
    try {
      // Set the "isCreateTX" flag to true to indicate that the auction creation process has started
      setIsCreateTX(true);
      // Check if the NFT has already been created
      // Retrieve the necessary information about the NFT
      // Create the auction
      if (buyAuctionedNFT && showNFTAuctioninfo) {
        // Call the "createAuction" function to create the new auction
        const success = await buyAuctionedNFT(tokenID, Number(formatEther(showNFTAuctioninfo.price)).toString());
        // If the auction creation was successful, close the create modal
        if (success) setIsCreateTX(false);
      }
    } catch (error) {
      // Log any errors that occurred during the auction creation process
      console.error(error);
    } finally {
      // Set the "isCreateTX" flag to false to indicate that the auction creation process has completed
      setIsCreateTX(false);
      setIsCreateModal(false);
    }
  };

  return (
    <div className="relative col-span-12 md:col-span-6 lg:col-span-4 2xl:col-span-3 h-full">
      <div className="w-full h-full flex flex-col justify-center items-center">
        {isCreateModal === false ? (
          <></>
        ) : (
          <NFTAuctionCreateModal
            setIsShow={setIsCreateModal}
            executeOfferFunc={onOfferAuction}
            tokenID={tokenID}
            // setDuration={setDuration}
          ></NFTAuctionCreateModal>
        )}
        <div className="relative bg-white p-2 z-10">
          <img alt="avatar" className="w-full" src={nftLists[id].image} />
          <div className="bg-orange-500 text-base absolute left-2 px-2 top-4 text-white">
            {nftLists[id]?.id}
          </div>
          <div className=" absolute w-full right-0 p-2 bottom-0">
            <div className="bg-orange-500 text-[10px] py-2 bottom-[7px] text-white flex justify-center items-center">
              {nftLists[id]?.name}
            </div>
          </div>
          {tokenID > 0 ? (
            <img
              alt="Auction"
              className="w-12 h-10 absolute top-4 right-4"
              src="./images/Auction-Stamp.png"
            ></img>
          ) : (
            <></>
          )}
        </div>
        {tokenID < 0 ||
        !isLive ||
        duration < 0 ||
        !showNFTAuctioninfo?.biddable ? (
          <div className="relative bg-white w-full flex flex-col gap-2 flex-auto z-10 px-5 py-10 justify-center items-center">
            
            {!showNFTAuctioninfo?.biddable && tokenID >= 0 && isLive ? (
                <div className="flex text-xl flex-row justify-between items-center w-full">
              <div className="text-gray-500 text-sm">Current</div>

              <span className="text-gray-500 retro text-base flex gap-1">
                <div>
                  {showNFTAuctioninfo !== undefined
                    ? Number(formatEther(showNFTAuctioninfo.price)).toString()
                    : 0}
                </div>
                LAVA
              </span>
            </div>
            ) : (
              <></>
            )}
            <button
              className="bg-blue-500 2xl:text-base text-white text-sm p-2 text-nowrap w-full z-10 relative flex justify-center h-10"
              onClick={() => {
                tokenID < 0
                  ? onCreateAuction()
                  :  isLive
                  ? duration < 0 && !showNFTAuctioninfo?.biddable
                    ? onClaimAuction()
                    : onBuyAuctionedNFT()
                  : setIsCreateModal(true);
              }}
            >
              {isCreateTX === true ? (
                <Hourglass
                  visible={true}
                  height="20"
                  width="20"
                  ariaLabel="hourglass-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                  colors={["#fff", "#cbcbcb"]}
                />
              ) : (
                `${
                  tokenID < 0
                    ? "Mint Token"
                    :  isLive
                    ? duration < 0 && !showNFTAuctioninfo?.biddable
                      ? "Claim NFT "
                      : "Buy NFT"
                    : "Auction Create"
                }`
              )}
            </button>
          </div>
        ) : (
          <div className="relative bg-white w-full z-10 px-5 py-2">
            <div className="flex justify-between">
              <div className="flex text-xl flex-col justify-start items-center">
                <div className="text-gray-500 system-font text-sm">Bids</div>
                <div>
                  {showNFTAuctioninfo !== undefined
                    ? Number(showNFTAuctioninfo.bids).toFixed(0)
                    : 0}
                </div>
              </div>
              <div className="flex text-xl flex-col justify-start items-center">
                <div className="text-gray-500 system-font text-sm">Current</div>
                <div>
                  {showNFTAuctioninfo !== undefined
                    ? Number(formatEther(showNFTAuctioninfo.price)).toString()
                    : 0}
                </div>
                <span className="text-gray-500 retro text-base system-font">
                  LAVA
                </span>
              </div>
              <div className="flex text-xl flex-col justify-start items-center">
                <div className="text-gray-500 system-font text-sm">
                  Time Remaining
                </div>
                <div>
                  {showNFTAuctioninfo !== undefined ? formatTime(duration!) : 0}
                </div>
              </div>
            </div>
            <div className="flex py-2">
              <div className="">
                <input
                  className="bg-orange-500 text-white text-sm 2xl:text-base outline-none p-2 w-full placeholder:text-gray-300"
                  placeholder="0.01 LAVA"
                  value={inputBidAmount}
                  onChange={(e) => setInputBidAmount(e.target.value)}
                ></input>
              </div>
              {isCreateTX === true ? (
                <Hourglass
                  visible={true}
                  height="20"
                  width="20"
                  ariaLabel="hourglass-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                  colors={["#fff", "#cbcbcb"]}
                />
              ) : (
                <button
                  className="bg-black 2xl:text-base text-white text-sm p-2 flex justify-center items-center text-nowrap"
                  onClick={() => {
                    onPlaceBidAuction();
                  }}
                >
                  Place Bid
                </button>
              )}
            </div>
            <div className="text-gray-500 retro text-sm px-2">
              Auction 1405/10000
            </div>
          </div>
        )}
      </div>
      <div className="bg-orange-700 absolute left-2 top-2 w-full h-full -z-0"></div>
    </div>
  );
};

export default NFTCard;
