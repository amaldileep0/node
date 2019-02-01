
var rules
var formId
var page
$(document).ready(function () {
// 	getRules()
// 	if (typeof (formId) != 'undefined') {
//     var form = $(formId)
//     form.submit(function (event) {
//       errors = validateForm(form, event);
//       if (errors.length > 0){
//         showErrorMessages(errors);
//       }
//       else{
//         if(formId == '#login-form'){
//           email = $(formId).find('input[name=email]').val();
//           password = $(formId).find('input[name=password]').val();
//           $(formId).find('input[name=email]').val(encrypt(email));
//           $(formId).find('input[name=password]').val(encrypt(password));
//         }
//       }
//     })
//   }
// })

// function getRules () {
// 	var url;
// 	var route = window.location.pathname.replace(
// 		/(\/[a-zA-Z0-9-]+\/[a-zA-Z0-9-]+)\/?.*/, '$1'
// 	)

// 	switch (route) {
//     case '/login':
//       page = 'login'
// 			formId = '#login-form'
// 			break
// 		case '/signup':
// 			page = 'signup'
// 			formId = '#signup-form'
// 			break
// 		default:
// 			break
// 	}
//   url = '/auth/getValidationRules/'+page

// 	if (typeof (url) !== 'undefined') {
//     httpGet(url, '', function (response) {
//       if (response.error) {
//         throw new Error(response.message)
//       } else {
// 				rules = response.data
//       }
//     })
//   }
// }

function httpGet(url, data, responseCallback){
    $.ajax({
      type: 'GET',
      url: url,
      data: data,
      cache: false,
      success: function(responseData){
        if (isJson(responseData)) {
          if (typeof (responseData.error) === 'undefined' ||
              responseData.error === null
          ) {
            return responseCallback({
              error: true,
              message: 'Error data is null or undefined in response JSON'
            })
          } else {
            return responseCallback(responseData)
          }
        } else {
          return responseCallback({
            error: true,
            message: 'Response data is not a JSON object'
          })
        }
      }
    })
  }

  // function validateForm(form, event){

  //   errrorData = []
  // 	if (typeof (rules) !== 'undefined' && form.length) {
  //     errors = []
  //     var errors = validate(form, rules);
  //     if (errors) {
  //       event.preventDefault();
  //       for(var err in errors){
  //         item = {}
  //         value  = errors[err];
  //         item[err] = value;
  //         errrorData.push(item);
  //       }
  //     }
  //     return errrorData;
  //   }
  // }

  function isJson (item) {
    item = typeof item !== 'string'
        ? JSON.stringify(item)
        : item

    try {
      item = JSON.parse(item)
    } catch (e) {
      return false
    }

    if (typeof item === 'object' && item !== null) {
      return true
    }

    return false
  }

  // function showErrorMessages (errors) {
  // 	var route = window.location.pathname.replace(/(\/[a-zA-Z0-9-]+\/[a-zA-Z0-9-]+)\/?.*/, '$1')

  // 	switch (route) {
  // 		case '/login':
  //       loginErrorMessage(errors);
  // 			break
  // 		case '/signup':
  // 			signupErrorMessage(errors);
  // 			break
  // 		default:
  // 			break
  //   }
  // }
})