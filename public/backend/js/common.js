/* *
-- =================================================================================
-- Author       :  Digitalmesh
-- Create date  :  Jan-24-2018
-- Description  :  Get user details function on master page
-- =================================================================================
*/

/* on ready */
$(document).ready(function(){
	getUserDetails();
})

/* ajax call to get user details */
function getUserDetails(){
	$.ajax({
		type: "GET",
		data: '',
		url: "/ajaxGetUser",
		cache: false,
	}).done(function(data){
		if(data) {
			$("#logged-name").html("<a href='/editProfile'>Logged in as "+data.firstName+ ' '+data.lastName+"</a>")
		}
	}).fail(function (jqXHR, textStatus, error) {
		$("#logged-name").html('');
	})
}