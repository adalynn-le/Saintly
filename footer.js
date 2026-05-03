const privacyPolicyBtn = document.getElementById("privacyPolicyBtn")
const privacyPolicy = document.getElementById("privacyPolicy")
const termsAndConditions = document.getElementById("termsAndConditions")
 console.log("script running")
      let helpOn = false;
  let helpBtn = document.getElementById('helpButton')
  helpBtn.addEventListener("click", function () {
    console.log("clicked")
    if (helpOn === true){
        helpPannel.style.display = "none";
        overlay.style.display = "none"; 
        helpOn = false;
    } else {
        helpPannel.style.display = "block";
        overlay.style.display = "block";
        helpOn = true
    }
});
let overlay = document.getElementById('overlay');
overlay.addEventListener("click", function () {
    helpPannel.style.display = "none";
    privacyPolicy.style.display = "none"
    overlay.style.display = "none"; 
    termsAndConditions.style.display = "none"
    helpOn = false;
});
// Example: Sending a random math problem
function myFunctionTwo(){
        termsAndConditions.style.display = "block"
        overlay.style.display = "block"
}
function myFunction(){
        console.log(privacyPolicy.style.display)
                privacyPolicy.style.display = "block"
                overlay.style.display = "block"
}