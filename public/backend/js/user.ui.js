$(document).ready(function() {
    $('#user-list').DataTable({'searching' : false,
    columnDefs: [{  "targets": 'no-sort',
          "orderable": false }
]});
} );
$(".edit-user").on("click",function(){
    var userId = $(this).attr('data-user-id')
    var ajaxUrl  = '/user/getUserDataForUpdate'
    $.get(ajaxUrl, 
        {
            id: userId
        },function(data) {
            $("#editModal").modal("show");
            $('#edit-user-modal-body').html(data);
        });
});
$(".user-update-btn").on("click",function( event ) {
    event.preventDefault();
    var url = '/account/getValidationRules/editUser'
    httpGet(url, '', function (response) {
        if (response.error) {
          throw new Error(response.message)
        } else {
            rules = response.data
        }
        errors = validateForm($("#user-update-form"), event);
        if (errors.length > 0){
            createUserErrorMessage(errors);
        } else {
            $("#user-update-form").submit()
        }
      })
});
function createUserErrorMessage(errors){
    var errorDict = {};
    if (errors != "" && errors != undefined && errors != null) {
    $.each(errors, function (index, value) {
        $.each(value, function (index1, value1) {
            fieldName = index1;
            messages = value1;
            console.log(fieldName)
            messageList = [];
            $.each(messages, function (index2, value2) {
                messageList.push(value2);
            });
            errorDict[fieldName] = messageList;
        });
                });
    $.each(errorDict, function (field, msg) {
        $('#' + field+'_error').css('display', 'block');
        $('#' + field+'_error').text(msg);
    });
}
}