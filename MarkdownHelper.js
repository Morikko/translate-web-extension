var generateUrl = function() {
  if ( document.getElementById("url-generated") === null ) {
    return;
  }

  let url = "https://morikko.github.io/translate-web-extension/translate";

  let params = [
    ["url-current", "headoriginal="],
    ["url-previous", "baseoriginal="],
    ["url-translated", "basetarget="],
  ].map(([id, param])=>{
    let v = document.getElementById(id).value;
    return (v.length>0)?(param+v):"";
  }).filter(text => text.length)

  params = params.join('&');
  if ( params.length > 5 ) {
    url += "?" + params;
  }

  let link = document.getElementById("url-generated");
  link.innerText = url;
  link.href = url;
}


document.addEventListener("DOMContentLoaded", ()=>{
  setTimeout(generateUrl, 500);
});
