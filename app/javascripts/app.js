// Import the page's CSS. Webpack will know what to do with it.

import "../stylesheets/app.css";

// Import libraries we need.
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'
import kubay_artifacts from '../../build/contracts/Kubay.json'


var Kubay = contract(kubay_artifacts);

const ipfsAPI = require('ipfs-api');
const ethUtil = require('ethereumjs-util');
const ipfs = ipfsAPI({host: 'localhost', port: '5001', protocol: 'http'});


window.App = {
 
    
   
    
    
    
    
    
start: function() {
 var self = this;
 
 var reader;
     
   
     
 

     

 Kubay.setProvider(web3.currentProvider);
 
 Kubay.deployed().then(function(i) {
    i.getProduct(parseInt(productId), sealedBid, {value: web3.toWei(sendAmount), from: web3.eth.accounts[1], gas: 440000}).then(
     function(f) {
      $("#msg").html("Your bid has been successfully submitted!");
      $("#msg").show();
      console.log(f)
     }
    )
   });
    
    renderStore();

    if($("#product-details").length > 0) {

   //This is product details page

   let productId = new URLSearchParams(window.location.search).get('id');

   renderProductDetails(productId);

  }
 
    $("#product-image").change(function(event) {

    const file = event.target.files[0]

    reader = new window.FileReader()

    reader.readAsArrayBuffer(file)

  }); 
 
 
  $("#add-item-to-store").submit(function(event) {
   const req = $("#add-item-to-store").serialize();
let params = JSON.parse('{"' + req.replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
   let decodedParams = {}
   Object.keys(params).forEach(function(v) {
    decodedParams[v] = decodeURIComponent(decodeURI(params[v]));
   });
   saveProduct(reader, decodedParams);
   event.preventDefault();
});    
 
 
/* part2-1*/    
    
    
$("#bidding").submit(function(event) {
   $("#msg").hide();
   let amount = $("#bid-amount").val();
   let sendAmount = $("#bid-send-amount").val();
   let secretText = $("#secret-text").val();
   let sealedBid = '0x' + ethUtil.sha3(web3.toWei(amount, 'ether') + secretText).toString('hex');
   let productId = $("#product-id").val();
   console.log(sealedBid + " for " + productId);
   Kubay.deployed().then(function(i) {
    i.bid(parseInt(productId), sealedBid, {value: web3.toWei(sendAmount), from: web3.eth.accounts[3], gas: 440000}).then(
     function(f) {
      $("#msg").html("Your bid has been successfully submitted!");
      $("#msg").show();
      console.log(f)
     }
    )
   });
   event.preventDefault();
});
    
    
$("#revealing").submit(function(event) {
   $("#msg").hide();
   let amount = $("#actual-amount").val();
   let secretText = $("#reveal-secret-text").val();
   let productId = $("#product-id").val();
    Kubay.deployed().then(function(i) {
    i.revealBid(parseInt(productId), web3.toWei(amount).toString(), secretText, {from: web3.eth.accounts[3], gas: 440000}).then(
     function(f) {
      $("#msg").show();
      $("#msg").html("Your bid has been successfully revealed!");
      console.log(f)
     }
    )
     
i.highestBidderInfo.call(parseInt(productId),{from: web3.eth.accounts[3], gas: 440000}).then(function(p) {
      $("#product-status").append(result(p));
       });
    
        
        
    });
    
    
   event.preventDefault();
});   
    

/* part2 - 2  get the highest accounts*/    
    
 $("#finalize-auction").submit(function(event) {
  $("#msg").hide();
  let productId = $("#product-id").val();
  Kubay.deployed().then(function(i) {
  i.finalizeAuction(parseInt(productId), {from: web3.eth.accounts[2], gas: 4400000}).then(
   function(f) {
   $("#msg").show();
   $("#msg").html("The auction has been finalized and winner declared.");
   console.log(f)
location.reload();

   }

  ).catch(function(e) {
   console.log(e);
   $("#msg").show();
   $("#msg").html("The auction can not be finalized by the buyer or seller, only a third party aribiter can finalize it");
  })
  });
  event.preventDefault();
});   
    

    
    
    
 $("#release-funds").click(function() {
   let productId = new URLSearchParams(window.location.search).get('id');

   Kubay.deployed().then(function(f) {

    $("#msg").html("Your transaction has been submitted. Please wait for few seconds for the confirmation").show();

    console.log(productId);

    f.releaseAmountToSeller(productId, {from: web3.eth.accounts[2], gas: 440000}).then(function(f) {
     console.log(f);
     location.reload();
    }).catch(function(e) {
     console.log(e);
    })
   });
alert("release the funds!");
 });


  $("#refund-funds").click(function() {
   let productId = new URLSearchParams(window.location.search).get('id');
   Kubay.deployed().then(function(f) {
    $("#msg").html("Your transaction has been submitted. Please wait for few seconds for the confirmation").show();
    f.refundAmountToBuyer(productId, {from: web3.eth.accounts[2], gas: 440000}).then(function(f) {
     console.log(f);
     location.reload();
    }).catch(function(e) {
     console.log(e);
    })
   });
   alert("refund the funds!");
  });    
    
    
    
    
    
    
    
    
    
    
 }


};

function renderStore(product) {
 Kubay.deployed().then(function(i) {
  i.getProduct.call(1).then(function(p) {
    $("#product-list").append(buildProduct(p));
  });
   i.getProduct.call(2).then(function(p) {
   $("#product-list").append(buildProduct(p));
  });
 i.getProduct.call(3).then(function(p) {
   $("#product-list").append(buildProduct(p));
  });
 i.getProduct.call(4).then(function(p) {
   $("#product-list").append(buildProduct(p));
  });
 
   i.getProduct.call(5).then(function(p) {
   $("#product-list").append(buildProduct(p));
  });  
     
      i.getProduct.call(7).then(function(p) {
   $("#product-list").append(buildProduct(p));
  });
    i.getProduct.call(8).then(function(p) {
   $("#product-list").append(buildProduct(p));
  });
     i.getProduct.call(9).then(function(p) {
   $("#product-list").append(buildProduct(p));
  });
  
   
    
 });
}

function result(product){
     let node = $("<div/>");            
  
    node.append("saled price: "+displayPrice(product[2])+"</div>");
    node.append("<br>my_add "+product[3]+"</div><br>");
    node.append("winner_add "+product[0]+"</div>");
     return node;

}

function buildProduct(product) {
 let node = $("<div/>");
 node.addClass("col-sm-3 text-center col-margin-bottom-1");
 
    
 node.append("<img src='https://ipfs.io/ipfs/" + product[4] + "' width='150px' />");
 node.append("<div>" + product[1]+ "</div>");
 
    
node.append("<div>" + product[2]+ "</div>");
 //node.append("<div>" + product[5]+ "</div>");

node.append("<div> " + displayPrice(product[8]) + "</div>");
 node.append("<a href="+"  "+"product.html?id="+product[0]+" "+ "class="+"  "+"btn btn-primary"+"  "+">Bids</a>");
    return node;
}


function saveImageOnIpfs(reader) {
 return new Promise(function(resolve, reject) {
  const buffer = Buffer.from(reader.result);
  ipfs.add(buffer).then((response) => {
   console.log(response)
   resolve(response[0].hash);
  }).catch((err) => {
   console.error(err)
   reject(err);
  })
 })
}


function saveTextBlobOnIpfs(blob) {
 return new Promise(function(resolve, reject) {
  const descBuffer = Buffer.from(blob, 'utf-8');
  ipfs.add(descBuffer).then((response) => {
   console.log(response)
   resolve(response[0].hash);
  }).catch((err) => {
   console.error(err)
   reject(err);
  })
 })
}



function saveProduct(reader, decodedParams) {
  let imageId, descId;
  saveImageOnIpfs(reader).then(function(id) {
    imageId = id;
    saveTextBlobOnIpfs(decodedParams["product-description"]).then(function(id) {
      descId = id;
       saveProductToBlockchain(decodedParams, imageId, descId);
    })
 })
}


function saveProductToBlockchain(params, imageId, descId) {

  console.log(params);
  let auctionStartTime = getCurrentTimeInSeconds();
  let auctionEndTime = auctionStartTime + parseInt(params["product-auction-end"])  * 60
  Kubay.deployed().then(function(i) {
    i.addProductToStore(params["product-name"], params["product-category"], 0,imageId, descId, auctionStartTime,
   auctionEndTime, web3.toWei(params["product-price"], 'ether'),  {from: web3.eth.accounts[0], gas: 440000}).then(function(f) {
   console.log(f);
   $("#msg").show();
   $("#msg").html("Your product was successfully added to your store!");
  })
 });
}


function renderProductDetails(productId) {
 Kubay.deployed().then(function(i) {
  i.getProduct.call(productId).then(function(p) {
   console.log(p);
   let content = "";
   ipfs.cat(p[5]).then(function(stream) {
    stream.on('data',function(chunk){
       content += chunk.toString();
    
       $("#product-desc").append("<div>" + content+ "</div>");
    })
    });

$("#product-image").append("<img src='https://ipfs.io/ipfs/" + p[4] + "' width='120px' />");
  $("#product-price").html(displayPrice(p[8]));
  $("#product-name").html(p[2]);
  $("#product-auction-end").html(displayEndHours(p[7]));
  $("#product-id").val(p[0]);
  $("#revealing, #bidding, #finalize-auction, #escrow-info").hide();
  let currentTime = getCurrentTimeInSeconds();
   if (parseInt(p[9]) == 1) {
    if (parseInt(p[9]) == 1) {

   Kubay.deployed().then(function(i) {

    $("#escrow-info").show();

    i.highestBidderInfo.call(productId).then(function(f) {

     if (f[2].toLocaleString() == '0') {

      $("#product-status").html("Auction has ended. No bids were revealed");

     } else {

      $("#product-status").html("Auction has ended. Product sold to " + f[0] + " for " + displayPrice(f[2]) +

       "The money is in the escrow. Two of the three participants (Buyer, Seller and Arbiter) have to " +

       "either release the funds to seller or refund the money to the buyer");

     }

    })

    i.escrowInfo.call(productId).then(function(f) {
     $("#buyer").html('Buyer: ' + f[0]);
     $("#seller").html('Seller: ' + f[1]);
     $("#arbiter").html('Arbiter: ' + f[2]);
     if(f[3] == true) {
      $("#release-count").html("<br><br><br><br><br>Amount from the escrow has been released<br><br><br><br><br><br>");
     } /*else {
      $("#release-count").html(f[4] + " of 3 participants have agreed to release funds");
      $("#refund-count").html(f[5] + " of 3 participants have agreed to refund the buyer");
     }*/
    })
   })
}
  } else if(parseInt(p[13]) == 2) {
  $("#product-status").html("Product was not sold");
  } else if(currentTime < parseInt(p[7])) {
  $("#bidding").show();
  } else if (currentTime < (parseInt(p[7]) + 60*2)) {
  $("#revealing").show();
  } else {
  $("#finalize-auction").show();
  }
 })
 })
}













function getCurrentTimeInSeconds(){
 return Math.round(new Date() / 1000);
}

function displayPrice(amt) {
 return   web3.fromWei(amt, 'ether')+' Ether';
}

function displayEndHours(seconds) {
 let current_time = getCurrentTimeInSeconds()
 let remaining_seconds = seconds - current_time;
 if (remaining_seconds <= 0) {
  return "Auction has ended";
 }
 let days = Math.trunc(remaining_seconds / (24*60*60));
remaining_seconds -= days*24*60*60
 let hours = Math.trunc(remaining_seconds / (60*60));
 remaining_seconds -= hours*60*60
 let minutes = Math.trunc(remaining_seconds / 60);
 if (days > 0) {
  return "Auction ends in " + days + " days, " + hours + ", hours, " + minutes + " minutes";
 } else if (hours > 0) {
  return "Auction ends in " + hours + " hours, " + minutes + " minutes ";
 } else if (minutes > 0) {
  return "Auction ends in " + minutes + " minutes ";
 } else {
  return "Auction ends in " + remaining_seconds + " seconds";
 }
}









window.addEventListener('load', function() {

 // Checking if Web3 has been injected by the browser (Mist/MetaMask)

 if (typeof web3 !== 'undefined') {

  console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")

  // Use Mist/MetaMask's provider

  window.web3 = new Web3(web3.currentProvider);

 } else {

  console.warn("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");

  // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)

  window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

 }


 App.start();

});
