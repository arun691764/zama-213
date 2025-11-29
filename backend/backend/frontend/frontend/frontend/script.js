const API = "http://localhost:4000";

async function requestOTP(){
    const identifier = document.getElementById('identifier').value;
    const res = await fetch(API + "/request-otp", {
        method:"POST",
        headers:{ "content-type":"application/json" },
        body: JSON.stringify({ identifier })
    });
    const data = await res.json();
    document.getElementById("otpMsg").innerText = data.message || data.error;
}

async function verifyOTP(){
    const identifier = document.getElementById('identifier').value;
    const otp = document.getElementById('otp').value;
    const res = await fetch(API + "/verify-otp", {
        method:"POST",
        headers:{ "content-type":"application/json" },
        body: JSON.stringify({ identifier, otp })
    });
    const data = await res.json();
    if(data.sessionToken){
        localStorage.setItem("session", data.sessionToken);
        document.getElementById("verifyMsg").innerText = "Verified ✔";
    } else {
        document.getElementById("verifyMsg").innerText = data.error;
    }
}

async function vote(choice){
    const sessionToken = localStorage.getItem("session");
    const res = await fetch(API + "/vote", {
        method:"POST",
        headers:{ "content-type":"application/json" },
        body: JSON.stringify({ sessionToken, choice })
    });
    const data = await res.json();
    document.getElementById("voteMsg").innerText = data.message || data.error;
}

async function getResults(){
    const key = document.getElementById("adminkey").value;
    const res = await fetch(API + "/admin/results?key=" + key);
    const data = await res.json();
    document.getElementById("resultBox").innerText = JSON.stringify(data, null, 2);
}
