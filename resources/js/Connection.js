const GET = 'GET';
const POST = 'POST';
const PUT = 'PUT';
const DELETE = 'DELETE';
const producao = false;
const BASE_URL_FILTROS = producao ? 'http://www.erico1916.c41.integrator.host:10500/' : 'http://localhost:8080/';
const BASE_URL_PRODUTOS = producao ? 'http://www.erico1916.c41.integrator.host:10499/' : 'http://localhost:8180/';
const BASE_URL_CLIENTES = producao ? 'http://www.erico1916.c41.integrator.host:10500/' : 'http://localhost:8280/';
const BASE_URL_COMPRAS = producao ? 'http://www.erico1916.c41.integrator.host:10500/' : 'http://localhost:8380/';

function listarProdutos() {
    const conn = new XMLHttpRequest();
    conn.open(GET, BASE_URL_PRODUTOS+"produtos", false);
    conn.send();
    let resposta = conn.responseText
    console.log(resposta);
    
    return JSON.parse(resposta);
}

function listarCategorias() {
    const conn = new XMLHttpRequest();
    conn.open(GET, BASE_URL_FILTROS+"categorias", false);
    conn.send();
    let resposta = conn.responseText
    console.log(resposta);
    
    return JSON.parse(resposta);
}

function listarFabricantes() {
    const conn = new XMLHttpRequest();
    conn.open(GET, BASE_URL_FILTROS+"fabricantes", false);
    conn.send();
    let resposta = conn.responseText
    console.log(resposta);
    
    return JSON.parse(resposta);
}

function listarEstoque() {
    const conn = new XMLHttpRequest();
    conn.open(GET, BASE_URL_PRODUTOS+"estoque/controle", false);
    conn.send();
    let resposta = conn.responseText
    console.log(resposta);
    
    return JSON.parse(resposta);
}

function obterProduto(id) {
    const conn = new XMLHttpRequest();
    conn.open(GET, BASE_URL_PRODUTOS+"produtos/"+id, false);
    conn.send();
    let resposta = conn.responseText;
    console.log(resposta);
    
    return JSON.parse(resposta);
}

function obterFabricante(id) {
    const conn = new XMLHttpRequest();
    conn.open(GET, BASE_URL_FILTROS+"fabricantes/"+id, false);
    conn.send();
    let resposta = conn.responseText
    console.log(resposta);
    
    return JSON.parse(resposta);
}

function obterCategoria(id) {
    const conn = new XMLHttpRequest();
    conn.open(GET, BASE_URL_FILTROS+"categorias/"+id, false);
    conn.send();
    let resposta = conn.responseText
    console.log(resposta);
    
    return JSON.parse(resposta);
}

function obterCliente(id) {
    const conn = new XMLHttpRequest();
    conn.open(GET, BASE_URL_CLIENTES+"clientes/"+id, false);
    conn.send();
    let resposta = conn.responseText
    console.log(resposta);
    
    return JSON.parse(resposta);
}

function obterHttpMethod(httpMethod) {
    if (httpMethod == 'GET') {
        return GET;
    } else if (httpMethod == 'POST') {
        return POST;
    } else if (httpMethod == 'PUT') {
        return PUT;
    } else if (httpMethod == 'DELETE') {
        return DELETE;
    } else {
        return '';
    }
}

function obterImagemPorProduto(produto) {
    const conn = new XMLHttpRequest();
    conn.open(GET, BASE_URL_PRODUTOS+"imagens/produto/"+produto, false);
    conn.send();
    let resposta = conn.responseText
    console.log(resposta);
    
    if (resposta != null && resposta != 'undefined' && resposta != ''
        && resposta.id != 'undefined' && resposta.id != '') {
        return JSON.parse(resposta);
    } else {
        return '';
    }
}

function prepararJsonFiltro() {
    let input_filtro_nome = document.getElementById('input-filtro-nome-produto'); 
    let input_filtro_peso_min = document.getElementById('input-filtro-peso-minimo');
    let input_filtro_peso_max = document.getElementById('input-filtro-peso-maximo');
    let input_filtro_preco_min = document.getElementById('input-filtro-preco-minimo'); 
    let input_filtro_preco_max = document.getElementById('input-filtro-preco-maximo');

    let filtro_nome = input_filtro_nome.value;
    let filtro_peso_min = input_filtro_peso_min.value;
    let filtro_peso_max = input_filtro_peso_max.value;
    let filtro_preco_min = input_filtro_preco_min.value;
    let filtro_preco_max = input_filtro_preco_max.value;

    let fabricantes = document.getElementsByName('fabricantes');
    console.log(fabricantes);
    let fabricantes_txt = '';
    for (let i = 0; i < fabricantes.length; i++) {
        if (fabricantes[i].checked) {
            fabricantes_txt += fabricantes[i].value + ',';
        }
    }
    fabricantes_txt = fabricantes_txt != '' ? fabricantes_txt.substring(0, fabricantes_txt.length-1) : '';
    
    let categorias = document.getElementsByName('categorias'); 
    let categorias_txt = '';
    for (let j = 0; j < categorias.length; j++) {
        if (categorias[j].checked) {
            categorias_txt += categorias[j].value + ',';
        }
    }
    categorias_txt = categorias_txt != '' ? categorias_txt.substring(0, categorias_txt.length-1) : '';
    
    let jsonTxt = '{"nome":"'+filtro_nome+'","fabricantes":['+fabricantes_txt+'],"categorias":['+categorias_txt+'],"precoMinimo":'+filtro_preco_min+',"precoMaximo":'+filtro_preco_max+',"pesoMinimo":'+filtro_peso_min+',"pesoMaximo":'+filtro_peso_max+'}';
    console.log(jsonTxt);
    let jsonObj = JSON.parse(jsonTxt);

    return JSON.stringify(jsonObj);
}

function filtrarProdutos() {
    const conn = new XMLHttpRequest();
    conn.open(POST, BASE_URL_PRODUTOS+"produtos/filtrar", false);
    conn.setRequestHeader('content-type','application/json');
    conn.send(prepararJsonFiltro());
    let resposta = conn.responseText
    console.log(resposta);
        
    return carregarProdutosFiltrados(JSON.parse(resposta)); 
}

function carregarValoresMinMax() {
    const conn = new XMLHttpRequest();
    conn.open(GET, BASE_URL_PRODUTOS+"produtos/valoresMinMax", false);
    conn.send();
    let resposta = conn.responseText
    console.log(resposta);
    
    return JSON.parse(resposta);
    
}

function prepararJsonLogin() {
    let input_login_email = document.getElementById('input_login_email');
    let input_login_password = document.getElementById('input_login_password');

    let email = input_login_email.value;
    let password = input_login_password.value;
    
    let jsonTxt = '{"email":"'+email+'","password":"'+password+'"}';
    console.log(jsonTxt);
    let jsonObj = JSON.parse(jsonTxt);

    return JSON.stringify(jsonObj);
}

function realizarLogin() {
    const conn = new XMLHttpRequest();
    conn.open(POST, BASE_URL_CLIENTES+"clientes/login", false);
    conn.setRequestHeader('content-type','application/json');
    conn.send(prepararJsonLogin());
    let resposta = conn.responseText
    console.log(resposta);

    let login = JSON.parse(resposta);
    console.log(window.location);

    if (login != null && login != 'undefined' && login.ok) {
        window.location.href = 'index.html?session='+login.session;
    } else {
        alert(login.mensagem);
    }
}

function realizarLogout(clienteId) {
    const conn = new XMLHttpRequest();
    conn.open(POST, BASE_URL_CLIENTES+"clientes/logout", false);
    conn.setRequestHeader('content-type','application/json');
    conn.send(JSON.stringify(JSON.parse('{"clienteId":"'+clienteId+'"}')));
    let resposta = conn.responseText
    console.log(resposta);

    let login = JSON.parse(resposta);
    console.log(window.location);

    if (login != null && login != 'undefined' && login.ok) {
        window.location.href = 'index.html';
    } else {
        alert(login.mensagem);
    }
}

function obterLogin(id) {
    const conn = new XMLHttpRequest();
    conn.open(GET, BASE_URL_CLIENTES+"clientes/login/"+id, false);
    conn.send();
    let resposta = conn.responseText
    console.log(resposta);

    return JSON.parse(resposta);
}

function checkSession(session) {
    const conn = new XMLHttpRequest();
    conn.open(POST, BASE_URL_CLIENTES+"clientes/login/checkSession", false);
    conn.setRequestHeader('content-type','application/json');
    conn.send(JSON.stringify(JSON.parse('{"session":"'+session+'"}')));

    let resposta = conn.responseText
    console.log(resposta);

    let login = JSON.parse(resposta);
    console.log(window.location);

    return JSON.parse(resposta);
}

function carregarEstados() {
    const conn = new XMLHttpRequest();
    conn.open(GET, BASE_URL_CLIENTES+"clientes/endereco/uf", false);
    conn.send();
    let resposta = conn.responseText
    console.log(resposta);
    
    return JSON.parse(resposta);
}

function carregarTiposLogradouro() {
    const conn = new XMLHttpRequest();
    conn.open(GET, BASE_URL_CLIENTES+"clientes/endereco/tiposLogradouro", false);
    conn.send();
    let resposta = conn.responseText
    console.log(resposta);
    
    return JSON.parse(resposta);
}

function carregarCidadesPorUF(idEstado) {
    const conn = new XMLHttpRequest();
    conn.open(GET, BASE_URL_CLIENTES+"clientes/endereco/cidades/"+idEstado, false);
    conn.send();
    let resposta = conn.responseText;
    console.log(resposta);
    
    return JSON.parse(resposta);
}

function prepararJsonClientes() {
    let id = '"idCliente":"'+document.getElementById('input_id_hidden').value+'"';
    let tipoCliente = '"tipoCliente":"'+document.getElementById('input_tipo_cliente').value+'"';
    let cnpj = '"cnpj":"'+document.getElementById('input_cnpj').value+'"';
    let cpf = '"cpf":"'+document.getElementById('input_cpf').value+'"';
    let ie = '"ie":"'+document.getElementById('input_ie').value+'"';
    let nome = '"nome":"'+document.getElementById('input_nome').value+'"';
    let nomeFantasia = '"nomeFantasia":"'+document.getElementById('input_nome_fantasia').value+'"';
    let razaoSocial = '"razaoSocial":"'+document.getElementById('input_razao_social').value+'"';
    let site = '"site":"'+document.getElementById('input_site').value+'"';

    let tipoLogradouro = '"tipoLogradouro":"'+document.getElementById('input_endereco_tipo_logradouro').value+'"';
    let logradouro = '"logradouro":"'+document.getElementById('input_endereco_logradouro').value+'"';
    let numero = '"numero":"'+document.getElementById('input_num').value+'"';
    let complemento = '"complemento":"'+document.getElementById('input_endereco_complemento').value+'"';
    let bairro = '"bairro":"'+document.getElementById('input_endereco_bairro').value+'"';
    let cep = '"cep":"'+document.getElementById('input_cep').value+'"';
    let uf = '"uf":"'+document.getElementById('input_endereco_uf').value+'"';
    let cidade = '"cidade":"'+document.getElementById('input_endereco_cidade').value+'"';

    let idTelefone1 = '"idTelefone1":"'+document.getElementById('input_hidden_contato_id1').value+'"';
    let tipoTelefone1 = '"tipoTelefone1":"'+document.getElementById('input_contato_tipo_telefone1').value+'"';
    let ddd1 = '"ddd1":"'+document.getElementById('input_contato_ddd1').value+'"';
    let telefone1 = '"telefone1":"'+document.getElementById('input_contato_tel1').value+'"';
    let isWhats1 = document.getElementById('input_contato_is_whats1').checked;
    let isWhatsapp1 = '"isWhatsapp1":"'+(isWhats1 ? 'true' : 'false')+'"';

    let idTelefone2 = '"idTelefone2":"'+document.getElementById('input_hidden_contato_id2').value+'"';
    let tipoTelefone2 = '"tipoTelefone2":"'+document.getElementById('input_contato_tipo_telefone2').value+'"';
    let ddd2 = '"ddd2":"'+document.getElementById('input_contato_ddd2').value+'"';
    let telefone2 = '"telefone2":"'+document.getElementById('input_contato_tel2').value+'"';
    let isWhats2 = document.getElementById('input_contato_is_whats2').checked;
    let isWhatsapp2 = '"isWhatsapp2":"'+(isWhats2 ? 'true' : 'false')+'"';

    let idTelefone3 = '"idTelefone3":"'+document.getElementById('input_hidden_contato_id3').value+'"';
    let tipoTelefone3 = '"tipoTelefone3":"'+document.getElementById('input_contato_tipo_telefone3').value+'"';
    let ddd3 = '"ddd3":"'+document.getElementById('input_contato_ddd3').value+'"';
    let telefone3 = '"telefone3":"'+document.getElementById('input_contato_tel3').value+'"';
    let isWhats3 = document.getElementById('input_contato_is_whats3').checked;
    let isWhatsapp3 = '"isWhatsapp3":"'+(isWhats3 ? 'true' : 'false')+'"';
    
    let email = '"email":"'+document.getElementById('input_contato_email').value+'"';
    let password = '"password":"'+document.getElementById('input_contato_password').value+'"';

    let jsonText = '{'
        + id+','+tipoCliente+','+cnpj+','+cpf+','+ie+','+nome+','+nomeFantasia+','+razaoSocial+','+site+','
        + cep+','+tipoLogradouro+','+logradouro+','+numero+','+complemento+','+bairro+','+cidade+','+uf+','
        + idTelefone1+','+tipoTelefone1+','+ddd1+','+telefone1+','+isWhatsapp1+','
        + idTelefone2+','+tipoTelefone2+','+ddd2+','+telefone2+','+isWhatsapp2+','
        + idTelefone3+','+tipoTelefone3+','+ddd3+','+telefone3+','+isWhatsapp3+','
        + email+','+password
        + '}';
    
    let jsonObj = JSON.parse(jsonText);

    return JSON.stringify(jsonObj);
}

function criarUsuario() {
    const conn = new XMLHttpRequest();
    conn.open(POST, BASE_URL_CLIENTES+"clientes", false);
    conn.setRequestHeader('content-type','application/json');
    conn.send(prepararJsonClientes());
    let resposta = conn.responseText
    console.log(resposta);
    
    let json = JSON.parse(resposta);

    if (json.ok != null && !json.ok) {
        alert('Erro ao cadastrar cliente:'+json.mensagem);
        return;
    } else {
        alert('Cadastro realizado com sucesso!');
        window.location.href = 'index.html';
    }
    
}

function alterarUsuario(id) {
    const conn = new XMLHttpRequest();
    conn.open(PUT, BASE_URL_CLIENTES+"clientes/"+id, false);
    conn.setRequestHeader('content-type','application/json');
    conn.send(prepararJsonClientes());
    let resposta = conn.responseText
    console.log(resposta);
    
    let json = JSON.parse(resposta);

    if (json.ok != null && !json.ok) {
        alert('Erro ao alterar cliente:'+json.mensagem);
        return;
    } else {
        alert('Alteração realizada com sucesso!');
        return location.reload();
    }
}

function prepararJsonTrocaSenha() {
    let input_troca_password_antigo = document.getElementById('input_troca_password_antigo');
    let input_troca_password_novo_1 = document.getElementById('input_troca_password_novo_1'); 
    let input_troca_password_novo_2 = document.getElementById('input_troca_password_novo_2');

    let passwordAntigo = input_troca_password_antigo.value;
    let passwordNovo1 = input_troca_password_novo_1.value;
    let passwordNovo2 = input_troca_password_novo_2.value;

    let json = '{'
        + '"passwordAntigo":"'+passwordAntigo+'"'+','
        + '"passwordNovo1":"'+passwordNovo1+'"'+','
        + '"passwordNovo2":"'+passwordNovo2+'"'
        + '}';

    let jsonObj = JSON.parse(json);

    return JSON.stringify(jsonObj);
}

function trocarSenha(id) {
    const conn = new XMLHttpRequest();
    conn.open(PUT, BASE_URL_CLIENTES+"clientes/login/trocarSenha/"+id, false);
    conn.setRequestHeader('content-type','application/json');
    conn.send(prepararJsonTrocaSenha());
    let resposta = conn.responseText
    console.log(resposta);
    
    let json = JSON.parse(resposta);

    if (json.ok != null && !json.ok) {
        alert('Erro ao trocar senha:'+json.mensagem);
        return;
    } else {
        alert('Alteração de senha realizada com sucesso!');
        return location.reload();
    }
}

function deletarUsuario(id) {
    if (!confirm('Tem certeza que deseja encerrar o cadastro! Esta operação irá apagar todos os seus dados pessoais.')) {
        return false;
    }
    const conn = new XMLHttpRequest();
    conn.open(DELETE, BASE_URL_CLIENTES+"clientes/"+id, false);
    conn.send();
    let resposta = conn.responseText
    console.log(resposta);
    
    let json = JSON.parse(resposta);

    if (json.ok != null && !json.ok) {
        alert('Erro ao encerrar cadastro:'+json.mensagem);
        return;
    } else {
        alert('Cadastro encerrado com com sucesso!');
        window.location.href = 'index.html';
    }
}

function listarCarrinho(idCliente) {
    const conn = new XMLHttpRequest();
    conn.open(GET, BASE_URL_COMPRAS+"carrinho/cliente/"+idCliente, false);
    conn.send();
    let resposta = conn.responseText;
    console.log(resposta);
    
    return JSON.parse(resposta);
}

function prepararJsonCarrinho() {
    let input_hidden_id = document.getElementById('input_hidden_id');
    let idProduto = input_hidden_id.value;

    let session = retornaParamUrl('session');
    if (session == null || session == '' || session == 'undefined') {
        alert('É necessário estar logado para realizar compras.');
        return;
    }
    let login = checkSession(session);
    if (login == null || login == '') {
        alert('É necessário estar logado para realizar compras.');
        return;
    }

    let idCLiente = login.cliente.id;
    let produto = obterProduto(idProduto);

    let jsonTxt = '{'
        + '"idProduto":'+idProduto+','
        + '"idCliente":'+idCLiente+','
        + '"quantidade":1,'
        + '"preco":'+produto.preco+''
        + '}';

    let jsonObj = JSON.parse(jsonTxt);

    return JSON.stringify(jsonObj);
}

function adicionarItemCarrinho() {
    const conn = new XMLHttpRequest();
    conn.open(POST, BASE_URL_COMPRAS+"carrinho", false);
    conn.setRequestHeader('content-type','application/json');
    conn.send(prepararJsonCarrinho());
    let resposta = conn.responseText
    console.log(resposta);
    
    let json = JSON.parse(resposta);

    if (json.ok != null && !json.ok) {
        alert('Erro ao incluir item no carrinho:'+json.mensagem);
        return;
    } else {
        alert('Produto adicionado ao carrinho!');
        window.location.reload();
    }
}

function prepararJsonCompra() {
    let input_hidden_id_array = document.getElementsByName('input_hidden_id');
    if (input_hidden_id_array.length > 0) {
        let jsonTxt = '{';
        let session = retornaParamUrl('session');
        let login = checkSession(session);
        let idCliente = login.cliente.id;
        jsonTxt += '"idCliente":'+idCliente+',';
        jsonTxt += '"carrinho":[';
        if (input_hidden_id_array.length > 1) {
            for (let i = 0; i < input_hidden_id_array.length; i++) {
                let id = input_hidden_id_array[i].id;
                let row = id.split('_')[1];
                let idCarrinho = input_hidden_id_array[i].value;
                let quantidade_produto = document.getElementById('quantidade_produto_'+row);
                let quantidade = quantidade_produto.innerText;
                jsonTxt += '{"id":"'+idCarrinho+'", "quantidade":'+quantidade+'}';
                if (i < input_hidden_id_array.length-1) {
                    jsonTxt += ',';
                }
            }
        } else {
            let idCarrinho = input_hidden_id_array.value;
            let quantidade_produto = document.getElementById('quantidade_produto_0');
            let quantidade = quantidade_produto.innerText;
            jsonTxt += '{"id":"'+idCarrinho+'","quantidade":'+quantidade+'}';
        }
        jsonTxt += ']}'
        console.log(jsonTxt);
        let jsonObj = JSON.parse(jsonTxt);

        return JSON.stringify(jsonObj);
    } else {
        alert('Sem itens no carrinho;');
        return;
    } 
    //carrinhoid_'+row 
    //'quantidade_produto_'+row
}

function retirarItemCarrinho(id) {
    const conn = new XMLHttpRequest();
    conn.open(DELETE, BASE_URL_COMPRAS+"carrinho/"+id, false);
    conn.send();
    let resposta = conn.responseText
    console.log(resposta);
    
    let json = JSON.parse(resposta);

    if (json.ok != null && !json.ok) {
        alert('Erro remover item do carrinho:'+json.mensagem);
        return;
    } else {
        window.location.reload();
    }
}

function finalizarCompra() {
    const conn = new XMLHttpRequest();
    conn.open(POST, BASE_URL_COMPRAS+"compras", false);
    conn.setRequestHeader('content-type','application/json');
    conn.send(prepararJsonCompra());
    let resposta = conn.responseText
    console.log(resposta);
    
    let json = JSON.parse(resposta);

    if (json.ok != null && !json.ok) {
        alert('Erro ao finalizar a compra:'+json.mensagem);
        return;
    } else {
        let session = retornaParamUrl('session');
        alert('Compra finalizada com sucesso!');
        window.location.href = 'finalizarCompra.html?session='+session;
    }
}

function carregarComprasCliente(idCliente) {
    const conn = new XMLHttpRequest();
    conn.open(GET, BASE_URL_COMPRAS+"compras/cliente/"+idCliente, false);
    conn.send();
    let resposta = conn.responseText
    console.log(resposta);
    
    let json = JSON.parse(resposta);

    return json;
}