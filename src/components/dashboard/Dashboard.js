import React, { useState, useEffect } from "react";
import { Tab, Tabs } from "react-bootstrap";
import ListItems from "../ListItems";


const Dashboard = ({ fetchItemsCreated }) => {

  const [nfts, setNfts] = useState([])
  const [sold, setSold] = useState([])

  useEffect(() => {

    fetchItemsCreated().then((items) => {
      const soldItems = items.filter(i => i.sold)
      console.log("item", items);
      console.log("sold", soldItems);

      setSold(soldItems)
      setNfts(items)
    })
  }, [])

  return (
    <Tabs>
      <Tab eventKey="Create" title="List Of Create NFT">
        <ListItems nfts={nfts} />
      </Tab>
      <Tab eventKey="Sold" title="List Of Sold NFT">
        <ListItems nfts={sold} />
      </Tab>
    </Tabs>
  );
}

export default Dashboard;
