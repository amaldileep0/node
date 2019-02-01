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
$(".delete-user").on("click",function(){
    var userId = $(this).attr('data-user-id')
    var ajaxUrl  = '/user/deleteUser'
    bootbox.confirm({
        message: "Are you sure, this user will be deleted forever",
        buttons: {
            confirm: {
                label: 'Yes',
                className: 'btn-success'
            },
            cancel: {
                label: 'No',
                className: 'btn-danger'
            }
        },
        callback: function (result) {
            if(result) {
                var actioning = modalLoading('Please wait...','While we\'r deleting the user.');
                $.post(ajaxUrl, 
                    {
                        id: userId
                    },function(res) {
                        actioning.hide()
                        if (typeof (res) !== 'undefined' && res.status === 'success') {
                            bootbox.alert("User deleted successfully",function(){ window.location.reload() });
                        } else if(typeof (res) !== 'undefined' && res.status === 'error') {
                            bootbox.alert("We'r sorry unable to delete user right now.")
                        }
                    }).fail(function (err) {
                        actioning.hide()
                    })
            }
        }
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
