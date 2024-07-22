const BASE_URL="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns=document.querySelectorAll(".dropdown select");

const btn=document.querySelector("form button")
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".toe select");

let msg=document.querySelector(".msg");

for(let select of dropdowns){
    for(currCode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        if(select.name==="from" && currCode==="USD"){
            newOption.selected="selected";
        }
        if(select.name==="to" && currCode==="INR"){
            newOption.selected="selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change",(evt)=>{
        flag(evt.target);
    })
}


const flag=(element)=>{
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");  //imp
    img.src=newSrc;
}


//Exchange vals

btn.addEventListener("click", async (evt)=>{
    evt.preventDefault();
    let amount=document.querySelector(".amount input");
    let amtVal=amount.value;  //amount taken
    if(amtVal ==="" || amtVal < 1){
        amtVal=1;
        amount.value="1";
    }

    //link for value
    const URL=`${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response=await fetch(URL);
    let data=await response.json();
    // console.log(data);
    let toCountry=toCurr.value.toLowerCase();
    let toVal=data[toCountry]; //to currency
    let result=0;
    result=(amtVal)*(toVal);
    
    msg.innerText=`${amtVal} ${fromCurr.value.toUpperCase()} = ${result} ${toCurr.value.toUpperCase()}`;
});


