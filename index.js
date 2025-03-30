import { ethers } from "https://unpkg.com/ethers@5.7.2/dist/ethers.esm.min.js";
import { abi ,contractAddress} from "./constants.js";

const connectButton = document.getElementById("connect");
connectButton.onclick = connect;

const fundButton = document.getElementById("fund");
fundButton.onclick = fund;

const balanceButton = document.getElementById("getBalance");
balanceButton.onclick = checkbalance;

console.log(ethers);


async function connect() {
    if(typeof window.ethereum!=="undefined"){
            await window.ethereum.request({method:"eth_requestAccounts"});
            document.getElementById("connect").innerHTML="Connected";
    }else{
        document.getElementById("connect").innerHTML="Install Metamask";
    }
}
//to check balance
async function checkbalance(){
    if(typeof window.ethereum!=="undefined"){
        const provider=new ethers.providers.Web3Provider(window.ethereum);
        const balance=await provider.getBalance("Provide account address here");
        // Use value instead of innerHTML for input elements
        document.getElementById("balance").value = ethers.utils.formatEther(balance);
        console.log(ethers.utils.formatEther(balance));
    }

}

//for fund 
async function fund(){
    const ethAmount=document.getElementById("ethAmount").value;
    console.log(`Funding with ${ethAmount}...`);
    if(typeof window.ethereum!=="undefined"){
        //we need provider/connection to blockchain
        //signer/wallet/someone with some gas
        //contract that we are interacting with
        //^ Abi and it s address
        const provider=new ethers.providers.Web3Provider(window.ethereum);
        const signer=provider.getSigner();
        console.log(signer);
        const contract=new ethers.Contract(contractAddress,abi,signer);
        console.log(contract);
        const transcationResponse=await contract.fund({
            value:ethers.utils.parseEther("0.0000001"),
        })
    }
}

