let txti = [];
let txtid = [];
let txt = [];

const speed = 100;

txt[0] = 'JET Services';
txt[1] = 'Delivering connectivity right with your reach.';
txtid[0] = 'mainheader'
txtid[1] = 'mainheadersub'
txti = [0,0];

function typeIt (n) {
  let x = txt[n].length;
  document.getElementById(txtid[n]).innerHTML += txt[n].charAt(txti[n]);
  txti[n]++;
  if (txti[n] <= x) {
  	setTimeout( typeIt, speed/(n+1), n );
  };
  
};

  

$(document).ready(function () {
	$("#content").fadeOut(100);
  $("#bg-opaque").fadeOut(100);
	$("#content").fadeIn(2000);
  setTimeout( ($("#bg-opaque").fadeIn(6000)), 2000,);
  setTimeout( typeIt, 2000, 0 );
	setTimeout( typeIt, 4000, 1 );

});