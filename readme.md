# Code 설명
## contracts 
## kubay.sol
 * 변수  
            ```uint public productIndex;```  
            ```mapping (address =>mapping(uint => Product)) stores; ```    
            ```mapping (uint => address) productIdInStore;```    
            ```mapping (uint => address) productEscrow;``` 
      
    : mapping (address =>mapping(uint => Product)) stores;  
    : 은 stores[address][uint] 라는 2차원 배열로 보면되는데address 와 uint를 받아서 Product 구조체에 접근하게 된다.  
        
* 구조체  
```      
struct Product{  
      uint id;    
      string game_name;  
      string item_name;  
      ...
        }         
```
아이템 product 의 정보가 저장된다..
```
struct Bid {
    address bidder; //입찰자 주소
    uint productId; 
    uint value;
    bool revealed;  //노출 여부 
    }
```
입찰 구조체로 입찰자의 주소와 ProductId 와 reveal 됬는지에 대한 여부 가 저장된다.
        
        
* 함수
```
function bid(uint _productId, bytes32 _bid) payable public returns (bool){

      Product storage product = stores[productIdInStore[_productId]][_productId];  
      // Product 객체를 선언하고 전달받은 _productId로 mapping 을통하여 해당 product 를 받아서 product 변수에 넣는다.  
      
      require (now >= product.auctionStartTime);  
      // 현재시간이 product.auctionStartTime 보다 커야 함수가 실행된다는뜻이다.(require은 요구부분이고 now 는 현재 시간을 뜻한다.)  
      
      require (now <= product.auctionEndTime);  
      require(msg.value>product.startPrice);  
      require(product.bids[msg.sender][_bid].bidder == 0);  
      product.bids[msg.sender][_bid]=Bid(msg.sender, _productId, msg.value, false);  
      product.totalBids +=1;  
      return true;  
      }
```                    
입찰 함수로서 인자로 _productId 와  _bid 를 받아서입찰을 한다.

  

모든 요구사항이 만족 하면 product 안에서 mapping 된 bids 라는 이름의 2차원배열 에 해당하는 변수(Bid구조체)에 Bid를 할당하여 넣는다.  
이것으로 입찰함수가 불려지면 Product 객체안에  product.bids[트랜잭션을 발생시킨accounts 의 주소 값][입찰번호] 의 정보가 입력되게 되고   
product.totalBids +=1;  
해당 product의 총입찰수가 늘어납니다.  

```
function revealBid(uint _productId, string _amount, string _secret) public {
                .....
                }          
```
이함수는 경매 시간이 끝나고 입찰자가 reveal 하게되면서 최종구매자가 정해지는 함수이다.
```
 function highestBidderInfo(uint _productId) view public returns (address, uint, uint,address){
                ..
                }
```
이함수는 최고가의 가격을 입찰한 입찰자의 정보를 반환하는 함수입니다.
```
function totalBids(uint _productId) view public returns (uint) {..
                }
```
이함수는 총 입찰 수를 반환합니다.
```
function stringToUint(string s) pure private returns (uint){
                ....}
```
 이함수는 string 을 받아서 int로 반환해서 리턴하는함수이다         
```
function addProductToStore(string _game_name, string _item_name, uint _game_money, string _imageLink, string _descLink, uint _auctionStartTime, uint _auctionEndTime, uint _startPrice ) public  {...}
```
이함수는 변수로 아이템에 대한 정보를 받아서 스마트계약 변수안에 할당하는 함수이다.
```
function getProduct(uint _productId) view public returns (uint, string, string, uint, string, string, uint, uint, uint, ProductStatus) { ... }
```
productId를 인수로 받아서 해당 Product를 반환하는함수이다
```
function finalizeAuction(uint _productId) public {
                ....
                }
```
이함수는 중개자가 최종거래를 확정하는 함수로서 
                중개자의 계정만 실행이 가능하다.
```
 function escrowAddressForProduct(uint _productId) view public returns (address) { ..
                }
                ;
```
 이함수는productId를 받아서 해당 에스크로 계약의 주소를 반환합니다 거래시간이 완료되고
                판매자와 구매자의 거래가 성립한뒤에는 Escrow 계약이 생성되어 배포되는데 그 Escrow 계약에 Ether 가 묶여있다.
                그 주소를 반환한다.
```
function escrowInfo(uint _productId) view public returns (address, address, address, bool, uint, uint) {
                return Escrow(productEscrow[_productId]).escrowInfo();
                }
```
에스크로 정보를 반환한다.
                이함수는에스크로 계약에 접근하여 그계약에 있는 escrowInfo()를 호출해서반환한다.
```
function releaseAmountToSeller(uint _productId) public {
                Escrow(productEscrow[_productId]).releaseAmountToSeller(msg.sender);
                };
```
중개자가 거래를 확정하고 판매자에게 이더를 송금완료해주는 함수이다.
```
function refundAmountToBuyer(uint _productId) public { 
                Escrow(productEscrow[_productId]).refundAmountToBuyer(msg.sender);
                }
```
중개자가 거래를 완료하고 구매자에게 이더를 반환완료해주는 함수입니다. 이경우는 중개자가 거래가 잘못되었다는것을 판단하고 구매자가 이더를돌려준다
 
 
