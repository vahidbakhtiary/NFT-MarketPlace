import React from "react";

const ListItems = ({ nfts }) => {
    return (
        <div className="container d-flex justify-content-center mt-50 mb-50">
            <div className="row">
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
                                    
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default ListItems;