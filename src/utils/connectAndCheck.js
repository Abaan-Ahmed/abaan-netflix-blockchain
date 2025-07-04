import { ethers } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../constants/contract";

export const connectAndCheckSubscription = async () => {
  if (!window.ethereum) {
    alert("MetaMask is not installed");
    return { success: false, message: "MetaMask not found" };
  }

  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    await window.ethereum.request({ method: "eth_requestAccounts" });

    const signer = await provider.getSigner();
    const userAddress = await signer.getAddress();

    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
    const subscribed = await contract.isSubscribed(userAddress);

    return {
      success: true,
      subscribed,
      address: userAddress
    };
  } catch (err) {
    console.error(err);
    return { success: false, message: "Connection failed" };
  }
};
