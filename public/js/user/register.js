$('form').on('submit',(e)=>{
    "use strict";
    e.preventDefault();
    $.ajax({
        url:'/register',
        type:'POST',
        data:$('form').serialize(),
        statusCode:{
            202:()=>{
                alert('Вы успешно зарегистрированы!');
                window.location.href='/login'
            },
            406:()=>{
                $('form').append('<div class="alert alert-danger">Вы ввели неправильные данные</div>')
            }
        }
    })
});