$(document).ready(function () {
	

	let rowsText = '';
	for (var i = items.length - 1; i >= 0; i--) {
		  let rowText = ''
		  rowText = rowText + "<tr>";
		  rowText = rowText + "<td class='pl-1'>"+ items[i].pname +"</td>";
          if (items[i].notif===1) {
          	// rowText = rowText + "<td class='pl-1 text-center'> ❌ </td><td class='pl-1 text-center'> ❌ </td>";
          	rowText = rowText + "<td class='pl-1 text-center'> ❌ </td><td class='pl-1 text-center'> ❌ </td>";
          	rowText = rowText + "<td class='pl-1 text-center'> ❌ Not Registered️ </td>";
          }else {
          	rowText = rowText + "<td class='pl-1 text-center'> ✔️ </td>";
    	  	// rowText = rowText + "<td class='pl-1'>"+ items[i].notifdate +"</td>";
       	 	rowText = rowText + "<td class='pl-1'>"+ items[i].cpr +"</td>";
       	  	// rowText = rowText + "<td class='pl-1'>"+ items[i].cprval +"</td>";
       	  	rowText = rowText + "<td class='pl-1'> ✔ Registered </td>"; 
          };
	               
          // rowText = rowText + "<td class='pl-1'>"+ items[i].stats +"</td>";
          rowText = rowText + "<td class='pl-1'>"+ items[i].pack +"</td>";
          rowText = rowText + "<td class='pl-1'>"+ items[i].packsize +"</td>";

          if (items[i].cfs===1) {
          	rowText = rowText + "<td class='pl-1 text-center'> ✔ </td>";
          }else {
          	rowText = rowText + "<td class='pl-1 text-center'> ❌️ </td>";
          };
          if (items[i].ing===1) {
          	rowText = rowText + "<td class='pl-1 text-center'> ✔ </td>";
          }else {
          	rowText = rowText + "<td class='pl-1 text-center'> ❌️ </td>";
          };
          if (items[i].labf===1) {
          	rowText = rowText + "<td class='pl-1 text-center'> ✔ </td>";
          }else {
          	rowText = rowText + "<td class='pl-1 text-center'> ❌️ </td>";
          };
          if (items[i].labb===1) {
          	rowText = rowText + "<td class='pl-1 text-center'> ✔ </td>";
          }else {
          	rowText = rowText + "<td class='pl-1 text-center'> ❌️ </td>";
          };
          if (items[i].pif===1) {
          	rowText = rowText + "<td class='pl-1 text-center'> ✔ </td>";
          }else {
          	rowText = rowText + "<td class='pl-1 text-center'> ❌️ </td>";
          };
          if (items[i].sample===1) {
          	rowText = rowText + "<td class='pl-1 text-center'> ✔ </td>";
          }else {
          	rowText = rowText + "<td class='pl-1 text-center'> ❌️ </td>";
          };
          rowText = rowText + "<td class='pl-1'>"+ items[i].remarks +"</td>";
          rowText = rowText + "</tr>";
          rowsText = rowsText + rowText;
	}
	$("table tbody").append(rowsText);
	$('#cosmeticTable').DataTable();
});