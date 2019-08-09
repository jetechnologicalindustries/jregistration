let alertMsg = [];
alertMsg[0] = 'Member details deleted successfully';
alertMsg[1] = 'Member details updated successfully';
alertMsg[2] = 'Please complete all the required fields';
let pathname = (window.location.pathname).toString();
console.log(pathname);
let targetUrl;
let rerouter = '{{rerouter}}';

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

$('#addMember').click(function() {
	$("#addMember").attr("disabled", true);
	$("#addMember").text('Adding...');
	let f = $("#inputFirst").val();
	let l = $("#inputLast").val();
	let name = f +' '+ l;
	console.log(f);
	if (name===' ') {
		console.log('Must put a name');
		$("#addMember").attr("disabled", false);
		$("#addMember").text('Add Member');
	}else{
		$("#addform").submit();
	}
	return false
});

	
$(document).ready(function () {
	//for rerouter
	$("#rerouteForm").submit();
	//for rerouter end
	$('#dtBasicExample').DataTable();
	$('.dataTables_length').addClass('bs-select');

});

