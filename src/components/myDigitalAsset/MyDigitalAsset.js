import React, { useState, useEffect } from "react";
import ListItems from "../ListItems";


const MyDigitalAsset = ({getMyDigit}) => {

    const [nfts, setNfts] = useState([])

    useEffect(() => {
        getMyDigit().then((res) => {           
            setNfts(res)
        })
    }, [])

    return (
        <ListItems nfts={nfts} />
    );
}

export default MyDigitalAsset;