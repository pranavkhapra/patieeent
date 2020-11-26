var showname=document.getElementById("seekname")
var resp=" "
var url=window.location.origin+"/seekname"

console.log(url)

var request = new XMLHttpRequest()
request.open('GET',url)
request.onload = ()=>
{
    resp= request.response;
    showname.innerHTML=resp
}
request.send()



var shownamed=document.getElementById("seeknamed")
var respd=" "
var url=window.location.origin+"/seeknamedoc"

console.log(url)

var request1 = new XMLHttpRequest()
request1.open('GET',url)
request1.onload = ()=>
{
    respd= request1.response;
    shownamed.innerHTML=respd
}
request1.send()