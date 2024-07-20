import React from 'react'

const FuelPrice = () => {

    return (
        <div class="container">
            <h1 class="text-center">View Fuel Prices in Your City</h1>
            <div id="fuel-prices-container">
                <div class="dropdown-container-fuel-price">
                    <embed id='mypp_embd' src="https://www.mypetrolprice.com/Embed/EmbedResponse.aspx" width="500" height="200" />
                </div>
            </div>
        </div>
    )
}

export default FuelPrice