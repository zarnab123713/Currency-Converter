const currencies = {
 USD:"us",
 PKR:"pk",
 EUR:"eu",
 GBP:"gb",
 INR:"in",
 CAD:"ca",
 AUD:"au"
};

const from = document.getElementById("from");
const to = document.getElementById("to");
const fromFlag = document.getElementById("fromFlag");
const toFlag = document.getElementById("toFlag");
const swapBtn = document.getElementById("swapBtn");
const convertBtn = document.getElementById("convertBtn");
const result = document.getElementById("result");
const loader = document.getElementById("loader");

// Populate selects
for(let cur in currencies){
    from.innerHTML += `<option>${cur}</option>`;
    to.innerHTML += `<option>${cur}</option>`;
}

from.value="USD";
to.value="PKR";

updateFlags();

from.onchange = updateFlags;
to.onchange = updateFlags;

function updateFlags(){
    fromFlag.src = `https://flagcdn.com/w40/${currencies[from.value]}.png`;
    toFlag.src = `https://flagcdn.com/w40/${currencies[to.value]}.png`;
}

async function convert(){
    let amount = document.getElementById("amount").value;
    if(amount<=0){ alert("Amount sahi likho"); return; }

    loader.style.display = "block";
    result.innerText = "";

    try{
        let res = await fetch(`https://api.exchangerate-api.com/v4/latest/${from.value}`);
        let data = await res.json();
        let rate = data.rates[to.value];
        let total = amount * rate;

        setTimeout(()=>{
            loader.style.display = "none";
            result.innerText = `${amount} ${from.value} = ${total.toFixed(2)} ${to.value}`;
        }, 800); // small delay for spinner effect

    }catch{
        loader.style.display = "none";
        result.innerText = "Internet/API error";
    }
}

// Swap with animation
swapBtn.addEventListener("click", ()=>{
    fromFlag.style.transform = "rotateY(180deg)";
    toFlag.style.transform = "rotateY(180deg)";

    setTimeout(()=>{
        let temp = from.value;
        from.value = to.value;
        to.value = temp;

        updateFlags();
        fromFlag.style.transform = "rotateY(0deg)";
        toFlag.style.transform = "rotateY(0deg)";

        convert();
    },500);
});

convertBtn.addEventListener("click", convert);