$(document).ready(function(){

   const abi = [
      {
         "inputs": [
            {
               "internalType": "string",
               "name": "_id",
               "type": "string"
            }
         ],
         "name": "DangKy",
         "outputs": [],
         "stateMutability": "nonpayable",
         "type": "function"
      },
      {
         "anonymous": false,
         "inputs": [
            {
               "indexed": false,
               "internalType": "address",
               "name": "_vi",
               "type": "address"
            },
            {
               "indexed": false,
               "internalType": "string",
               "name": "_id",
               "type": "string"
            }
         ],
         "name": "SM_ban_data",
         "type": "event"
      },
      {
         "inputs": [
            {
               "internalType": "uint256",
               "name": "",
               "type": "uint256"
            }
         ],
         "name": "arrKhachHang",
         "outputs": [
            {
               "internalType": "string",
               "name": "_ID",
               "type": "string"
            },
            {
               "internalType": "address",
               "name": "_VI",
               "type": "address"
            }
         ],
         "stateMutability": "view",
         "type": "function"
      }
   ];
   const addressSM = "0x2751F00d0901c44633898afF7EfEd7Eb0794a77c";

   const web3 = new Web3(window.ethereum);

   window.ethereum.enable();

   // Tao contract cho Metamask
   var contract_MM = new web3.eth.Contract(abi, addressSM);
   console.log(connectMM);

   //Tao contract cho Infura
   var provider = new Web3.providers.WebsocketProvider("wss://rinkeby.infura.io/ws/v3/5d3d5e1dcae74ac890818dcdc3d9643f");
   var web3_infura = new Web3(provider);
   var contract_Infura = web3_infura.eth.Contract(abi, addressSM);
   console.log(contract_Infura);

   contract_Infura.events.SM_ban_data({filter:{}, fromBlock:"latest"}, function(error, event){
      if(error){
         console.log(error);
      }else{
         console.log(event);
      }
   });

   var currentAccount = "";
    
   checkMM();


   $("#connectMM").click(function(){
      connectMM().then((data)=>{
         currentAccount = data[0];
         console.log(currentAccount); 
      }).catch((err)=>{
         console.log(err);
      });
   });

    $("#btnDangKy").click(function(){
      if(currentAccount.length == 0)
      {
         alert("Vui long dang nhap Metamask");
      }else{
         $.post("./dangky", {
            Email:$("#txtEmail").val(),
            Name:$("#txtName").val(),
            SoDT: $("#txtSoDT").val()
         }, function(data){
            if(data.ketqua==1){
            contract_MM.methods.DangKy(data.maloi._id).send({
               from: currentAccount
            });
         }
         })
      }
    });
});

async function connectMM(){
   const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
   return accounts;
}

function checkMM(){
   if (typeof window.ethereum !== 'undefined') {
      console.log('MetaMask is installed!');
    }else{
       console.log('Ban chua cai Metamask!!!')
    }
 }


 

 