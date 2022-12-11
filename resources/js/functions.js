function showModal() {
    let dialog = document.getElementById('login_dialog');

    if (typeof dialog.showModal === "function") {
        dialog.showModal();
    } else {
        alert("Sorry, the <dialog> API is not supported by this browser.");
    }
}

function closeModal() {
    let dialog = document.getElementById('login_dialog');
    dialog.close();
}

function alterarPainelLogin(login) {
    let underline_login = document.getElementById('underline_login');
    let underline_usuario = document.getElementById('underline_usuario');
    let a_login = document.getElementById('a_login');
    let a_usuario = document.getElementById('a_usuario');
    underline_usuario.innerHTML = '';
    underline_login.innerHTML = '';
    if (login != null && login.ok) {
        a_usuario.setAttribute('onclick', 'javascritp:acessarAreaUsuario('+login.cliente.id+');');
        a_login.setAttribute('onclick', 'javascript:realizarLogout('+login.cliente.id+');');
        underline_usuario.innerHTML = login.cliente.nome;
        underline_login.innerHTML = 'Logout';
    } else {
        a_usuario.removeAttribute('onclick');
        a_login.setAttribute('onclick', 'javascript:realizarLogin();');
        underline_usuario.innerHTML = 'usuario';
        underline_login.innerHTML = 'Login';
    }
}

function retornaParamUrl(parte) {
    let url = window.location.href;
    let urlParts = url.split('?');
    
    if (urlParts.length > 1) {
        let urlParams = urlParts[1].split('&');
        for (let i = 0; i < urlParams.length; i++) {
            let paramsParts = urlParams[i].split('=');
            let key = paramsParts[0];
            if (key == parte) {
                return paramsParts[1];
            }
        }
    }

    return '';
}

function retornaContextPage() {
    let url = window.location.href;
    let urlParts = url.split('?');
    let page = '';
    if (urlParts.length > 1) {
        let urlPages = urlParts[0].split('/');
        page = urlPages[urlPages.length-1];
    } else {
        let urlPages = url.split('/');
        page = urlPages[urlPages.length-1];
    }

    return page;
}

function checarSessao() {
    console.log(window.location.href);
    let session = retornaParamUrl('session');
    if (session != '') {
        let login = checkSession(session);

        if (login != null && login != 'undefined') {
            alterarPainelLogin(login);
            prepararRedirectPages(session);
            if (login.ok == false) {
                window.location.href = 'index.html';
                alert('Sessão expirou!');
            } 
        }
    }
}

function prepararRedirectPages(session) {
    var links = document.getElementsByTagName('a');
    for (let i = 0; i < links.length; i++) {
        links[i].href = links[i].href != '' ? links[i].href+'?session='+session : '#';
    }
}

function carregarCidades(input) {
    let estado_id = input.value;
    let input_endereco_cidade = document.getElementById('input_endereco_cidade');
    input_endereco_cidade.innerHTML = '';
    let json = carregarCidadesPorUF(estado_id);
    let optionDefault = document.createElement('option');
    optionDefault.value = "0";
    optionDefault.innerHTML = "Selecione..";
    input_endereco_cidade.appendChild(optionDefault);

    for (let i = 0; i < json.length; i++) {
        let option = document.createElement('option');
        option.value = json[i].id;
        option.innerHTML = json[i].nome;
        input_endereco_cidade.appendChild(option);
    }
}

function alteraForm(input) {
    let pessoa = input.value != "0" ? input.value : 'FISICA';
    let col_cpf = document.getElementById('col_cpf'); 
    let col_cnpj = document.getElementById('col_cnpj');
    let col_ie = document.getElementById('col_ie'); 
    let col_not_ie = document.getElementById('col_not_ie'); 
    let row_nome = document.getElementById('row_nome'); 
    let row_nome_fantasia = document.getElementById('row_nome_fantasia'); 
    let row_razao_social = document.getElementById('row_razao_social');
    let row_site = document.getElementById('row_site');

    if (pessoa == 'FISICA') {
        col_cpf.style.display = 'block';
        col_not_ie.style.display = 'block';
        row_nome.style.display = 'block';
        col_cnpj.style.display = 'none';
        col_ie.style.display = 'none';
        row_nome_fantasia.style.display = 'none';
        row_razao_social.style.display = 'none';
        row_site.style.display = 'none';
    } else {
        col_cpf.style.display = 'none';
        col_not_ie.style.display = 'none';
        row_nome.style.display = 'none';
        col_cnpj.style.display = 'block';
        col_ie.style.display = 'block';
        row_nome_fantasia.style.display = 'block';
        row_razao_social.style.display = 'block';
        row_site.style.display = 'block';
    }
}

function carregarOpcoesTipoLogradouro() {
    let input_endereco_tipo_logradouro = document.getElementById('input_endereco_tipo_logradouro');
    let optionDefault = document.createElement('option');
    optionDefault.value = "0";
    optionDefault.innerHTML = "Selecione..";
    input_endereco_tipo_logradouro.append(optionDefault);
    let tipos = carregarTiposLogradouro();

    for (let i=0; i < tipos.length; i++) {
        let option = document.createElement('option');
        option.value = tipos[i];
        option.innerHTML = tipos[i];
        input_endereco_tipo_logradouro.appendChild(option);
    }
}

function carregarOpcoesUF() {
    let input_endereco_uf = document.getElementById('input_endereco_uf');
    let optionDefault = document.createElement('option');
    optionDefault.value = "0";
    optionDefault.innerHTML = "Selecione..";
    input_endereco_uf.append(optionDefault);
    let estados = carregarEstados();

    for (let i=0; i < estados.length; i++) {
        let option = document.createElement('option');
        option.value = estados[i].id;
        option.innerHTML = estados[i].nome;
        input_endereco_uf.appendChild(option);
    }
}

function carregarPadroes() {
    let input_tipo_cliente = document.getElementById('input_tipo_cliente');
    input_tipo_cliente.setAttribute('value', 'FISICA');
    alteraForm(input_tipo_cliente);

    document.getElementById('input_contato_is_whats1').setAttribute('disabled','disabled');
    document.getElementById('input_contato_is_whats2').setAttribute('disabled','disabled');
    document.getElementById('input_contato_is_whats3').setAttribute('disabled','disabled');
}

function alteraContato(input, row) {
    let tipo = input.value;
    let checkbox = document.getElementById('input_contato_is_whats'+row);
    if (tipo != 'CELULAR') {
        if (checkbox.checked) {
            checkbox.checked = false;
        }
        checkbox.setAttribute('disabled', 'disabled');
    } else {
        checkbox.removeAttribute('disabled');
    }
}

function visualizarPassword(inputTxt) {
    console.log(inputTxt);
    let input = document.getElementById(inputTxt);
    console.log(input);
    let type = input.type;
    if (type === 'text') {
        input.setAttribute('type', 'password');
    } else {
        input.setAttribute('type', 'text');
    }
    input.focus();
}

function acessarAreaUsuario(idCliente) {
    let session = retornaParamUrl('session');
    window.location.href = 'cadastro.html?id='+idCliente+'&session='+session;
}

function alteraFormClienteLogado() {
    let idCliente = retornaParamUrl('id');
    let session = retornaParamUrl('session');

    if (idCliente == null || idCliente == '' || idCliente == 'undefined') {
        return;
    }

    let cliente = obterCliente(idCliente);

    document.getElementById('input_id_hidden').value = cliente.id;

    if (cliente.tipoCliente == 'FISICA') {
        document.getElementById('input_tipo_cliente').value = 'FISICA';
        document.getElementById('input_cpf').value = cliente.cpfCnpj;
        document.getElementById('input_nome').value = cliente.nome;
    } else {
        document.getElementById('input_tipo_cliente').value = 'JURIDICA';
        document.getElementById('input_cnpj').value = cliente.cpfCnpj;
        document.getElementById('input_ie').value = cliente.ie;
        document.getElementById('input_nome_fantasia').value = cliente.nomeFantasia;
        document.getElementById('input_razao_social').value = cliente.razaoSocial;
        document.getElementById('input_site').value = cliente.site;
    }

    document.getElementById('input_endereco_tipo_logradouro').value = cliente.endereco.tipoLogradouro;
    document.getElementById('input_endereco_logradouro').value = cliente.endereco.logradouro;
    document.getElementById('input_num').value = cliente.endereco.numLogradouro;
    document.getElementById('input_endereco_complemento').value = cliente.endereco.complemento;
    document.getElementById('input_endereco_bairro').value = cliente.endereco.bairro;
    document.getElementById('input_cep').value = cliente.endereco.cep;
    let input_uf = document.getElementById('input_endereco_uf');
    input_uf.value = cliente.endereco.uf;
    carregarCidades(input_uf)
    document.getElementById('input_endereco_cidade').value = cliente.endereco.cidade;

    var contatos = cliente.contato;

    if (contatos.length > 0) {
        document.getElementById('input_hidden_contato_id1').value = contatos[0].id;
        let input_tipo_1 = document.getElementById('input_contato_tipo_telefone1');
        input_tipo_1.value = contatos[0].tipo;
        document.getElementById('input_contato_ddd1').value = contatos[0].ddd;
        document.getElementById('input_contato_tel1').value = contatos[0].numero;
        if (contatos[0].isWhatsapp) {
            document.getElementById('input_contato_is_whats1').setAttribute('checked', true);
        }
        alteraContato(input_tipo_1,'1');

        if (contatos.length > 1) {
            document.getElementById('input_hidden_contato_id2').value = contatos[1].id;
            let input_tipo_2 = document.getElementById('input_contato_tipo_telefone2');
            input_tipo_2.value = contatos[1].tipo;
            document.getElementById('input_contato_ddd2').value = contatos[1].ddd;
            document.getElementById('input_contato_tel2').value = contatos[1].numero;
            if (contatos[1].isWhatsapp) {
                document.getElementById('input_contato_is_whats2').setAttribute('checked', true);
            }
            alteraContato(input_tipo_2,'2');

            if (contatos.length > 2) {
                document.getElementById('input_hidden_contato_id3').value = contatos[2].id;
                let input_tipo_3 = document.getElementById('input_contato_tipo_telefone3');
                input_tipo_3.value = contatos[2].tipo;
                document.getElementById('input_contato_ddd3').value = contatos[2].ddd;
                document.getElementById('input_contato_tel3').value = contatos[2].numero;
                if (contatos[2].isWhatsapp) {
                    document.getElementById('input_contato_is_whats3').setAttribute('checked', true);
                }
                alteraContato(input_tipo_3,'3');
            }        
        }
    }
    
    document.getElementById('input_contato_email').value = cliente.email;
    document.getElementById('col_password').style.display = "none";
    let button_confirmar_alterar = document.getElementById('button_confirmar_alterar');
    let button_trocar_senha = document.getElementById('button_trocar_senha');
    let button_compras = document.getElementById('button_visualizar_compras');
    let button_encerrar_cadastro = document.getElementById('button_encerrar_cadastro');
    button_confirmar_alterar.setAttribute('onclick','javascript:alterarUsuario("'+cliente.id+'");');
    button_confirmar_alterar.innerHTML = '';
    button_confirmar_alterar.innerHTML = 'Alterar Dados';
    button_trocar_senha.style.removeProperty("display");
    button_trocar_senha.action = 'trocarSenha.html?id='+cliente.id+'&session='+session;
    button_compras.style.removeProperty("display");
    button_compras.style.action = 'visualizarCompras.html?id='+cliente.id+'&session='+session;
    button_encerrar_cadastro.style.removeProperty("display");
    button_encerrar_cadastro.setAttribute('onclick', 'javascript:deletarUsuario('+cliente.id+');');

}

function navegarTrocarSenha() {
    let session = retornaParamUrl('session');
    let id = retornaParamUrl('id');
    window.location.href = "trocarSenha.html?id="+id+"&session="+session;
}

function carregarValoresTrocaSenha() {
    let id = retornaParamUrl('id');
    let session = retornaParamUrl('session');
    let cliente = obterCliente(id);
    document.getElementById('input_contato_email').value = cliente.email;
    document.getElementById('button_ir_dados_pessoais').href = "cadastro.html?id="+id+"&session="+session;
    document.getElementById('button_trocar_senha').setAttribute('onclick', 'javascript:trocarSenha("'+id+'");');
}

function navegarVisualizarCompras() {
    let session = retornaParamUrl('session');
    let id = retornaParamUrl('id');
    window.location.href = "comprasUsuario.html?id="+id+"&session="+session;
}

function navegarParaDadosPessoais() {
    let session = retornaParamUrl('session');
    let id = retornaParamUrl('id');
    window.location.href = "cadastro.html?id="+id+"&session="+session;
}