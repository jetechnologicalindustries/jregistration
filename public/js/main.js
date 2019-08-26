let alertMsg = [];
alertMsg[0] = 'Member details deleted successfully';
alertMsg[1] = 'Member details updated successfully';
alertMsg[2] = 'Please complete all the required fields';
let pathname = (window.location.pathname).toString();
console.log(pathname);
let targetUrl;
let rerouter = '{{rerouter}}';



$('form.delForm').on('submit', function() {
	$('#moddel').modal('toggle');
	$("#delForm").submit();
    return false
});

$('form.editForm').on('submit', function() {
	// $('#modup').modal('toggle');
	$("#updateSendBtn").attr("disabled", true);
	$("#updateSendBtn").text('Adding...');
	$("#editForm").submit();
	return false
});

// NEW MEMBER PAGE


function checkViewPort() {
	if (mustbeLandscape===true) {
		if(window.innerHeight > window.innerWidth){
	        $('#portaitalert').removeClass('d-none');
	        $('#content').addClass('d-none');
	    } else {
	    	$('#portaitalert').addClass('d-none');
	    	$('#content').removeClass('d-none');
	    }
	} else {
		$('#portaitalert').addClass('d-none');
	    $('#content').removeClass('d-none');
	}
};

$(window).resize(function(){
    checkViewPort();
});

$(document).ready(function () {
	//for rerouter
	$("#rerouteForm").submit();
	//for rerouter end
	if (demo===false) {
		$('#membersTable').DataTable();
		$('.dataTables_length').addClass('bs-select');
	}
	checkViewPort();
    $('#portaitalert').removeClass('invisible');
    $('#content').removeClass('invisible');
    
    //demo members load
    if (demo===true) {
    	let tablerows
	    for (var i = member.length - 1; i >= 0; i--) {
	    	let row
	    	row = row+"<tr id='row"+member[i].key+"'><td class='pl-1'>"+member[i].last+"</td><td class='pl-1'>"+member[i].first+"</td><td class='pl-1'>"+member[i].age+"</td><td class='pl-1'>"+member[i].city+"</td><td class='pl-1'>"+member[i].com+"</td>";
	        row = row+"<td><div class='text-center'><button type='button' class='btn btn-info editBtn' id='e"+member[i].key+"' data-toggle='modal' data-target='#modup'><span class='text-white'>✏</span></button>"
	        row = row+"<button type='button' class='btn btn-info printBtn' id='p"+member[i].key+"' data-toggle='modal' data-target='#modprint'><span class='text-white'>🖨️</span></button>"
	        row = row+"<button type='button' class='btn btn-danger delBtn' id='d"+member[i].key+"' data-toggle='modal' data-target='#moddel'><span class='text-white' aria-hidden='true'>✖️</span></button></div></td></tr>"
	    	tablerows = tablerows + row;
	    }
	    $("table tbody").append(tablerows);
	    $('#membersTable').DataTable();
		$('.dataTables_length').addClass('bs-select');
		$("#updateSendBtn").attr("disabled", true);
		$("#printSendBtn").attr("disabled", true);
		$("#delSendBtn").attr("disabled", true);
    }
    
    $('.closebtn').click(function() {
		let div = this.parentElement;
		$(div).addClass('d-none');
	});

	$(".editBtn").click(function() {
	    let x = this.id;
	    let id = x.substring(1, x.length);
	    console.log(id);
	    $("#upKey").val(id);
		let name;
	    for (var i = member.length - 1; i >= 0; i--) {
		    if (member[i].key === id) {
		        console.log('Pulling up  ' + member[i].first +' '+ member[i].last +"'s data");
		        name = member[i].first +' '+ member[i].last;
		    	$('#editHeader').text(name);
		    	$("#upRev").val(member[i].rev);
		    	$('#inputeFirst').val(member[i].first);
				$('#inputeLast').val(member[i].last);
				$('#inputeAge').val(member[i].age);
				$('#inputeDob').val(member[i].dob);
				$('#inputeEmail').val(member[i].email);
				$('#inputeContact').val(member[i].contact);
				$('#inputeCompany').val(member[i].com);
				$('#inputeCity').val(member[i].city);
				$('#inputeLastpayamt').val(member[i].lastpayamt);
				$('#inputeLastpayment').val(member[i].lastpayment);
				$('#inputeStanding').val(member[i].standing);
				$('#inputeDues').val(member[i].dues);
		    };
	  	};
	  	console.log('rev# ' + $("#upRev").val());
	});

	$(".printBtn").click(function() {
	    let x = this.id;
	    let id = x.substring(1, x.length);
	    console.log(id);
		let name;
	    for (var i = member.length - 1; i >= 0; i--) {
		    if (member[i].key === id) {
		        console.log(member[i].first +' '+ member[i].last);
		    	name = member[i].first +' '+ member[i].last;
		    };
	  	};
		$("#printHeader").text(name);
	});

	$(".delBtn").click(function() {
	    let x = this.id;
	    let id = x.substring(1, x.length);
	    console.log(id);
	    $("#delKey").val(id);
		let name;
		let rev;
	    for (var i = member.length - 1; i >= 0; i--) {
		    if (member[i].key === id) {
		        console.log(member[i].first +' '+ member[i].last);
		    	name = member[i].first +' '+ member[i].last;
		    	rev = member[i].rev;
		    };
	  	};
	  	console.log(rev);
	  	$("#delRev").val(rev);
	  	$("#delName").val(name);
		$("#delHeader").text(name);
	});

});

