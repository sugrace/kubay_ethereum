Eutil = require('ethereumjs-util');

Kubay = artifacts.require("./Kubay.sol");
module.exports = function(callback) {
 
 current_time = Math.round(new Date() / 1000);
 
    
 amt_1 = web3.toWei(1, 'ether');
 
 Kubay.deployed().then(function(i) {i.addProductToStore('DarkAge', 'rudinbow', 0, 'QmPBZE1rrRvaCYfNpZ374w1uqJJKPDT5eCtM7bGGGWEiY8', 'QmWnQNjEFQcHBiMDb4TZz2wiibWJDti4R9mSaxBijzbDqG', current_time, current_time + 60, 2*amt_1).then(function(f) {console.log(f)})});

 Kubay.deployed().then(function(i) {i.addProductToStore('DarkAge2', 'rudinsword2', 0, 'QmRh3BZri1fXvPFgfe1A6Pbkxx4pTRewYuoTgR9GTqYfV2', 'QmWnQNjEFQcHBiMDb4TZz2wiibWJDti4R9mSaxBijzbDqG', current_time, current_time + 200, 3*amt_1).then(function(f) {console.log(f)})});

 Kubay.deployed().then(function(i) {i.addProductToStore('DarkAge2', 'rudinsword2', 0, 'QmRh3BZri1fXvPFgfe1A6Pbkxx4pTRewYuoTgR9GTqYfV2', 'QmWnQNjEFQcHBiMDb4TZz2wiibWJDti4R9mSaxBijzbDqG', current_time, current_time + 14, amt_1).then(function(f) {console.log(f)})}); 

  
  Kubay.deployed().then(function(i) {i.addProductToStore('Lineage2', 'item1', 0, 
    'QmVsgeQrqZaFCSR7wonhd32QK4cuv9fTZTdAd2CdEN1LB2', 'QmWnQNjEFQcHBiMDb4TZz2wiibWJDti4R9mSaxBijzbDqG', current_time, current_time + 200, 3*amt_1).then(function(f) {console.log(f)})});    
  
    Kubay.deployed().then(function(i) {i.addProductToStore('Lineage2', 'item2', 0, 'QmdXc6A9QGY3QECbkWDuyrozP87JWRZuwoZMPiqxmPAZta', 'QmWnQNjEFQcHBiMDb4TZz2wiibWJDti4R9mSaxBijzbDqG', current_time, current_time + 200, 3000*amt_1).then(function(f) {console.log(f)})});
    
    
    
  
    
    
 Kubay.deployed().then(function(i) {i.productIndex.call().then(function(f){console.log(f)})});

}
