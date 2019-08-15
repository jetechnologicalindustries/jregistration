 $('#addMember').click(function() {
    $("#addMember").attr("disabled", true);
    $("#addMember").text('Checking...');
    let f = $("#inputFirst").val();
    let l = $("#inputLast").val();
    let name = f +' '+ l;
    console.log(name);
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

});