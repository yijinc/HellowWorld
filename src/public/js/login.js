/**
 * Created by yjc on 2017-10-31.
 */

$(function () {

    var loading = false;

    $('#username_login').on('keyup', function () {
        var username = $(this).val();
        if(!username) {
            $(this).parent().addClass('has-error');
            $(this).prev().addClass('text-danger');
        } else {
            $(this).parent().removeClass('has-error');
            $(this).prev().removeClass('text-danger');
        }

        var password = $('#password_login').val();

        if(username&&password){
            $('#btn-login').attr('disabled', false);
        } else {
            $('#btn-login').attr('disabled', true);
        }
    });

    $('#password_login').on('keyup', function () {
        var password = $(this).val();
        if(!password) {
            $(this).parent().addClass('has-error');
            $(this).prev().addClass('text-danger');
        } else {
            $(this).parent().removeClass('has-error');
            $(this).prev().removeClass('text-danger');
        }

        var username = $('#username_login').val();

        if(username&&password){
            $('#btn-login').attr('disabled', false);
        } else {
            $('#btn-login').attr('disabled', true);
        }
    });

    $('#btn-login').on('click', function () {

        if(loading)
            return ;
        loading = true;

        var username = $('#username_login').val();
        var password = $('#password_login').val();
        if(username&&password) {
            $.ajax({
                url: '/api/login',
                type: 'post',
                data: {
                    username: username,
                    password: password
                },
                dataType: 'json',
                success: function (res) {

                    loading = false;

                    console.log(res);

                    if(res.success) {




                    } else {

                    }
                }
            })
        } else
            return false;
    })
});

