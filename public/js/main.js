let alertMsg = [];
alertMsg[0] = 'Member details deleted successfully';
alertMsg[1] = 'Member details updated successfully';

let targetUrl;

$('.closebtn').click(function() {
	let div = this.parentElement;
	$(div).addClass('d-none');
});

$(".editBtn").click(function() {
    let x = this.id;
    let id = x.substring(1, 33);
    let rev = x.substring(38, x.length);
    console.log(id);
    console.log(rev)
    $("#delKey").val(id);
	$("#delRev").val(rev);
	let name;
    for (var i = member.length - 1; i >= 0; i--) {
	    if (member[i].key === id) {
	        console.log(member[i].first +' '+ member[i].last);
	    	name = member[i].first +' '+ member[i].last;
	    	$('#editHeader').text(name);
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
	$('.alertMsg').text(alertMsg[0]);
	$('#alert').removeClass("success");
	$('#alert').removeClass('d-none');
	$("#delForm").submit();
    return false
});

$('form.editForm').on('submit', function() {
	$('#modup').modal('toggle');
	$('.alertMsg').text(alertMsg[1]);
	$('#alert').addClass("success");
	$('#alert').removeClass('d-none');
	return false
});


  
$(document).ready(function () {
	$('#dtBasicExample').DataTable();
	$('.dataTables_length').addClass('bs-select');

});

