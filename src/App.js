import './App.css';
import web3 from './web3';
import React, { useState,useEffect } from "react";
import {tokenaddress,abi,contractaddress,stakingabi} from './abi';
import {useRef} from "react";

function App() {

const[walletconnect,setwalletconnect] = useState("");
const[stak_e,setstake] = useState("");
const[un_stake,setunstake] = useState("");
const[claim_reward,setclaimreward] = useState("");
const[amount,setAmount]=useState("");
const inputamt=useRef(null);
const stakeamount=useRef(null);
const unstakeamount=useRef(null);
const amt=useRef(null);
  
  const erc20contract = new web3.eth.Contract(abi, tokenaddress);
  const stakingcontract = new web3.eth.Contract(stakingabi,contractaddress);

  const connect = async()=>{
    let accounts=await web3.eth.getAccounts();
    
    // web3.eth.getChainId().then(console.log);
    // const networkid=await web3.eth.getChainId();
    // console.log("network id",networkid);
     await web3.eth.getAccounts().then(()=>{          
         console.log("acc Ethereum",accounts[0])
         setwalletconnect(accounts[0])
         window.wallet=accounts[0];
        
        localStorage.setItem("wallet",accounts[0])
        //sessionStorage.setItem("wallet", accounts[0]);
       })
  }
// stake
const stake = async() =>{
    const accounts = await web3.eth.getAccounts();
    let a = await stakingcontract.methods.stake(stakeamount.current.value).send({from:accounts[0]});
setstake(a);
}

// unstake
const unstake = async() =>{
  const accounts = await web3.eth.getAccounts();
  let b = await stakingcontract.methods.unstake(unstakeamount.current.value).send({from:accounts[0]});
  setunstake(b);
}

//getreward
const claimreward = async() =>{
  const accounts = await web3.eth.getAccounts();
  let c = await stakingcontract.methods.claimreward().send({from:accounts[0]});
  setclaimreward(c);
}

const approve = async()=>{
  const accounts = await  web3.eth.getAccounts();
  await erc20contract.methods.approve("0x9C93C4Ef675505a2c1091EbeaE5628E1904dfE8A",web3.utils.toBN(1000000000000)).send({from:accounts[0]});
}

function handlestaking(){
  console.log("STAKING..");
  console.log(stakeamount.current.value);
  let d = stakeamount.current.value*(10**9);
  setAmount(d*100000000000);
  stake(d);
} 



  return (
    <div className="App">
     <br/><br/>
     <button onClick={connect}>Connect Wallet</button>&nbsp;&nbsp;
     <button onClick={approve}>Approve</button>&nbsp;&nbsp;
     <button onClick={handlestaking}>Stake</button>&nbsp;&nbsp;
     <button onClick={unstake}>Unstake</button>&nbsp;&nbsp;
     <button onClick={claimreward}>claimreward</button>&nbsp;&nbsp;
     <br/>

     <label>Stake</label>
     <input  ref = {stakeamount}type="text" id="stakeamount" name="address"/><br/><br/>

     <label>Unstake</label>&nbsp;&nbsp;
     <input ref = {unstakeamount}type="text"id="amt"name="unstakeamount"/>&nbsp;&nbsp;

     
    </div>

  );
  }
export default App;