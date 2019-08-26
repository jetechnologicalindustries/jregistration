let txti = [];
let txtid = [];
let txt = [];

const speed = 100;

txt[0] = 'JET Services';
txt[1] = 'Delivering connectivity right within your reach.';
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

function activateBtn () {
  $("#btn1").fadeIn(1000);
  $("#btn1").text("Next");
  $('#btn1').attr("disabled", false);  
}

$("#btn1").click(function() {
    var offset = 20; //Offset of 20px
    $('html, body').animate({
        scrollTop: $("#section1").offset().top + offset
    }, 1000);
});

$(document).ready(function () {
	$("#content").fadeOut(100);
  $("#bg-opaque").fadeOut(100);
  $("#btn1").fadeOut(100);
	$("#content").fadeIn(2000);
  $("#bg-opaque").fadeIn(6000);
  setTimeout( typeIt, 2000, 0 );
	setTimeout( typeIt, 4000, 1 );
  setTimeout( activateBtn, 6000);


});