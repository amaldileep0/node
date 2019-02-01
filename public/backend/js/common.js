
function modalLoading (title, message) {
    var a = bootbox.dialog({
        title: title,
        message: message,
        closeButton: false,
        onEscape: function()
        {
            return false;
        }
    });
    return {
        hide: function()
        {
            $(a).modal('hide');
        },
        setTitle: function(text)
        {
            $(a).find('.modal-title').html(text);
        },
        setMessage: function(text)
        {
            $(a).find('.modal-body').html(text);
        }
    }
}
