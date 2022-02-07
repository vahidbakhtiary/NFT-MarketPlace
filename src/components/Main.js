import React from "react";

const Main = ({ nfts, buyNft }) => {
    return (

        // <div className="col-12">
        //     <div className="row">
        //         {
        //             nfts.map((nft, i) => (
        //                 <div key={i} className="col-md-4 mt-2">
        //                     <div className="card">
        //                         <div className="card-body">
        //                             <div className="card-img-actions"> <img src={nft.image} className="card-img img-fluid" width="96" height="350" alt="" /> </div>
        //                         </div>
        //                         <div className="card-body bg-light text-center">
        //                             <div className="mb-2">
        //                                 <h6 className="font-weight-semibold mb-2"> <a href="#" className="text-default mb-2" data-abc="true">{nft.name}</a> </h6> <a href="#" className="text-muted" data-abc="true">{nft.description}</a>
        //                             </div>
        //                             <h3 className="mb-0 font-weight-semibold">{nft.price} ETH</h3>
        //                             <div> <i className="fa fa-star star"></i> <i className="fa fa-star star"></i> <i className="fa fa-star star"></i> <i className="fa fa-star star"></i> </div>
        //                             <button type="button" className="btn btn-success btn-lg btn-block mt-5" onClick={() => buyNft(nft)} ><i className="fa fa-cart-plus mr-2"></i> buy</button>
        //                         </div>
        //                     </div>
        //                 </div>
        //             ))
        //         }
        //     </div>
        // </div>

        <div className="container-fluid">
            <div className="px-lg-5">
                <div class="row">
                    {
                        nfts.map((nft, i) => (
                            <div class="col-xl-3 col-lg-4 col-md-6 mb-4">
                                <div class="bg-white rounded shadow-sm"><img src={nft.image} alt="" class="img-fluid card-img-top" />
                                    <div class="p-4">
                                        <div className="mb-2">
                                            <h6 className="font-weight-semibold mb-2"> <a href="#" className="text-default mb-2" data-abc="true">{nft.name}</a> </h6> <a href="#" className="text-muted" data-abc="true">{nft.description}</a>
                                        </div>
                                        <h3 className="mb-0 font-weight-semibold">{nft.price} ETH</h3>
                                        <div> <i className="fa fa-star star"></i> <i className="fa fa-star star"></i> <i className="fa fa-star star"></i> <i className="fa fa-star star"></i> </div>
                                        <button type="button" className="btn btn-success btn-lg btn-block mt-5" onClick={() => buyNft(nft)} ><i className="fa fa-cart-plus mr-2"></i> buy</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>


    );
}

export default Main;