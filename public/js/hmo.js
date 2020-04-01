$('#hospitalInput').on('change', function() {
  if (this.value === "TMC") {
  	$('#tmcHmo').removeClass('d-none')
  	$('#mvmcHmo').addClass('d-none')
  };
    if (this.value === "MVMC") {
  	$('#mvmcHmo').removeClass('d-none')
  	$('#tmcHmo').addClass('d-none')
  };
    if (this.value === "Select Hospital") {
  	$('#mvmcHmo').addClass('d-none')
  	$('#tmcHmo').addClass('d-none')
  };
});

$(document).ready(function () {
	    let hmotableVar = $('#hmoTable').DataTable({  
           "columns"     :     [  
			    {	"data"	: 	"key"			},
			    {	"data"	: 	"checkNo"		},
			    {	"data"	: 	"checkDate"		},
			    {	"data"	: 	"checkDateRec"	},
			    {	"data"	: 	"checkAmt"		},
			    {	"data"	: 	"checkBal"		},
			    {	"data"	: 	"taxPercentage"	},
			    {	"data"	: 	"taxWithheld"	},
			    {	"data"	: 	"status2307"	},
			    {	"data"	: 	"orIssued"		},
			    {	"data"	: 	"orDateIssued"	}
           ]  
      });
	for (var i = wholeData.length - 1; i >= 0; i--) {
		hmotableVar.row.add( wholeData[i] ).draw();
	}
	$('.dataTables_length').addClass('bs-select');
	$(".updateSendBtn").attr("disabled", true);
	$(".delSendBtn").attr("disabled", true);

});

