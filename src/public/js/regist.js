/**
 * Created by yjc on 2017-10-31.
 */

$(function () {
    $('#username_reg').on('keyup', function () {
        var username = $(this).val();
        if(!username) {
            $(this).parent().addClass('has-error');
            $(this).prev().addClass('text-danger');
        } else {
            $(this).parent().removeClass('has-error');
            $(this).prev().removeClass('text-danger');
        }

        var password = $('#password_reg').val();

        if(username&&password){
            $('#btn-regist').attr('disabled', false);
        } else {
            $('#btn-regist').attr('disabled', true);
        }
    });

    $('#password_reg').on('keyup', function () {
        var password = $(this).val();
        if(!password) {
            $(this).parent().addClass('has-error');
            $(this).prev().addClass('text-danger');
        } else {
            $(this).parent().removeClass('has-error');
            $(this).prev().removeClass('text-danger');
        }

        var username = $('#username_reg').val();

        if(username&&password){
            $('#btn-regist').attr('disabled', false);
        } else {
            $('#btn-regist').attr('disabled', true);
        }
    });

    $('#btn-regist').on('click', function () {
        var username = $('#username_reg').val();
        var password = $('#password_reg').val();
        if(username&&password) {
            $.ajax({
                url: '/api/regist',
                type: 'post',
                data: {
                    username: username,
                    password: password
                },
                dataType: 'json',
                success: function (res) {
                    console.log(res);
                }
            })
        } else
            return false;
    })
});

