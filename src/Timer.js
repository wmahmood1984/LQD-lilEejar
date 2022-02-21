import React, { useEffect,useState } from 'react'

export default function Timer(props) {
    const [seconds, setSeconds] = useState(60);
    const stakeTime = Number(props.props) + (60*60*24*5);
    var currentTimeinSeconds = new Date().getTime() / 1000
    var differenceTimeinSeconds = Math.trunc(stakeTime - currentTimeinSeconds)
    
    var DaysRemaining = Math.trunc((differenceTimeinSeconds /60 /60/24))
    var HoursRemaining = Math.trunc((differenceTimeinSeconds /60 /60)-(DaysRemaining*24))
    var MinutesRemaining = Math.trunc((differenceTimeinSeconds /60 )-(DaysRemaining*24*60)-(HoursRemaining*60))
    var SecondsRemaining = Math.trunc((differenceTimeinSeconds )-(DaysRemaining*24*60*60)-(HoursRemaining*60*60)-(MinutesRemaining*60))



    useEffect(() => {
        let interval = null;

          interval = setInterval(() => {
            setSeconds(seconds => seconds + 1);
          }, 10000);

         return () => clearInterval(interval);
      }, [ seconds]);


      const handleUnStake = ()=>{}
    return (

            <div>
            {stakeTime > 0 ? <div>
            <span style={{color:"white"}}>{DaysRemaining} Days </span>
            <span style={{color:"white"}}>{HoursRemaining} Hours     </span>


            </div>:
            <button onClick={()=>{handleUnStake()}}>un Stake</button>
            }
        </div>

    )
}
