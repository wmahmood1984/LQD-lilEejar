import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import { useDispatch, useSelector } from 'react-redux';
import { Approval, Claiming, initWeb3,MintA, Power, Staking } from "../state/ui";
import { create } from 'ipfs-http-client'
import Timer from "../Timer";
import fs from "fs"
import GIFS from "../Assets/sideImg.gif"
import ipfs from '../ipfs'
import {data2} from "../Assets/Summary4"
import {data} from "../Assets/Summary2"
import mergeImages from  'merge-images'
// import data from "../Assets/Summ
import NFT from "../Assets/NFT.gif"
import badge2 from "../Assets/MILITARY-1/MILITARY/BADGES/BADGE_0008_02_FIRST_LIEUTENANT.png"
import badge3 from "../Assets/MILITARY-1/MILITARY/BADGES/BADGE_0007_03_CAPTAIN.png"
import badge4 from "../Assets/MILITARY-1/MILITARY/BADGES/BADGE_0006_04_MAJOR.png"
import { picInfo } from "../Assets/Summary3";
import {abi,contractAddress, chainId} from "../config.js"
import { toast } from "react-toastify";
const { Canvas, Image, createCanvas, loadImage } = require('canvas');

const Home = () => {
  const [sec, setSec] = useState(true);
  const [sec1, setSec1] = useState(false);
  const [numb, setNumb] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [tokenApproval, settokenApproval] = useState(0);
  const [thresholdMet, setthresholdMet] = useState(true);
  const [threshold, setthreshold] = useState(0);

  const dispatch = useDispatch()
  const client = create('https://ipfs.infura.io:5001/api/v0')

  const toggle = useSelector((state)=>{
    return state.adoptReducer.toggle;
  });

  const pending = useSelector((state)=>{
    return state.adoptReducer.Pending;
  });

  const tokenUri = useSelector((state)=>{
    return state.adoptReducer.tokenUri;
  });


  console.log("URI", tokenUri)


  const Approval = useSelector((state)=>{
    return Number(state.adoptReducer.approvalAllowance)/1000000000000000000;
  });

  const address = useSelector((state)=>{
    return state.adoptReducer.address;
  });

  const eligibility = useSelector((state)=>{
    return state.adoptReducer.eligibility;
  });

  const NFTArray = useSelector((state)=>{
    return state.adoptReducer.NFTArray  });


 var array = NFTArray && NFTArray.filter(tr=>tr.owner == address)


console.log("nft array",NFTArray&& array)
 const stakeArray = useSelector((state)=>{

  return state.adoptReducer.stakArray});


var Sarray = stakeArray && stakeArray.filter(tr=>tr.staker == address)



const claimed = useSelector((state)=>{
  return state.adoptReducer.claimed;
});



 var UnClaimed =0;
stakeArray && Sarray.map((v,i)=>{
  var calculatedReward = CalculateReward(v.TimeStamp,v.IdStaked)
 UnClaimed += Number(calculatedReward)
  
})





  useEffect(() => {
    dispatch(initWeb3())
    
    
    }, [toggle])  

    window.ethereum.on('accountsChanged',async (accounts)=>{window.location.reload() })

    window.ethereum.on("chainChanged", (_chainId) => {
      window.location.reload();
    });

  const handleClickOpen = () => {
    setOpen(true);
  };

  setTimeout(() => {
    setOpen2(false);
  }, 3000);

  const handleClose = () => {
    setOpen(false);
    setOpen1(false);
    setOpen2(false);
  };

  async function handleConnect(){
    // e.preventDefault()
    
    window.ethereum.request({
      method: 'wallet_requestPermissions',
      params: [{
        eth_accounts: {},
      }]
    }); 
   }


const random1 = ()=>{
  return Math.floor(Math.random()*1000000000000000%10)
}





async function handleBulkMintA(qty){
    var rand1 = await random1()
    var rand2 = await random1()
    var rand3 = await random1()

    var data2 = require(`../Assets/LAB/json/${rand1}.json`)
    var info2 = require(`../Assets/LAB/json/${rand2}.json`)
    var info3 = require(`../Assets/OFF/json/${rand3}.json`)

    var t1 = [data2.image,
              "BusinessMan",
              data2.attributes[0].trait_type,
              data2.attributes[5].trait_type,"hairs",
              data2.attributes[4].trait_type,
              data2.attributes[7].trait_type,
              data2.attributes[6].trait_type,
              data2.attributes[8].trait_type,]

    var t2 = [info2.image,
                "Labor",
                data2.attributes[0].trait_type,
                data2.attributes[5].trait_type,"hairs",
                data2.attributes[4].trait_type,
                data2.attributes[7].trait_type,
                data2.attributes[6].trait_type,
                data2.attributes[8].trait_type,]
                
                var t3 = [info3.image,
                  "Officer",
                  data2.attributes[0].trait_type,
                  data2.attributes[5].trait_type,"hairs",
                  data2.attributes[4].trait_type,
                  data2.attributes[7].trait_type,
                  data2.attributes[6].trait_type,
                  data2.attributes[8].trait_type,]
    


    dispatch(MintA({qty,t1,t2,t3}))
}


async function handleBulkMintB(qty){
  var classes = []
  var traits = []
  var series = []
 
 console.log("data",data2)
  for(var i = 0; i <qty; i++){
    var rand =  random1()
console.log("randome",rand)



    
    
    if(rand==0){
      classes.push(10)
      series.push(rand)
      traits.push(
          [data2.BMAN[rand].image,
           "BusinessMan",
          data2.BMAN[rand].attributes[0].value,
          data2.BMAN[rand].attributes[1].value,"hairs",
          data2.BMAN[rand].attributes[4].value,
          data2.BMAN[rand].attributes[6].value,
          data2.BMAN[rand].attributes[5].value,
          data2.BMAN[rand].attributes[4].value,

        ])}
    

     else if(rand<2 || rand>8 ){
      classes.push(30)
      series.push(rand)
       traits.push(
        [data2.OFF[rand].image,
        "Officer",
       data2.OFF[rand].attributes[0].value,
       data2.OFF[rand].attributes[1].value,"hairs",
       data2.OFF[rand].attributes[4].value,
       data2.OFF[rand].attributes[6].value,
       data2.OFF[rand].attributes[5].value,
       data2.OFF[rand].attributes[4].value,
        ])}
    else{classes.push(60)
      series.push(rand)
      // var info3 = require(`../Assets/OFF/json/${1}.json`)
      traits.push(
        [data2.LAB[rand].image,
           "Worker",
          data2.LAB[rand].attributes[0].value,
          data2.LAB[rand].attributes[1].value,"hairs",
          data2.LAB[rand].attributes[4].value,
          data2.LAB[rand].attributes[6].value,
          data2.LAB[rand].attributes[5].value,
          data2.LAB[rand].attributes[4].value,
      ])
      }


  }
  
 console.log("traits",traits)
 console.log("classes",classes)


 dispatch(MintA({qty,classes,traits,series}))
}


async function handleBulkMint(qty){
  setOpen(false)
  setOpen2(true)
  var classes = []
  var traits = []
  var series = []
  var ImgUri = []
  

  for(var i = 0; i <qty; i++){
    var rand =  random1()

    if(rand==0){
      classes.push(10)
      ImgUri.push(data[0][rand].image)
      traits.push(data2[0][rand])
      series.push(rand)
    }
    

     else if(rand<2 || rand>8 ){
      classes.push(30)
      ImgUri.push(data[2][rand].image)
      traits.push(data2[2][rand])
      series.push(rand)
    }
    else{classes.push(60)
      classes.push(60)
      ImgUri.push(data[1][rand].image)
      traits.push(data2[1][rand])
      series.push(rand)}


  }
  
 console.log("traits",traits)
 console.log("classes",classes)


 dispatch(MintA({qty,classes,traits,ImgUri,series}))
}

const handleStake = (id)=>{
  dispatch(Staking({id}))
} 

const handleClaim = (stakeId)=>{

  dispatch(Claiming({id: stakeId}))
  
}



function CalculateReward(time,id)  {

  var claimeFiltered = claimed && claimed.filter(tr=>tr.id == id)
	var amounts = claimeFiltered.map(transaction => transaction.reward )
	var currentTimeinSeconds = new Date().getTime() / 1000
	var total = amounts.reduce((acc,item) => (acc+=Number(item)),0).toFixed(0)
	var timeInMinutes = (currentTimeinSeconds -  time)/(60);
	var rewardType = NFTArray[id].class == "60" ? 5 * 10**18 : NFTArray[id].class == "30"  ? 10 * 10**18 : 20 * 10**18 ;
	var _rewardSub = rewardType / 525600 * timeInMinutes; 
	var _reward = claimed && _rewardSub - total;
	return (_reward/1000000000000000000).toFixed(5);
}

const convertBase64ToFile = (base64String, fileName) => {
	let arr = base64String.split(',');
	let mime = arr[0].match(/:(.*?);/)[1];
	let bstr = atob(arr[1]);
	let n = bstr.length;
	let uint8Array = new Uint8Array(n);
	while (n--) {
	   uint8Array[n] = bstr.charCodeAt(n);
	}
	let file = new File([uint8Array], fileName, { type: mime });
	return file;
}

const powerUP= async (cClass,series, elig,id)=>{
  var dClass = cClass == "60"? 1: cClass == "30"? 2 : 0
  // console.log("power u called")
  // //var cClass = 1
  // var series = NFTArray[id].series
  console.log("class",cClass)
  console.log("series",series)
  var eligibilityPic = elig ==2? badge2: elig==3? badge3 : badge4 

  var oComb = await  mergeImages([picInfo[dClass][Number(series)], eligibilityPic], {
		Canvas: Canvas,
		Image: Image
	  })
	  

	var file2 =  await convertBase64ToFile(oComb,"Waqas")
	try {
		const added2 = await client.add(file2)
		var url = `https://ipfs.infura.io/ipfs/${added2.path}`
		//setIMG2(url)
    data[dClass][series].image = url; 
		var added3 =  await client.add( JSON.stringify(data[dClass][series]))
    var url2 = `https://gateway.pinata.cloud/ipfs/${added3.path}`
    console.log("url",url2)
		//window.open(`${url}`)
	  } catch (error) {
		console.log('Error uploading file: ', error)
	  }

    dispatch(Power({id,url:url2,ImgUri:url}))
}





// var imageBugger;
      

// const captureFile = async (e)=>{
//   e.preventDefault()
//   const file = e.target.files[0]
//   const reader = new window.FileReader()
//   reader.readAsArrayBuffer(file)
//   reader.onloadend = async ()=>{
//    imageBugger = Buffer(reader.result)
//     console.log("buffer",imageBugger)

  
  
//   }


// }

// const handleSubmit = async (e)=>{
//   e.preventDefault()

//   await ipfs.files.add(imageBugger, (error,result)=>{
//     if(error){
//       console.error("error",error)
//       return
//     }
//     //setFileHash(result[0].hash);
//     console.log(`https://gateway.pinata.cloud/ipfs/${result[0].hash}`);
//     //window.open(`https://gateway.pinata.cloud/ipfs/${result[0].hash}`)
//   })

// }

console.log("array",stakeArray && Sarray)

console.log("Complete array",NFTArray && NFTArray)
console.log("approval ",Approval)
console.log("approval required",tokenApproval)

const handleApprove = ()=>{
  dispatch(Approval({qty: tokenApproval}))
}


const networkId = useSelector((s)=>{
  return s.adoptReducer.networkId
})


if ( networkId && networkId != chainId){
  console.log("sab galat he ",networkId)    
  toast("Please connect to main net", {
      type: "error",
      position: toast.POSITION.BOTTOM_CENTER,
    });
}


const loadBlockchainData =  () => {
    


  return <div style={{color:"red"}}> You are not on correct chain ID.Please change to Avalanche Fuji Testnet</div>

};



console.log("pending",pending && pending)

const Mint = () => {
    return (
      <div className="min-box flex aic jc flex-col">
        <div className="container flex flex-col aic jc">
          <div className="heading-mint cfff s22 font b6">MINT</div>
          <div className="desc-mint s12 cfff">
            Your Valuable LQD may now be recuite new Tenents Characters.
          </div>
          <div className="numb s24 font b6 cfff">
            <span className="numb1 c-y">{array && Sarray && array.length+Sarray.length }</span>/
            <span className="numb2">50,000</span>
          </div>
          <div className="lbl-minted s12 cfff">MINTED</div>
          <div className="boxes flex">
            <div className="mint-item flex flex-col aic jc">
              <div className="cfff b6 font">0</div>
              <div className="cfff b6 font s12">SLQD</div>
            </div>
            <div className="mint-item flex flex-col aic jc">
              <div className="cfff b6 font">20k</div>
              <div className="cfff b6 font s12">SLQD</div>
            </div>
            <div className="mint-item flex flex-col aic jc">
              <div className="cfff b6 font">40k</div>
              <div className="cfff b6 font s12">SLQD</div>
            </div>
            <div className="mint-item flex flex-col aic jc">
              <div className="cfff b6 font">80k</div>
              <div className="cfff b6 font s12">SLQD</div>
            </div>
          </div>
          <div className="action flex flex-col aic jc">
            <div className="inc-sec flex aic">
              <div
                className="btn btn-mins button font b6"
                onClick={(e) => {
                  setNumb(numb - 1);
                 
                  if(numb-1<0){
                    toast("Amount cannot be less than 0", {
                      type: "error",
                      position: toast.POSITION.BOTTOM_CENTER,
                    });
                    setNumb(0)
                  }
                    
                }}
              >
               -
              </div>
              <label className="flex flex-col s20 b6 font cfff" > Enter Qty here 
              <input className="input txt-qty"  value={numb} type="value"            
            onChange={({ target }) => setNumb(target.value)}/></label>
              <div
                className="btn btn-plus button font b6"
                onClick={(e) => {
                  setNumb(numb+1)
                }}
              >
                +
              </div>
            </div>
 {NFTArray && stakeArray && array.length+Sarray.length+numb<=10  ?          
            <button 
            onClick={()=>{
              // console.log(array.length+Sarray.length)
               //console.log(numb)
              handleBulkMint(numb)
            }}
            className="btn button mint-now">MINT NOW</button>:
             Approval < tokenApproval ?
            <button onClick={handleApprove}>Approve {tokenApproval} tokens</button>:
            <button 
            onClick={()=>{
              // console.log(array.length+Sarray.length)
               //console.log(numb)
              handleBulkMint(numb)
            }}
            className="btn button mint-now">MINT after approval</button>
            }
            <div className="lbl-price s24 cfff">
              Price: <span className="rs cfff font s24 b6">80000</span>$LQD
            </div>
          </div>
        </div>
        <div className="btn btn-connect button s20 font b6">CONNECT WALLET</div>
      </div>
    );
  };

  const MoneySaving = () => {
    return (
      <div className="money-saving flex flex-col aic jc">
        <div className="money-saving-heading s20 font cfff b6">
          MONEY SAVING VAULT
        </div>
        <div className="money-saving-blcok flex aic">
          <div className="money-card-l">
            <div className="card-top flex flex-col aic jc">
              <div className="money-saving-heading s18 font cfff b6">
                EARNED JOE
              </div>
              <div flex className="flex aic">
                <img className="img-joe" src="./images/joe.jpeg" />
                <div className="meta">
                  <div className="c-y s18 font b6">9999.999</div>
                  <div className="lbl-date cfff s12 font">APR: 2, 110.41%</div>
                  <div className="lbl-date cfff s12 font">
                    Your Stake: 170.000
                  </div>
                </div>
              </div>
            </div>
            <div className="card-bottom flex flex-col aic jc">
              <input type="text" className="txt"></input>
              <div className="lbl-avil cfff font s12">
                Available LQD: 120.00
              </div>
              <div className="btn-block flex aic jc">
                <div className="btn btn-unstack button font">UNSTAKE</div>
                <div className="btn btn-stack button font">STAKE</div>
              </div>
              <div className="money-saving-btm s20 font cfff b6">
                Stack LQD and eran JOE
              </div>
            </div>
          </div>
          <div className="money-card-r">
            <div className="card-top flex flex-col aic jc">
              <div className="money-saving-heading s18 font cfff b6">
                EARNED MIM
              </div>
              <div flex className="flex aic">
                <img className="img-joe" src="./images/MIM.jpeg" />
                <div className="meta">
                  <div className="c-y s18 font b6">9999.999</div>
                  <div className="lbl-date cfff s12 font">APR: 2, 110.41%</div>
                  <div className="lbl-date cfff s12 font">
                    Your Stake: 170.000
                  </div>
                </div>
              </div>
            </div>
            <div className="card-bottom flex flex-col aic jc">
              <input type="text" className="txt"></input>
              <div className="lbl-avil cfff font s12">
                Available LQD: 120.00
              </div>
              <div className="btn-block flex aic jc">
                <div className="btn btn-unstack button font">UNSTAKE</div>
                <div className="btn btn-stack button font">STAKE</div>
              </div>
              <div className="money-saving-btm s20 font cfff b6">
                Stack LQD and eran MIM
              </div>
            </div>
          </div>
        </div>
        <div className="btn-bottom flex aic jc">
          <button className="btn button">CONNECT WALLET</button>
        </div>
      </div>
    );
  };






  
  return (
        <div>
        {networkId &&  networkId == chainId?
    <div className="home flex">
{/* <form onSubmit={handleSubmit}> <strong>Upload your file on IPFS</strong>
              <br/>
              <input type='file' onChange={captureFile}></input>
              <input type='submit'></input>
            </form> */}
      <div className="wrapWidth flex">


        <div className="left-side flex">
          <img className="img-gif" src={GIFS} /> 
        </div>
        <div className="right-side flex flex-col aic jc">
          <div className="top-cards flex aic">
            <div className="card-left flex flex-col">
              <div className="heading cfff s18 b4 font">TENANTS PAYING</div>
              <div className="min-card-block flex aic">
              {
               
               stakeArray && Sarray.map((v,i)=>
               (<div className="min-card flex flex-col" key={v.id}>
                <div className="min-h s9 flex aic jc">{NFTArray && NFTArray[v.IdStaked].class   == "60"  ? "Worker": NFTArray[v.IdStaked].class=="30"? "Officer": "BusinessMan"}</div>
                <img src={NFTArray && NFTArray[v.IdStaked].ImgUri   } className="min-img" />
                <div className="min-ht s9 flex aic jc">{v.class==60 ?"5$": v.class==30? "10$": "20$"}</div>
                <div className="min-ht s9 flex aic jc">Reward : {CalculateReward(v.TimeStamp,v.IdStaked)}</div>
                {CalculateReward(v.TimeStamp,v.IdStaked)>0?<button onClick={()=>{handleClaim(v.IdStaked)}}>claim</button>:null}
               {eligibility && eligibility>1?<button onClick={()=>{
                 
                 powerUP(NFTArray[v.IdStaked].class,NFTArray[v.IdStaked].series, eligibility,v.IdStaked)}}>power up</button>:null}
                <Timer props={v.TimeStamp}/>
              </div>)
               
               )}
              </div>
              <div className="progress-bar flex rel">
                <div className="bar abs"></div>
              </div>
              <div className="btn-block flex aic">
                
                
              </div>

            </div>
            <div className="card-right flex flex-col">
              <div className="heading cfff s18 b4 font">TENANTS PAYING</div>
              <div className="min-card-block flex aic">
              {NFTArray && array.map((v,i)=>
                (<div className="min-card flex flex-col" key={v.id}>
                <div className="min-h s9 flex aic jc">{v.class==60 ?"Worker": v.class==30? "Officer": "BusinessMan"}</div>
                <img src={v.ImgUri } className="min-img" />
                <div className="min-ht s9 flex aic jc">{v.class==60 ?"5$": v.class==30? "10$": "20$"}</div>
                <button onClick={()=>{handleStake(v.id)}}>stake</button>
				        {/* <button onClick={()=>{PowerUp(v.id)}}>Power Up</button> */}
              </div>))}
              </div>
              <div className="progress-bar flex rel">
                <div className="bar abs"></div>
              </div>
              <div className="btn-block flex aic">
                {/* <button className="btn btn-all button font b3">
                  SELECT ALL
                </button>
                <button className="btn btn-stake button font b3">STAKE</button> */}
              </div>
            </div>
          </div>
          <div className="bottom-cards flex aic">
            <div className="card-left flex aic">
              <div className="left-side">
                <img src="./images/pcImg.png" className="min-img" />
              </div>
              <div className="right-side felx flex-co aic">
                <div className="heading cfff font b4">MINT TENANTS</div>
                <div className="desc cfff s12 font">
                  Advertise your proprety here
                  <br /> and take new tenants!!
                </div>
                <div className="btn-block flex flex-col">
                  <button
                    className="btn button c000 font b3"
                    onClick={() => {
                      setOpen2(true)
                      handleBulkMint(1)
;}}
                  >
                    <blink>MINT NOW!!</blink>
                  </button>
                  <button
                    className="btn button c000 font b3"
                    onClick={handleClickOpen}
                  >
                    VIEW MINTING
                  </button>
                </div>
              </div>
            </div>
            {/* Sec1 */}
            {sec ? (
              <div className="card-right flex flex-col">
                <div className="header-blck flex aic">
                  <div className="left flex">
                    <div className="flex aic jc">
                      <img className="img" src="./images/rent.jpeg" />
                      <div className="lbl cfff font b5">
                        RENTAL INCOME
                        <br /> GENERATED : {(UnClaimed).toFixed(5)}
                      </div>
                    </div>
                  </div>
                  <div className="right flex flex-col">
                    <div
                      className={`btn1 ${sec ? "active" : ""}`}
                      onClick={(e) => {
                        setSec(!sec);
                        setSec1(false);
                      }}
                    ></div>
                    <div
                      className={`btn2 ${sec1 ? "active" : ""}`}
                      onClick={(e) => {
                        setSec1(!sec1);
                        setSec(false);
                      }}
                    ></div>
                  </div>
                </div>
                <div className="center flex aic">
                  <div className="le flex flex-col">
                    <div className="h1">BUILDING 1A</div>
                    <div className="item flex aic">
                      <div className="lbl cfff font s12">
                        TOTAL STAKED <br />
                        TENANTS
                      </div>
                      <div className="numb b6 font s14">{array && array.length}</div>
                    </div>
                    <div className="item flex aic">
                      <div className="lbl cfff font s12">
                        TOTAL UNSTAKED <br />
                        TENANTS
                      </div>
                      <div className="numb b6 font s14">{Sarray && Sarray.length}</div>
                    </div>
                  </div>
                  <div className="ri flex flex-col">
                    <div className="numb font s22 b5 ">{(UnClaimed).toFixed(5)}</div>
                    <div className="lbl b6 font cfff s12">UNCLIMD LIQU</div>
                    <div className="btn button">CLAIM REWARD</div>
                  </div>
                </div>
                <div className="btn-block flex aic">
                  <button
                    className="btn button c000 font b3"
                    onClick={(e) => {
                      handleConnect()
                       setOpen2(true);
                    }}
                  >
                    CONENCT WALLET
                  </button>
                  <button
                    className="btn button c000 font b3"
                    onClick={(e) => {
                      setOpen1(true);
                    }}
                  >
                    MONEY VALUT
                  </button>
                </div>
              </div>
            ) : (
              // Sec2
              <div className="card-right flex flex-col">
                <div className="header-blck flex aic">
                  <div className="left flex">
                    <div className="flex aic jc">
                      <img className="img" src="./images/Pw.jpeg" />
                      <div className="lbl cfff font b5">POWER UP LEVEL</div>
                    </div>
                  </div>
                  <div className="right flex flex-col">
                    <div
                      className={`btn1 ${sec ? "active" : ""}`}
                      onClick={(e) => {
                        setSec(!sec);
                        setSec1(false);
                      }}
                    ></div>
                    <div
                      className={`btn2 ${sec1 ? "active" : ""}`}
                      onClick={(e) => {
                        setSec1(!sec1);
                        setSec(false);
                      }}
                    ></div>
                  </div>
                </div>
                <div className="center-b flex aic jc">
                  <div className="left-s flex flex-col">
                    <div className="he flex aic">
                      <div className="lbl s12 font cfff">DAYS STAKED:</div>
                      <div className="numb s14 font b6">7</div>
                    </div>
                    <div className="levels  flex aic">
                      <div className="levl-item flex flex-col aic jc">
                        <div className="numb c-y">5</div>
                        <div className="numb-lbl c-y">LVL1</div>
                      </div>
                      <div className="levl-item flex flex-col aic jc">
                        <div className="numb">10</div>
                        <div className="numb-lbl">LVL2</div>
                      </div>
                      <div className="levl-item flex flex-col aic jc">
                        <div className="numb">15</div>
                        <div className="numb-lbl">LVL3</div>
                      </div>
                    </div>
                  </div>
                  <div className="right-s flex flex-col">
                    <div className="he flex aic">
                      <div className="lbl s12 font cfff">DAYS STAKED:</div>
                      <div className="numb s14 font b6">7</div>
                    </div>
                    <div className="levels  flex aic">
                      <div className="levl-item flex flex-col aic jc">
                        <div className="numb c-y">5</div>
                        <div className="numb-lbl c-y">LVL1</div>
                      </div>
                      <div className="levl-item flex flex-col aic jc">
                        <div className="numb">10</div>
                        <div className="numb-lbl">LVL2</div>
                      </div>
                      <div className="levl-item flex flex-col aic jc">
                        <div className="numb">15</div>
                        <div className="numb-lbl">LVL3</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="btn-block flex aic jc">
                  <button className="btn button c000 font b3">
                    POWER UP CALCULATOR
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Mint />
      </Dialog>

      <Dialog
        open={open1}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <MoneySaving />
      </Dialog>

      <Dialog
        open={open2 || pending}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className="nft-gif flex aic jc">
          <img className="img-nft" src="./images/NFT.gif" />
        </div>
      </Dialog>
    </div>:loadBlockchainData()}</div>
  );
};

export default Home;
