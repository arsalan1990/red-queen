import React, { useLayoutEffect, useRef } from 'react';
 import './App.css';
 function App() {

   const aliceSprite = useRef(null);
   const foreground = useRef(null);
   const background = useRef(null);

     useLayoutEffect(() => {
          // Alice
       var spriteFrames = [
         { transform: 'translateY(0)' },
         { transform: 'translateY(-100%)' }   
       ];

       var alice = aliceSprite.current.animate(
        spriteFrames, {
           easing: 'steps(7, end)',
           direction: "reverse",
           duration: 500,
           playbackRate: 1,
           iterations: Infinity
         });

       setInterval( function() {
         if (alice.playbackRate > .4) {
           alice.playbackRate -= .1;
           adjustSceneryPlayback();
        } 
       }, 3000);

      // Scenery
       var sceneryFrames =   [
         { transform: 'translateX(100%)' },
         { transform: 'translateX(-100%)' }   
       ];
      
       var sceneryTimingBackground = {
         duration: 36000,
         iterations: Infinity
       };
      
       var sceneryTimingForeground = {
         duration: 12000,
         iterations: Infinity
       };

       var foregroundMovement = foreground.current.animate(sceneryFrames, sceneryTimingForeground);
       var backgroundMovement = background.current.animate(sceneryFrames, sceneryTimingBackground);

       var sceneries = [foregroundMovement, backgroundMovement];

       var adjustSceneryPlayback = function() {
         console.log(alice.playbackRate)
         if (alice.playbackRate < .8) {
           sceneries.forEach(function(anim) {
             anim.playbackRate = alice.playbackRate/2 * -1;
           });
         } else if (alice.playbackRate > 1.2) {
           sceneries.forEach(function(anim) {
            anim.playbackRate = alice.playbackRate/2;
           });
         } else {
           sceneries.forEach(function(anim) {
            anim.playbackRate = 0;    
           });
         }   
       }
       adjustSceneryPlayback();

      const goFaster = () => {
         alice.playbackRate += 0.1;
         adjustSceneryPlayback();
       }
  
       window.addEventListener("click", goFaster);
   })

  
   return (
     <div className="container">
       <div className="sky"></div> 
       <img className="sky1" src="https://media0.giphy.com/media/mTdVKHLEFTGWQ/200.webp?cid=ecf05e47x8zxnr27cl42rvnfr85moflhhgymuw6finj5jq8j&rid=200.webp" alt=" " />
       <div className="earth">
         <div className="alice">          
             <img className="alicesprite" ref={aliceSprite} src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/sprite_running-alice-queen_small.png" alt=" " />
       </div>
       </div>
      
       <div className="scenery" id="foreground" ref={foreground}>
         <img id="treefore" src="http://clipart-library.com/images_k/grass-png-transparent/grass-png-transparent-5.png" alt=" "/>
       </div>

       <div className="scenery background1" ref={background}>
         <img className="pawn" src="https://www.pinclipart.com/picdir/big/140-1400318_cartoon-car-png-yellow-color-transpa-background-image.png" alt=" " />
         <img className="pawn2" src="http://clipart-library.com/images/kcKnqoK6i.png" alt=" " />
         <img className="pawn3" src="http://clipart-library.com/images/5TRXqrdac.png" alt=" " />
         <img className="treeback" src="https://i.pinimg.com/originals/60/a8/2c/60a82c6cf7fda046b291e6b2c78ea531.png" alt=" " />
         <img className="treeback1" src="https://i.pinimg.com/originals/60/a8/2c/60a82c6cf7fda046b291e6b2c78ea531.png" alt=" " />
        
       </div>
     </div>
   );
 }

 export default App;
