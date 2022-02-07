import React, { useEffect, useState } from 'react';
import logo from '../logo.png';
import './App.css';
import Web3 from 'web3';
import Navbar from './Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Main from './Main';
import SellDigitalAsset from './sellDigitalAsset/SellDigitalAsset';
import MyDigitalAsset from './myDigitalAsset/MyDigitalAsset';
import Dashboard from './dashboard/Dashboard';
import NFT from '../abis/NFT.json'
import NFTMarket from '../abis/NFTMarket.json';
import axios from 'axios';
import { ethers } from 'ethers';

import { useHistory } from 'react-router'




const App = () => {

  const history = useHistory()


  const [account, setAccount] = useState('')
  const [nfts, setNfts] = useState([])
  const [loadingState, setLoadingState] = useState('not-loaded')
  const [nFtContract, setNFtContract] = useState([])
  const [nFtMarketContract, setNFtMarketContract] = useState([])
  const [nFtAddress, setNFTAddress] = useState('')
  const [web3, setWeb3] = useState([])



  useEffect(() => {
    loadBlockchainData()
  }, [])




  const loadBlockchainData = async () => {

    if (typeof window.ethereum === 'undefined') {
      window.alert('Please install MetaMask')
      return
    }

    await window.ethereum.enable()
    const web3 = new Web3(window.ethereum)
    setWeb3(web3)
    const accounts = await web3.eth.getAccounts()
    setAccount(accounts[0])

    const networkId = await web3.eth.net.getId()
    const networkDataNFTMarket = await NFTMarket.networks[networkId];
    const networkDataNFT = await NFT.networks[networkId];
    const marketContract = new web3.eth.Contract(NFTMarket.abi, networkDataNFTMarket.address)
    const tokenContract = new web3.eth.Contract(NFT.abi, networkDataNFT.address)
    setNFTAddress(networkDataNFT.address)
    setNFtContract(tokenContract)
    setNFtMarketContract(marketContract)

    const data = await marketContract.methods.fetchMarketItems().call()

    const items = await Promise.all(data.map(async i => {
      const tokenUri = await tokenContract.methods.tokenURI(i.tokenId).call()
      const meta = await axios.get(tokenUri)

      let price = ethers.utils.formatUnits(i.price.toString(), 'ether')

      console.log('price', price);
      let item = {
        price,
        tokenId: i.tokenId,
        seller: i.seller,
        owner: i.owner,
        image: meta.data.image,
        name: meta.data.name,
        description: meta.data.description,
      }
      return item
    }))

    setNfts(items)
  }



  const buyNft = async (nft) => {
    
    try{

      let price = web3.utils.toWei(nft.price, 'ether')
      console.log(nFtAddress , nft.tokenId);
      const transaction = await nFtMarketContract.methods.createMarketSale(nFtAddress, nft.tokenId).send({ from: account, value: price })
   
      window.location.reload();

    }catch(e)
    {

    }

  }
 

    const createSale = async (url, description, amount) => {
    console.log('createSale', url, description, amount);
    try {

      /* next, create the item */
      let transaction = await nFtContract.methods.createToken(url).send({ from: account })

      let tokenId = transaction.events.Transfer.returnValues.tokenId
      const price = web3.utils.toWei(amount, 'ether')

     
      // /* then list the item for sale on the marketplace */      
      let listingPrice = await nFtMarketContract.methods.getListingPrice().call()
      listingPrice = listingPrice.toString()
      console.log(price , listingPrice);
      transaction = await nFtMarketContract.methods.createMarketItem(nFtAddress, tokenId, price).send({ from: account, value: listingPrice })
      
      window.location.reload();
 

    } catch (e) {
      console.log('Error, createSale: ', e)
      return
    }



  }


  const fetchItemsCreated = async () => {

    console.log(nFtMarketContract);
    const data = await nFtMarketContract.methods.fetchItemsCreated().call({ from: account })


    console.log('data =', data);
    const items = await Promise.all(data.map(async i => {
      const tokenUri = await nFtContract.methods.tokenURI(i.tokenId).call()
      const meta = await axios.get(tokenUri)

      let price = ethers.utils.formatUnits(i.price.toString(), 'ether')


      let item = {
        price,
        tokenId: i.tokenId,
        seller: i.seller,
        owner: i.owner,
        image: meta.data.image,
        name: meta.data.name,
        description: meta.data.description,
        sold: i.sold
      }
      return item
    }))
    return items
  }


  const getMyDigit = async () => {


    const data = await nFtMarketContract.methods.fetchMyNFTs().call({ from: account })
    console.log(data);
    const items = await Promise.all(data.map(async i => {
      const tokenUri = await nFtContract.methods.tokenURI(i.tokenId).call()
      const meta = await axios.get(tokenUri)

      let price = ethers.utils.formatUnits(i.price.toString(), 'ether')

      console.log('price', price);
      let item = {
        price,
        tokenId: i.tokenId,
        seller: i.seller,
        owner: i.owner,
        image: meta.data.image,
        name: meta.data.name,
        description: meta.data.description,
      }
      return item
    }))
    return items
  }

  return (
    <Router>
      <Navbar account={account} />

      <div className="container mt-5">


        <Switch>
          <Route exact path="/">
            <Main nfts={nfts} buyNft={buyNft}/>
          </Route>
          <Route path="/SellDigital">
            <SellDigitalAsset createSale={createSale} />
          </Route>
          <Route path="/MyDigital">
            <MyDigitalAsset getMyDigit={getMyDigit} />
          </Route>
          <Route path="/CreatorDashboard">
            <Dashboard fetchItemsCreated={fetchItemsCreated} />
          </Route>
        </Switch>




      </div>


    </Router>
  );
}

export default App;
