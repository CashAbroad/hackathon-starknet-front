'use client';
import { FC,  useState } from 'react';
import { shortenAddress } from '@/lib/utils';
import axios from 'axios';

const Page: FC = () => {
  const [copied, setCopied] = useState(false);
  const [hasWallet, setHasWallet] = useState(false);
  const [address, setAddress] = useState("");
  const [openTransfer, setOpenTransfer] = useState(false);
  const [openSwap, setOpenSwap] = useState(false);
  const [copiedToken1, setCopiedToken1] = useState(false);
  const [copiedToken2, setCopiedToken2] = useState(false);
  const [walletLoader, setWalletLoader] = useState(false);
  const [walletError, setWalletError] = useState(false);

  const handleCopy = async (textToCopy: string) => {
    setCopied(true);
    try {
      await navigator.clipboard.writeText(textToCopy);
      setTimeout(() => setCopied(false), 2000); 
    } catch (err) {
      console.error('Error al copiar: ', err);
    }
  };

  const handleCopyToken1 = async (textToCopy: string) => {
    setCopiedToken1(true);
    try {
      await navigator.clipboard.writeText(textToCopy);
      setTimeout(() => setCopiedToken1(false), 2000); 
    } catch (err) {
      console.error('Error al copiar: ', err);
    }
  };

  const handleCopyToken2 = async (textToCopy: string) => {
    setCopiedToken2(true);
    try {
      await navigator.clipboard.writeText(textToCopy);
      setTimeout(() => setCopiedToken2(false), 2000); 
    } catch (err) {
      console.error('Error al copiar: ', err);
    }
  };

  const createWallet = async () => {
    setWalletLoader(true);
    console.log("entro a create wallet")
    const baseURL = "https://us-central1-cashabroad-dev.cloudfunctions.net";
    console.log(baseURL)
    try {
      const {data, status, statusText} = await axios.post(`${baseURL}/api/wallets/?chain=ethereum`, {});
      if (data.wallet) {
        setAddress(data.wallet)
        setTimeout(() => {
          setHasWallet(true);
          setWalletLoader(false);
        }, 3000);
      } else {
        setWalletError(true)
        setTimeout(() => {
          setWalletLoader(false);
          setHasWallet(false);
          setWalletError(false);
        }, 3000);
        throw new Error("An error has ocurred");
      }
    } catch (error) {
      console.log(error);
    }
  }
  
 
  return (
    <div className="min-h-screen bg-[#E5E7EB] p-4 flex flex-col items-center w-full">
      <div className="w-[70%] h-auto p-4 flex flex-col items-center gap-2">
      {/**CREATE WALLET COMPONENT**/}
        {!hasWallet && (
          <div className="w-full p-4 h-auto flex flex-col gap-2 rounded-lg bg-[#FCFCFC] border border-solid border-[#F3F4F6]">
          <div className="w-full h-auto flex items-center justify-between">
              <div className="flex gap-2 w-auto h-auto items-center">
                  {(!hasWallet && !walletLoader && !walletError) && (
                    <div onClick={createWallet} className="flex w-auto h-auto items-center gap-2 cursor-pointer">
                    <div className='w-auto h-auto p-2 flex items-centern rounded-lg bg-[#EAEAFF]'>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="rgba(124,103,255,1)"><path fill="none" d="M0 0h24v24H0z"></path><path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path></svg>
                    </div>
                    <p className="text-lg font-normal text-[#5A43EB]">Create wallet</p>
                  </div>
                  )}
                  {(!hasWallet && walletLoader && !walletError) && (
                     <div onClick={createWallet} className="flex w-auto h-auto items-center gap-2 cursor-pointer">
                       <p className="text-lg font-normal text-[#5A43EB] animate-pulse">We are creating your wallet...</p>
                     </div>
                  )}
                  {(!hasWallet && !walletLoader && walletError) && (
                     <div onClick={createWallet} className="flex w-auto h-auto items-center gap-2 cursor-pointer">
                       <p className="text-lg font-normal text-[#7C67FF] animate-pulse">There was an error creating your wallet</p>
                     </div>
                  )}
              </div>
          </div>
        </div>
        )}
         {/**WALLET COMPONENT**/}
        {hasWallet && (
          <div className="w-full p-4 h-auto flex flex-col gap-2 rounded-lg bg-[#FCFCFC] border border-solid border-[#F3F4F6]">
          <div className="w-full h-auto flex items-center justify-between">
              <div className="w-auto h-auto flex flex-col gap-1 items-star">
                <p className="text-xl font-medium text-[#111827]">Account 1</p>
                <div className="w-auto h-auto flex items-center gap-1">
                  <p className="text-[14px] font-normal text-[#4B5563]">{shortenAddress(address)}</p>
                  {!copied && (
                    <svg className="cursor-pointer" onClick={() => handleCopy(address)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="rgba(75,85,99,1)"><path fill="none" d="M0 0h24v24H0z"></path><path d="M6.9998 6V3C6.9998 2.44772 7.44752 2 7.9998 2H19.9998C20.5521 2 20.9998 2.44772 20.9998 3V17C20.9998 17.5523 20.5521 18 19.9998 18H16.9998V20.9991C16.9998 21.5519 16.5499 22 15.993 22H4.00666C3.45059 22 3 21.5554 3 20.9991L3.0026 7.00087C3.0027 6.44811 3.45264 6 4.00942 6H6.9998ZM5.00242 8L5.00019 20H14.9998V8H5.00242ZM8.9998 6H16.9998V16H18.9998V4H8.9998V6Z"></path></svg>
                  )
                  }
                  {
                    copied && (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="rgba(34,197,94,1)"><path fill="none" d="M0 0h24v24H0z"></path><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM17.4571 9.45711L11 15.9142L6.79289 11.7071L8.20711 10.2929L11 13.0858L16.0429 8.04289L17.4571 9.45711Z"></path></svg>
                    )
                  }
                </div>
              </div>
              <div className="flex gap-2 w-auto h-auto items-center">
                  <div className="flex flex-col w-auto h-auto items-center gap-1 cursor-pointer">
                    <div className='w-auto h-auto p-2 flex items-centern rounded-lg bg-[#EAEAFF]'>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="rgba(124,103,255,1)"><path fill="none" d="M0 0h24v24H0z"></path><path d="M13.0001 16.1716L18.3641 10.8076L19.7783 12.2218L12.0001 20L4.22192 12.2218L5.63614 10.8076L11.0001 16.1716V4H13.0001V16.1716Z"></path></svg>
                    </div>
                    <p className="text-xs font-normal text-[#5A43EB]">Receive</p>
                  </div>
    
                  <div className="flex flex-col w-auto h-auto items-center gap-1 cursor-pointer">
                    <div className='w-auto h-auto p-2 flex items-centern rounded-lg bg-[#EAEAFF]'>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="rgba(124,103,255,1)"><path fill="none" d="M0 0h24v24H0z"></path><path d="M21.7267 2.95694L16.2734 22.0432C16.1225 22.5716 15.7979 22.5956 15.5563 22.1126L11 13L1.9229 9.36919C1.41322 9.16532 1.41953 8.86022 1.95695 8.68108L21.0432 2.31901C21.5716 2.14285 21.8747 2.43866 21.7267 2.95694ZM19.0353 5.09647L6.81221 9.17085L12.4488 11.4255L15.4895 17.5068L19.0353 5.09647Z"></path></svg>
                    </div>
                    <p className="text-xs font-normal text-[#5A43EB]">Transfer</p>
                  </div>
                  <div className="flex flex-col w-auto h-auto items-center gap-1 cursor-pointer">
                    <div className='w-auto h-auto p-2 flex items-centern rounded-lg bg-[#EAEAFF]'>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="rgba(124,103,255,1)"><path fill="none" d="M0 0h24v24H0z"></path><path d="M12.0049 22.0027C6.48204 22.0027 2.00488 17.5256 2.00488 12.0027C2.00488 6.4799 6.48204 2.00275 12.0049 2.00275C17.5277 2.00275 22.0049 6.4799 22.0049 12.0027C22.0049 17.5256 17.5277 22.0027 12.0049 22.0027ZM12.0049 20.0027C16.4232 20.0027 20.0049 16.421 20.0049 12.0027C20.0049 7.58447 16.4232 4.00275 12.0049 4.00275C7.5866 4.00275 4.00488 7.58447 4.00488 12.0027C4.00488 16.421 7.5866 20.0027 12.0049 20.0027ZM7.00488 13.0027H16.0049V15.0027H12.0049V18.0027L7.00488 13.0027ZM12.0049 9.00275V6.00275L17.0049 11.0027H8.00488V9.00275H12.0049Z"></path></svg>
                    </div>
                    <p className="text-xs font-normal text-[#5A43EB]">Swap</p>
                  </div>
              </div>
          </div>
        </div>
        )}
        {/**TOKENS**/}
        {hasWallet && (
          <div className="w-full h-auto flex flex-col items-start">
          <div className="w-auto h-[52px] p-4 flex gap-1 items-center justify-center bg-[#FCFCFC] border border-1 border-solid border-[#F3F4F6] rounded-[8px_8px_0px_0px]">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="rgba(17,24,39,1)"><path fill="none" d="M0 0h24v24H0z"></path><path d="M9 12.5 6.5 15 9 17.5 11.5 15 9 12.5ZM15 2.5C11.5724 2.5 8.76444 5.15304 8.51763 8.51763 5.15304 8.76445 2.5 11.5724 2.5 15 2.5 18.5899 5.41015 21.5 9 21.5 12.4276 21.5 15.2356 18.847 15.4824 15.4824 18.847 15.2356 21.5 12.4276 21.5 9 21.5 5.41015 18.5899 2.5 15 2.5ZM15.3234 13.4886C14.7575 11.1126 12.8874 9.24245 10.5114 8.67665 10.6772 6.34229 12.6234 4.5 15 4.5 17.4853 4.5 19.5 6.51472 19.5 9 19.5 11.3766 17.6577 13.3228 15.3234 13.4886ZM13.5 15C13.5 17.4853 11.4853 19.5 9 19.5 6.51472 19.5 4.5 17.4853 4.5 15 4.5 12.5147 6.51472 10.5 9 10.5 11.4853 10.5 13.5 12.5147 13.5 15ZM3 7C3 4.79086 4.79086 3 7 3H8.5V5H7C5.89543 5 5 5.89543 5 7V8.5H3V7ZM19 17V15.5H21V17C21 19.2091 19.2091 21 17 21H15.5V19H17C18.1046 19 19 18.1046 19 17Z"></path></svg>
            <p className="text-[16px] font-medium text-[#111827]">Tokens</p>
          </div>
          <div className="w-full h-auto bg-[#FCFCFC] flex flex-col p-4 gap-2 rounded-tr-[8px] rounded-br-[8px] rounded-bl-[8px]">
            <div className="w-full h-[84px] p-4 flex items-center justify-between bg-[#FCFCFC] rounded-lg border border-[#E5E7EB]">
              <div className="w-auto h-auto flex flex-col gap-1 items-star">
                <p className="text-lg font-medium text-[#111827]">ETH</p>
                <div className="w-auto h-auto flex items-center gap-1">
                  <p className="text-[14px] font-normal text-[#4B5563]">{shortenAddress("0xd5CBa994c06B223906a9B9bcE2542Bc6FA6e3060")}</p>
                  {!copiedToken1 && (
                    <svg className="cursor-pointer" onClick={() => handleCopyToken1('0xd5CBa994c06B223906a9B9bcE2542Bc6FA6e3060')} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="rgba(75,85,99,1)"><path fill="none" d="M0 0h24v24H0z"></path><path d="M6.9998 6V3C6.9998 2.44772 7.44752 2 7.9998 2H19.9998C20.5521 2 20.9998 2.44772 20.9998 3V17C20.9998 17.5523 20.5521 18 19.9998 18H16.9998V20.9991C16.9998 21.5519 16.5499 22 15.993 22H4.00666C3.45059 22 3 21.5554 3 20.9991L3.0026 7.00087C3.0027 6.44811 3.45264 6 4.00942 6H6.9998ZM5.00242 8L5.00019 20H14.9998V8H5.00242ZM8.9998 6H16.9998V16H18.9998V4H8.9998V6Z"></path></svg>
                  )
                  }
                  {
                    copiedToken1 && (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="rgba(34,197,94,1)"><path fill="none" d="M0 0h24v24H0z"></path><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM17.4571 9.45711L11 15.9142L6.79289 11.7071L8.20711 10.2929L11 13.0858L16.0429 8.04289L17.4571 9.45711Z"></path></svg>
                    )
                  }
                </div>
              </div>
              <div className="w-auto h-auto flex flex-col gap-1 items-star">
                <p className="text-lg font-normal text-[#4B5563]">$0</p>
              </div>
          </div>
          <div className="w-full h-[84px] p-4 flex items-center justify-between bg-[#FCFCFC] rounded-lg border border-[#E5E7EB]">
             <div className="w-auto h-auto flex flex-col gap-1 items-star">
                <p className="text-lg font-medium text-[#111827]">STRK</p>
                <div className="w-auto h-auto flex items-center gap-1">
                  <p className="text-[14px] font-normal text-[#4B5563]">{shortenAddress("0xdC6Ded51510D8dA61253C069326DCc2255a79890")}</p>
                  {!copiedToken2 && (
                    <svg className="cursor-pointer" onClick={() => handleCopyToken2('0xdC6Ded51510D8dA61253C069326DCc2255a79890')} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="rgba(75,85,99,1)"><path fill="none" d="M0 0h24v24H0z"></path><path d="M6.9998 6V3C6.9998 2.44772 7.44752 2 7.9998 2H19.9998C20.5521 2 20.9998 2.44772 20.9998 3V17C20.9998 17.5523 20.5521 18 19.9998 18H16.9998V20.9991C16.9998 21.5519 16.5499 22 15.993 22H4.00666C3.45059 22 3 21.5554 3 20.9991L3.0026 7.00087C3.0027 6.44811 3.45264 6 4.00942 6H6.9998ZM5.00242 8L5.00019 20H14.9998V8H5.00242ZM8.9998 6H16.9998V16H18.9998V4H8.9998V6Z"></path></svg>
                  )
                  }
                  {
                    copiedToken2 && (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="rgba(34,197,94,1)"><path fill="none" d="M0 0h24v24H0z"></path><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM17.4571 9.45711L11 15.9142L6.79289 11.7071L8.20711 10.2929L11 13.0858L16.0429 8.04289L17.4571 9.45711Z"></path></svg>
                    )
                  }
                </div>
              </div>
              <div className="w-auto h-auto flex flex-col gap-1 items-star">
                <p className="text-lg font-normal text-[#4B5563]">$0</p>
              </div>
          </div>
        </div>
        </div>
        )}
      {/**TRANSFER COMPONENT**/}
      {(hasWallet && openTransfer) && (
        <div className="w-[60%] h-auto bg-[#FCFCFC] flex flex-col items-center p-4 gap-4 rounded-lg rounded-bl-[8px]">
          <div className="w-full h-auto flex items-center justify-between">
            <div className="w-auto h-auto flex items-center cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="rgba(17,24,39,1)"><path fill="none" d="M0 0h24v24H0z"></path><path d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z"></path></svg>
            </div>
             <div className="w-auto flex flex-col gap-1">
               <div className="w-auto h-auto flex flex-col gap-1 items-star">
                  <p className="text-xl font-medium text-[#111827]">Account 1</p>
                  <div className="w-auto h-auto flex items-center gap-1">
                    <p className="text-[14px] font-normal text-[#4B5563]">0x56....E74c</p>
                      {!copied && (
                        <svg className="cursor-pointer" onClick={() => handleCopy('0x567eB810xft67D5')} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="rgba(75,85,99,1)"><path fill="none" d="M0 0h24v24H0z"></path><path d="M6.9998 6V3C6.9998 2.44772 7.44752 2 7.9998 2H19.9998C20.5521 2 20.9998 2.44772 20.9998 3V17C20.9998 17.5523 20.5521 18 19.9998 18H16.9998V20.9991C16.9998 21.5519 16.5499 22 15.993 22H4.00666C3.45059 22 3 21.5554 3 20.9991L3.0026 7.00087C3.0027 6.44811 3.45264 6 4.00942 6H6.9998ZM5.00242 8L5.00019 20H14.9998V8H5.00242ZM8.9998 6H16.9998V16H18.9998V4H8.9998V6Z"></path></svg>
                      )}
                      {copied && (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="rgba(34,197,94,1)"><path fill="none" d="M0 0h24v24H0z"></path><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM17.4571 9.45711L11 15.9142L6.79289 11.7071L8.20711 10.2929L11 13.0858L16.0429 8.04289L17.4571 9.45711Z"></path></svg>
                      )}
                  </div>
               </div>
            </div>
            <div className="w-2 h-2"></div>
          </div>
          <div className="w-auto px-4 py-2 rounded-[25px] bg-[#DBEAFE] flex items-center">
            <p className="text-[16px] font-medium text-[#3B82F6] w-full text-center">Token</p>
          </div>
          <div className="w-[90%] h-auto flex flex-col gap-2 items-start">
            <p className="text-[14px] font-medium text-[#111827]">To Address</p>
            <div className="w-full h-[52px] flex flex-col items-start bg-transparent border border-[#E5E7EB] p-[15px_0px_15px_15px] text-[14px] rounded-lg">
                <input
                  className="bg-transparent focus:outline-none focus:ring-0 w-full placeholder-[#D2D5DA] text-[#111827]"
                  type="text"
                  placeholder="0x061991f96561db0da57ae91acf1df98b80251f7ec5155e35c169e862"
                />
            </div>

          </div>
          <div className="w-[90%] h-auto flex flex-col gap-2 items-start">
            <div className="w-full flex justify-between items-center">
              <p className="text-[14px] font-medium text-[#111827]">Amount</p>
              <p className="text-[12px] font-medium text-[#6D7280]">Token Balance: 0.00001</p>
            </div>
            <div className="w-full h-[52px] flex flex-col items-start bg-transparent border border-[#E5E7EB] p-[15px_0px_15px_15px] text-[14px] rounded-lg">
                <input
                  className="bg-transparent focus:outline-none focus:ring-0 w-full placeholder-[#D2D5DA] text-[#111827]"
                  type="text"
                  placeholder="0.0"
                />
            </div>
            
          </div>
          <div className="w-[90%] h-auto flex flex-col gap-2 items-start mt-4">
            <div className="w-full flex justify-between items-center">
              <p className="text-[16px] font-medium text-[#111827]">Pay Gas Fee</p>
              <p className="text-[14px] font-medium text-[#6D7280]">~&lt;0.000001 Token</p>
            </div>
             <div className="w-full flex justify-between items-center">
              <p className="text-[16px] font-medium text-[#111827]">Total</p>
              <p className="text-[14px] font-medium text-[#6D7280]">0.000002 Token</p>
            </div>
          </div>
          <div className="w-full h-auto flex flex-col items-center mt-5">
            <div className="w-[180px] h-[52px] bg-[#111827] py-2 flex items-center justify-center gap-1 rounded-[30px] cursor-pointer hover:bg-[#5A43EB]">
                <p className="text-[14px] font-medium text-[#FCFCFC]">Send Transfer</p>
            </div>
          </div>
      </div>
      )
      }
      {/**EXCHANGE**/}
      {(openSwap && hasWallet) && (
        <div className="w-[60%] h-auto bg-[#FCFCFC] flex flex-col items-center p-4 gap-4 rounded-lg rounded-bl-[8px]">
          <div className="w-full h-auto flex items-center justify-between">
            <div className="w-auto h-auto flex items-center cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="rgba(17,24,39,1)"><path fill="none" d="M0 0h24v24H0z"></path><path d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z"></path></svg>
            </div>
             <div className="w-auto flex flex-col gap-1">
               <div className="w-auto h-auto flex flex-col gap-1 items-star">
                  <p className="text-xl font-medium text-[#111827]">Account 1</p>
                  <div className="w-auto h-auto flex items-center gap-1">
                    <p className="text-[14px] font-normal text-[#4B5563]">0x56....E74c</p>
                      {!copied && (
                        <svg className="cursor-pointer" onClick={() => handleCopy('0x567eB810xft67D5')} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="rgba(75,85,99,1)"><path fill="none" d="M0 0h24v24H0z"></path><path d="M6.9998 6V3C6.9998 2.44772 7.44752 2 7.9998 2H19.9998C20.5521 2 20.9998 2.44772 20.9998 3V17C20.9998 17.5523 20.5521 18 19.9998 18H16.9998V20.9991C16.9998 21.5519 16.5499 22 15.993 22H4.00666C3.45059 22 3 21.5554 3 20.9991L3.0026 7.00087C3.0027 6.44811 3.45264 6 4.00942 6H6.9998ZM5.00242 8L5.00019 20H14.9998V8H5.00242ZM8.9998 6H16.9998V16H18.9998V4H8.9998V6Z"></path></svg>
                      )}
                      {copied && (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="rgba(34,197,94,1)"><path fill="none" d="M0 0h24v24H0z"></path><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM17.4571 9.45711L11 15.9142L6.79289 11.7071L8.20711 10.2929L11 13.0858L16.0429 8.04289L17.4571 9.45711Z"></path></svg>
                      )}
                  </div>
               </div>
            </div>
            <div className="w-2 h-2"></div>
          </div>
          <p className="text-lg font-medium text-[#111827] w-full text-center">Swap</p>
          <div className="w-[90%] h-auto flex flex-col gap-2 items-start">
            <div className="w-full h-auto flex items-start justify-between bg-transparent border border-[#E5E7EB] p-4 rounded-lg">
              <div className="w-auto h-auto flex flex-col items-start">
                <p className="text-[12px] font-normal text-[#6D7280]">From</p>
                <p className="text-[18px] font-medium text-[#111827]">Token</p>
                <p className="text-[12px] font-normal text-[#6D7280]">Network</p>
              </div>
               <div className="w-auto h-auto flex flex-col items-end">
                <p className="text-[12px] font-normal text-[#6D7280]">Token Balance: 0.001</p>
                <input
                  className="bg-transparent focus:outline-none focus:ring-0 w-full text-right placeholder-[#D2D5DA] text-[#111827] text-[18px]"
                  type="text"
                  placeholder="0"
                />
               </div>
                {/* <input
                  className="bg-transparent focus:outline-none focus:ring-0 w-full placeholder-[#D2D5DA] text-[#111827]"
                  type="text"
                  placeholder="0x061991f96561db0da57ae91acf1df98b80251f7ec5155e35c169e862"
                /> */}
            </div>
            <div className="w-full h-auto flex items-center justify-center p-5">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="rgba(109,114,128,1)"><path fill="none" d="M0 0h24v24H0z"></path><path d="M11.9498 7.94975L10.5356 9.36396L8.00079 6.828L8.00004 20H6.00004L6.00079 6.828L3.46451 9.36396L2.05029 7.94975L7.00004 3L11.9498 7.94975ZM21.9498 16.0503L17 21L12.0503 16.0503L13.4645 14.636L16.0008 17.172L16 4H18L18.0008 17.172L20.5356 14.636L21.9498 16.0503Z"></path></svg>
            </div>
            <div className="w-full h-auto flex items-center justify-between bg-transparent border border-[#E5E7EB] p-4 rounded-lg">
              <div className="w-auto h-auto flex flex-col items-start">
                <p className="text-[12px] font-normal text-[#6D7280]">To</p>
                <p className="text-[18px] font-medium text-[#111827]">Token</p>
                <p className="text-[12px] font-normal text-[#6D7280]">Network</p>
              </div>
               <div className="w-auto h-auto flex flex-col items-end">
                <input
                  className="bg-transparent focus:outline-none focus:ring-0 w-full text-right placeholder-[#D2D5DA] text-[#111827] text-[18px]"
                  type="text"
                  placeholder="0"
                />
               </div>

            </div>
          </div>
          <div className="w-full h-auto flex flex-col items-center mt-5">
            <div className="w-[180px] h-[52px] bg-[#111827] py-2 flex items-center justify-center gap-1 rounded-[30px] cursor-pointer hover:bg-[#5A43EB]">
                <p className="text-[14px] font-medium text-[#FCFCFC]">Make Swap</p>
            </div>
          </div>
      </div>
      )}
    </div>
    </div >
  );
};

export default Page;