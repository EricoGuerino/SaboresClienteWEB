function enviarContato() {
    var input_nome = document.getElementById('nome');
    var input_categoria = document.getElementById('categoria');
    var input_assunto = document.getElementById('assunto');
    var input_email = document.getElementById('email');

    var nome = input_nome.value;
    var categoria = input_categoria.value;
    var assunto = input_assunto.value;
    var email = input_email.value;

    console.log(nome);
    console.log(categoria);
    console.log(assunto);
    console.log(email);
    var nomeFinal;
    if (nome != '') {
        nomeFinal = nome.split(' ')[0];
    }
    
    let session = retornaParamUrl('session');
    window.location.href = "retornoContato.html?nome="+nomeFinal+"&email="+email+((session != '') ? '&session='+session : '');
}