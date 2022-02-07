import React, { useState } from "react";
import { create } from 'ipfs-http-client'
import Loader from "react-loader-spinner";


const client = create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })
//const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

const SellDigitalAsset = ({ createSale }) => {

    const [fileUrl, setFileUrl] = useState(null)
    const [formInput, updateFormInput] = useState({ price: '', name: '', description: '' })
    const [isLoading, setIsLoading] = useState(false)


    async function onChange(e) {
        e.preventDefault()
        setIsLoading(true)

        console.log("onchange");
        const file = e.target.files[0]
        const reader = new window.FileReader()
        reader.readAsArrayBuffer(file)

        reader.onloadend = async () => {
            const result = await client.add(Buffer.from(Buffer(reader.result)))
            const url = `https://ipfs.infura.io/ipfs/${result.path}`
            setFileUrl(url)
            setIsLoading(false)
        }
    }



    async function createMarket(e) {
        e.preventDefault()
        const { name, description, price } = formInput
        if (!name || !description || !price || !fileUrl) return

        /* first, upload to IPFS */
        const data = JSON.stringify({
            name, description, image: fileUrl
        })
        try {
            const added = await client.add(data)
            const url = `https://ipfs.infura.io/ipfs/${added.path}`
            /* after file is uploaded to IPFS, pass the URL to save it on Polygon */
            createSale(url, description, price)
        } catch (error) {
            console.log('Error uploading file: ', error)
        }
    }

    return (
        <div className="col-sm-8 offset-sm-2 text-center mr-auto" style={{ maxWidth: '600px' }}>

            <form onSubmit={(e) => createMarket(e)}>


                <div className="form-group" >
                    <input
                        placeholder="Asset Name"
                        className="form-control mt-8 border rounded p-4"
                        onChange={e => updateFormInput({ ...formInput, name: e.target.value })}
                    />
                </div>

                <div className="form-group" >
                    <textarea
                        placeholder="Asset Description"
                        className="form-control mt-2 border rounded p-4"
                        onChange={e => updateFormInput({ ...formInput, description: e.target.value })}
                    />
                </div>

                <div className="form-group" >
                    <input
                        placeholder="Asset Price in Eth"
                        className="form-control mt-2 border rounded p-4"
                        onChange={e => updateFormInput({ ...formInput, price: e.target.value })}
                    />
                </div>


                <div className="form-group" >
                    <div className="custom-file">
                        <label className="custom-file-label" htmlFor="customFile">Choose file</label>
                        <input type="file" className="custom-file-input" name="Asset" id="customFile" onChange={onChange} />
                    </div>

                </div>
                {

                    isLoading ?
                        <Loader
                            type="TailSpin"
                            color="#00BFFF"
                            height={100}
                            width={100}
                        />
                        :

                        fileUrl && (
                            <div className="row">
                                <img className="img-fluid p-3" src={fileUrl} />
                            </div>

                        )
                }
                <button type="submit" className="btn btn-primary  btn-block">
                    Create Digital Asset
                </button>

            </form>

        </div>
    );
}

export default SellDigitalAsset;