
function carregarCategorias() {
    criarHtmlFiltros(listarCategorias(),'categorias');
    criarHtmlFiltros(listarFabricantes(),'fabricantes');
}

function criarHtmlFiltros(json, filtro) {
    var div = filtro == 'categorias' 
        ? document.getElementById("filtro-categorias")
        : document.getElementById("filtro-fabricantes");
    for (let i = 0; i < json.length; i++) {
        var input = document.createElement('input');
        input.type = "checkbox";
        input.value = json[i].id;
        input.name = filtro;
        var span = document.createElement("span");
        span.innerHTML = json[i].descricao;
        div.appendChild(input);
        div.appendChild(span);
        var br = document.createElement("br");
        div.appendChild(br);
    }
}

function carregarProdutos() {
    var divProdutos = document.getElementById("produtos");
    divProdutos.innerHTML = '';
    
    var jsonProdutos = listarProdutos();
    console.log(jsonProdutos);
    criarHtmlProdutos(jsonProdutos, divProdutos);
    
}

function carregarProdutosFiltrados(produtos) {
    var divProdutos = document.getElementById("produtos");
    divProdutos.innerHTML = '';
    console.log(produtos);
    if (produtos != null && produtos != 'undefined' && produtos.length > 0) {
        criarHtmlProdutos(produtos, divProdutos);
    }
}

function carregarValoresMinMaxHTML() {
    let json = carregarValoresMinMax();
    
    let input_peso_min = document.getElementById('input-filtro-peso-minimo');
    input_peso_min.min = json.minPeso;
    input_peso_min.max = json.maxPeso;
    input_peso_min.setAttribute('value', ""+json.minPeso+"");
    let input_peso_max = document.getElementById('input-filtro-peso-maximo');
    input_peso_max.min = json.minPeso;
    input_peso_max.max = json.maxPeso;
    input_peso_max.setAttribute('value', ""+json.maxPeso+"");
    let input_preco_min = document.getElementById('input-filtro-preco-minimo');
    input_preco_min.min = json.minPreco;
    input_preco_min.max = json.maxPreco;
    input_preco_min.setAttribute('value', ""+json.minPreco+"");
    let input_preco_max = document.getElementById('input-filtro-preco-maximo');
    input_preco_max.min = json.minPreco;
    input_preco_max.max = json.maxPreco;
    input_preco_max.setAttribute('value', ""+json.maxPreco+"");

    document.getElementById('span-filtro-peso-minimo1').innerHTML = json.minPeso;
    document.getElementById('span-filtro-peso-maximo1').innerHTML = json.maxPeso;
    document.getElementById('span-filtro-preco-minimo1').innerHTML = json.minPreco;
    document.getElementById('span-filtro-preco-maximo1').innerHTML = json.maxPreco;
    document.getElementById('span-filtro-peso-minimo2').innerHTML = json.minPeso;
    document.getElementById('span-filtro-peso-maximo2').innerHTML = json.maxPeso;
    document.getElementById('span-filtro-preco-minimo2').innerHTML = json.minPreco;
    document.getElementById('span-filtro-preco-maximo2').innerHTML = json.maxPreco;

    document.getElementById('value-peso-min').setAttribute('value', ""+json.minPeso+"");
    document.getElementById('value-peso-max').setAttribute('value', ""+json.maxPeso+"");
    document.getElementById('value-preco-min').setAttribute('value', ""+json.minPreco+"");
    document.getElementById('value-preco-max').setAttribute('value', ""+json.maxPreco+"");
    
}

function criarHtmlProdutos(json,divMaster) {
    var divRow = document.createElement('div');
    divRow.classList = "row";
    
    var countRow = 1;
    
    for (let i = 0; i < json.length; i++) {
        if (countRow > 3) {
            divMaster.appendChild(divRow);
            divRow = document.createElement('div');
            divRow.classList = "row";
            countRow = 1;
        }

        var divColInicial = document.createElement('div');
        var divColFinal = document.createElement('div');
        var divCol = document.createElement('div');
            
        divCol.classList = "col-md-4";
        divCol.style.textAlign = 'center';
        
        var id = json[i].id;
        var nome = json[i].nome;
        var preco = json[i].precoFmt;
        
        var div = document.createElement('div');
        div.style.border = 'solid 1px black';
        div.style.width = '100%';
        div.style.height = '350px';
        div.style.borderRadius = '5px';
        
        var divTitulo = document.createElement('div');
        divTitulo.style.width = '100%';
        divTitulo.style.height = '40px';
        var h5 = document.createElement('h5');
        h5.innerHTML = nome;
        divTitulo.appendChild(h5);
        div.appendChild(divTitulo);

        var img = document.createElement('img');
        var divImg = document.createElement('div');
        divImg.style.paddingTop = '10px';
        divImg.style.width = '90%';
        divImg.style.height = '65%';
        var imagem = obterImagemPorProduto(json[i].id);
        
        if (imagem != null && imagem != 'undefined'
            && imagem.id != null && imagem.id != 'undefined' && imagem.id > 0) {
                img.src = 'data:image/'+imagem.extensao+';base64,'+imagem.dadosBase64;
        } else {
            img.src = 'resources/images/imagem_nao_disponivel.jpeg';
        }
        
        img.classList = "img-fluid";
        img.style.height = 'inherit';
        img.style.width = 'inherit';

        divImg.appendChild(img);
        div.appendChild(divImg);

        var span = document.createElement('span');
        span.innerHTML = preco;
        
        
        var button = document.createElement('input');
        button.type = 'button';
        button.style.backgroundColor = 'rgb(51, 255, 0)';
        button.style.borderRadius = '5px';
        button.style.border = 'solid 1px black';
        button.style.width = '50%';
        button.value = 'Comprar';
        //button.formAction = 'produto.html';
        button.setAttribute('onclick', 'javascript:carregarProduto('+id+');');
        //addEventListener('click', carregarProduto(json[i]), true);
        
        var divFooter = document.createElement('div');
        divFooter.style.width = '100%';
        divFooter.style.height = '80px';
        var br = document.createElement("br");

        divFooter.appendChild(span);
        divFooter.appendChild(br);
        divFooter.appendChild(button);
        
        div.appendChild(divFooter);
        divCol.appendChild(div);
        divRow.appendChild(divCol);
       
        countRow++;
        
    }
    
    divMaster.appendChild(divRow);
    
}

function carregarProduto(id) {
    let session = retornaParamUrl('session');
    window.location.href = 'produto.html?id='+id+((session != '') ? '&session='+session : '');
    console.log(json);
}

function carregarDadosProduto(id) {
    var json = obterProduto(id);
    
    document.getElementById("input_hidden_id").value = json.id;

    var p_nome = document.getElementById("nome_produto");
    p_nome.innerHTML = json.nome;
    var img_produto = document.getElementById("img_produto");
    var imagem = obterImagemPorProduto(json.id);
    console.log(imagem);
    console.log(imagem.id);
    if (imagem != null && imagem != 'undefined'
        && imagem.id != null && imagem.id != 'undefined' && imagem.id > 0) {
            img_produto.src = 'data:image/'+imagem.extensao+';base64,'+imagem.dadosBase64;
    } else {
        img_produto.src = 'resources/images/imagem_nao_disponivel.jpeg';
    }
    var p_descricao = document.getElementById("descricao_produto");
    p_descricao.innerHTML = json.descricao;
    var p_fabricante = document.getElementById("fabricante_produto");
    var fabricante = obterFabricante(json.fabricante);
    p_fabricante.innerHTML = fabricante.descricao;
    var p_categorias = document.getElementById("categorias_produto");
    var categoriasArr = json.categorias;
    var categorias = listarCategorias();
    for (let i = 0; i < categoriasArr.length; i++) {
        for (let j = 0; j < categorias.length; j++) {
            if (categoriasArr[i] == categorias[j].id) {
                p_categorias.innerHTML += categorias[j].descricao + " ";
            }
        }
    }

    var p_peso = document.getElementById("peso_produto");
    p_peso.innerHTML = json.pesoFmt;
    var p_preco = document.getElementById("preco_produto");
    p_preco.innerHTML = json.precoFmt;
    //var button_produto = document.getElementById("button_produto");
    //button_produto.setAttribute("onclick","javascript:enviarParaCarrinho('"+json.id+"');");
}

function enviarParaCarrinho(id) {
    let session = retornaParamUrl('session');
    window.location.href = 'carrinho.html?id='+id+((session != '') ? '&session='+session : '');
}

function carregarCarrinho(id) {

    let session = retornaParamUrl('session');
    if (session == null || session == '' || session == 'undefined') {
        return;
    }
    let login = checkSession(session);
    if (login == null || login == '') {
        return;
    }

    let carrinho = listarCarrinho(login.cliente.id);
    let total = 0;
    var divCarrinho = document.getElementById('carrinho');
    divCarrinho.innerHTML = '';
    
    for (let i = 0; i < carrinho.length; i++) {
        let idProduto = carrinho[i].idProduto;
        let row = i+1;
        let quantidade = carrinho[i].quantidade;
        let idCarrinho = carrinho[i].id;

        var json = obterProduto(idProduto);
    
        var divProduto = document.createElement('div');
        var divColuna1 = document.createElement('div');
        var divColuna2 = document.createElement('div');
        var divColuna3 = document.createElement('div');
        var divColuna6 = document.createElement('div');
        var divColuna7 = document.createElement('div');
        var divColuna8 = document.createElement('div');
        var divColuna9 = document.createElement('div');
        var divColuna10 = document.createElement('div');
        var divColuna12 = document.createElement('div');

        var buttonMais = document.createElement('input');
        var buttonMenos = document.createElement('input');
        var buttonExcluir = document.createElement('input');

        let input_hidden_id = document.createElement('input');
        input_hidden_id.type = 'hidden';
        input_hidden_id.id = 'carrinhoid_'+row;
        input_hidden_id.name = 'input_hidden_id';
        input_hidden_id.value = carrinho[i].id;
        divProduto.appendChild(input_hidden_id);

        divProduto.classList = "row";
        divColuna1.classList = "col-md-1";
        divColuna2.classList = "col-md-1";
        divColuna3.classList = "col-md-5";
        //divColuna6.classList = "col-md-1";
        divColuna7.classList = "col-md-3";
        //divColuna8.classList = "col-md-1";
        //divColuna9.classList = "col-md-1";
        //divColuna10.classList = "col-md-1";
        divColuna12.classList = "col-md-2";

        divProduto.style.height = '80px';
        divProduto.style.fontSize = 'x-large';
        divProduto.style.textAlign = 'center';

        var span = document.createElement('span');
        span.innerHTML = ''+row+')';
        divColuna1.style.paddingTop = '20px';
        divColuna1.appendChild(span);

        var img = document.createElement('img');
        img.style.maxWidth = '75px';
        var imagem = obterImagemPorProduto(json.id);
        if (imagem != null && imagem != 'undefined'
            && imagem.id != null && imagem.id != 'undefined' && imagem.id > 0) {
                img.src = 'data:image/'+imagem.extensao+';base64,'+imagem.dadosBase64;
        } else {
            img.src = 'resources/images/imagem_nao_disponivel.jpeg';
        }
        
        divColuna2.appendChild(img);

        var span2 = document.createElement('span');
        divColuna3.style.alignSelf = 'center';
        divColuna3.align = 'center';
        span2.innerHTML = json.nome;
        divColuna3.appendChild(span2);

        let span_ws1 = document.createElement('span');
        span_ws1.innerText = " ";
        let span_ws2 = document.createElement('span');
        span_ws2.innerText = " ";
        let span_ws3 = document.createElement('span');
        span_ws3.innerText = " ";

        buttonMais.style.borderRadius = '5px';
        buttonMais.style.backgroundColor = 'rgb(51, 255, 0)';
        buttonMais.style.width = '40px';
        buttonMais.style.height = '40px';
        buttonMais.type = 'button';
        buttonMais.value = '+';
        buttonMais.setAttribute('onclick', 'javascript:aumentarQuantidade("'+row+'");');
        divColuna7.style.paddingTop = '20px';
        divColuna7.appendChild(buttonMais);
        divColuna7.appendChild(span_ws1);

        var span3 = document.createElement('span');
        span3.innerHTML = quantidade;
        span3.id = 'quantidade_produto_'+row;
        divColuna7.style.paddingTop = '20px';
        divColuna7.appendChild(span3);
        divColuna7.appendChild(span_ws2);

        buttonMenos.style.borderRadius = '5px';
        buttonMenos.style.backgroundColor = 'rgb(51, 255, 0)';
        buttonMenos.style.width = '40px';
        buttonMenos.style.height = '40px';
        buttonMenos.type = 'button';
        buttonMenos.value = '-';
        buttonMenos.setAttribute('onclick', 'javascript:diminuirQuantidade("'+row+'");');
        divColuna7.style.paddingTop = '20px';
        divColuna7.appendChild(buttonMenos);
        divColuna7.appendChild(span_ws3);

        buttonExcluir.style.borderRadius = '5px';
        buttonExcluir.style.backgroundColor = 'rgb(255, 0, 0)';
        buttonExcluir.style.width = '40px';
        buttonExcluir.style.height = '40px';
        buttonExcluir.type = 'button';
        buttonExcluir.value = 'X';
        buttonExcluir.setAttribute('onclick', 'javascript:retirarItemCarrinho("'+idCarrinho+'");');
        let icone_remover = document.createElement('img');
        icone_remover.src = 'resources/images/icon_excluir.jpeg';
        icone_remover.setAttribute('onclick', 'javascript:retirarItemCarrinho("'+idCarrinho+'");');
        icone_remover.style.height = '25px';
        let div_excluir = document.createElement('div');
        div_excluir.classList = "col-md-1";
        divColuna7.appendChild(buttonExcluir);
        
        var span4 = document.createElement('span');
        span4.innerHTML = 'R$'+json.preco.toLocaleString('br');
        total += (quantidade*json.preco);
        span4.id = 'preco_produto_'+row;
        divColuna12.style.paddingTop = '20px';
        divColuna12.appendChild(span4);

        divProduto.appendChild(divColuna1);
        divProduto.appendChild(divColuna2);
        divProduto.appendChild(divColuna3);
        //divProduto.appendChild(divColuna6);
        divProduto.appendChild(divColuna7);
        //divProduto.appendChild(divColuna8);
        //divProduto.appendChild(divColuna9);
        //divProduto.appendChild(div_excluir);
        //divProduto.appendChild(divColuna10);
        divProduto.appendChild(divColuna12);
        divCarrinho.appendChild(divProduto);    
    }
    
    var hr = document.createElement('hr');
    divCarrinho.appendChild(hr);
    
    var divTotal = document.createElement('div');
    var divColunaLabelTotal = document.createElement('div');
    var divColunaTotal = document.createElement('div');
    var divColunasVazias = document.createElement('div');

    divTotal.classList = "row";
    divColunaLabelTotal.classList = "col-md-2";
    divColunaTotal.classList = "col-md-2";
    divColunasVazias.classList = "col-md-8";

    divTotal.style.height = '80px';
    divTotal.style.fontSize = 'x-large';
    divTotal.style.textAlign = 'center';
    divColunaLabelTotal.style.paddingTop = '20px';
    divColunaTotal.style.paddingTop = '20px';

    var span5 = document.createElement('span');
    span5.innerHTML = 'TOTAL';
    divColunaLabelTotal.appendChild(span5);

    var span6 = document.createElement('span');
    span6.id = 'total_produto';
    span6.innerHTML = 'R$'+total.toLocaleString('br');
    divColunaTotal.appendChild(span6);

    divTotal.appendChild(divColunaLabelTotal);
    divTotal.appendChild(divColunasVazias);
    divTotal.appendChild(divColunaTotal);

    divCarrinho.appendChild(divTotal);

    var hr2 = document.createElement('hr');

    divCarrinho.appendChild(hr2);

    var divFinalizar = document.createElement('div');
    var divColFinalizar1 = document.createElement('div');
    var divColFinalizar2 = document.createElement('div');
    var divColFinalizar3 = document.createElement('div');
    divFinalizar.classList = "row";
    divColFinalizar1.classList = "col-md-4";
    divColFinalizar2.classList = "col-md-4";
    divColFinalizar3.classList = "col-md-4";
    divFinalizar.style.height = '80px';
    
    var buttonFinalizar = document.createElement('input');
    buttonFinalizar.style.borderRadius = '5px';
    buttonFinalizar.style.backgroundColor = 'rgb(51, 255, 0)';
    buttonFinalizar.style.width = '100%';
    buttonFinalizar.style.height = '40px';
    buttonFinalizar.type = 'button';
    buttonFinalizar.value = 'FINALIZAR COMPRA';
    buttonFinalizar.setAttribute('onclick', 'javascript:finalizarCompra();');
    
    divColFinalizar2.appendChild(buttonFinalizar);
    divFinalizar.appendChild(divColFinalizar1);
    divFinalizar.appendChild(divColFinalizar2);
    divFinalizar.appendChild(divColFinalizar3);
    divCarrinho.appendChild(divFinalizar);
}

function aumentarQuantidade(row) {
    var quantidade_produto = document.getElementById('quantidade_produto_'+row);
    var quantidade = quantidade_produto.innerText;
    var preco_produto = document.getElementById('preco_produto_'+row);
    var preco = preco_produto.innerText;
    var preco = Number.parseFloat(preco.replace('R$','').replace('.','').replace(',','.'));
    var total_produto = document.getElementById('total_produto');
    var total = Number.parseFloat(total_produto.innerText.replace('R$','').replace('.','').replace(',','.'));
    var novaQuantidade = Number.parseInt(quantidade)+1;
    var novoTotal = total+preco;
    quantidade_produto.innerHTML = novaQuantidade;
    total_produto.innerHTML = 'R$'+novoTotal.toLocaleString('br');
}

function diminuirQuantidade(row) {
    var quantidade_produto = document.getElementById('quantidade_produto_'+row);
    var quantidade = quantidade_produto.innerText;
    var preco_produto = document.getElementById('preco_produto_'+row);
    var preco = preco_produto.innerText;
    var preco = Number.parseFloat(preco.replace('R$','').replace('.','').replace(',','.'));
    var total_produto = document.getElementById('total_produto');
    var total = Number.parseFloat(total_produto.innerText.replace('R$','').replace('.','').replace(',','.'));
    var novaQuantidade = Number.parseInt(quantidade)-1;
    if (novaQuantidade <= 0) {
        novaQuantidade = 0;
    }
    var novoTotal = total-preco;
    if (novoTotal <= 0) {
        novoTotal = 0;
    }
    quantidade_produto.innerHTML = novaQuantidade;
    total_produto.innerHTML = 'R$'+novoTotal.toLocaleString('br');
}

function carregarCompras() {
    let session = retornaParamUrl('session');
    let idCliente = retornaParamUrl('id');

    let compras = carregarComprasCliente(idCliente);
    let compras_realizadas = document.getElementById('compras_realizadas');
    compras_realizadas.innerHTML = '';
    let h2 = document.createElement('h2');
    h2.innerText = 'Compras do Usuário';
    compras_realizadas.appendChild(h2);

    if (compras.length > 0) {
        for (let i=0; i < compras.length; i++) {
            let divRowExterna = document.createElement('div');
            let divColExterna = document.createElement('div');
            divColExterna.classList = 'col-md-12';
            divRowExterna.classList = 'row';
            //divColExterna.style.backgroundColor = (compras[i].entregue ? '#3366ff' : '#ff3333');
            divColExterna.style.borderRadius = '10px';
            divColExterna.style.border = '0.5px solid black';

            let divRowDataHoras = document.createElement('div');
            let divColData = document.createElement('div');
            let divColHora = document.createElement('div');
            let divColStatus = document.createElement('div');
            divRowDataHoras.classList = 'row';
            divColData.classList = 'col-md-4';
            divColHora.classList = 'col-md-4';
            divColStatus.classList = 'col-md-4';
            divRowDataHoras.style.backgroundColor = (compras[i].entregue ? '#3366ff' : '#ff3333');
            divRowDataHoras.style.borderTopLeftRadius = '10px';
            divRowDataHoras.style.borderTopRightRadius = '10px';
            divColData.innerHTML = "Data: <strong>"+compras[i].dataFmt+"</strong>";
            divColHora.innerHTML = "Hora: <strong>"+compras[i].horaFmt+"</strong>";
            divColStatus.innerHTML = "Status: <strong>"+(compras[i].entregue ? 'Entregue' : 'Não Entregue')+"</strong>";
            divRowDataHoras.appendChild(divColData);
            divRowDataHoras.appendChild(divColHora);
            divRowDataHoras.appendChild(divColStatus);
            divColExterna.appendChild(divRowDataHoras);

            let itens = compras[i].itensCompra;
            let total = 0;
            for (let j=0; j < itens.length; j++) {
                let produto = obterProduto(itens[j].idProduto);
                let imagem = obterImagemPorProduto(produto.id);
                let quantidade = itens[j].quantidade;

                let divRowItem = document.createElement('div');
                let divColIndex = document.createElement('div');
                let divColImagemProduto = document.createElement('div');
                let divColNomeProduto = document.createElement('div');
                let divColQtdProduto = document.createElement('div');
                let divColPrecoProduto = document.createElement('div');
                
                divRowItem.classList = 'row';
                divColIndex.classList = 'col-md-1';
                divColImagemProduto.classList = 'col-md-3';
                divColNomeProduto.classList = 'col-md-4';
                divColQtdProduto.classList = 'col-md-2';
                divColPrecoProduto.classList = 'col-md-2';
                divColIndex.style.display = 'flex';
                divColQtdProduto.style.display = 'flex';
                divColNomeProduto.style.display = 'flex';
                divColPrecoProduto.style.display = 'flex';
                divColIndex.style.justifyContent = 'left';
                divColNomeProduto.style.justifyContent = 'left';
                divColPrecoProduto.style.justifyContent = 'left';
                divColQtdProduto.style.justifyContent = 'left';
                divColNomeProduto.style.backgroundColor = (compras[i].entregue ? '#3366ff' : '#ff3333');
                divColQtdProduto.style.backgroundColor = (compras[i].entregue ? '#3366ff' : '#ff3333');
                divColPrecoProduto.style.backgroundColor = (compras[i].entregue ? '#3366ff' : '#ff3333');
                divColIndex.style.fontWeight = 'bold';
                divColNomeProduto.style.fontWeight = 'bold';
                divColPrecoProduto.style.fontWeight = 'bold';
                divColQtdProduto.style.fontWeight = 'bold';
                divColIndex.innerHTML = "<span style='align-self:center;'>"+(j+1)+') </span>';

                var img = document.createElement('img');
                img.style.maxWidth = '75px';
                if (imagem != null && imagem != 'undefined'
                    && imagem.id != null && imagem.id != 'undefined' && imagem.id > 0) {
                        img.src = 'data:image/'+imagem.extensao+';base64,'+imagem.dadosBase64;
                } else {
                    img.src = 'resources/images/imagem_nao_disponivel.jpeg';
                }
                divColImagemProduto.appendChild(img);
                divColNomeProduto.innerHTML = "<span style='align-self:center;'>"+produto.nome+"</span>";
                divColNomeProduto.title = produto.descricao;
                divColQtdProduto.innerHTML = "<span style='align-self:center;'>"+quantidade+"</span>";
                divColPrecoProduto.innerHTML = "<span style='align-self:center;'>"+'R$'+produto.preco.toLocaleString('br')+"</span>";
                divRowItem.appendChild(divColIndex);
                divRowItem.appendChild(divColImagemProduto);
                divRowItem.appendChild(divColNomeProduto);
                divRowItem.appendChild(divColQtdProduto);
                divRowItem.appendChild(divColPrecoProduto);

                divColExterna.appendChild(divRowItem);

                total += (quantidade*produto.preco);
            }
            
            let divRowTotal = document.createElement('div');
            let divColTotalVazio = document.createElement('div');
            let divColTotalPreenchido = document.createElement('div');
            divRowTotal.style.backgroundColor = '#669999';
            divRowTotal.classList = 'row';
            divColTotalVazio.classList = 'col-md-10';
            divColTotalPreenchido.classList = 'col-md-2';
            divRowTotal.style.borderBottomLeftRadius = '10px';
            divRowTotal.style.borderBottomRightRadius = '10px';
            divColTotalVazio.innerHTML = "<strong>TOTAL</strong>"
            divColTotalPreenchido.innerHTML = '<strong>R$'+total.toLocaleString('br')+"</strong>";
            divRowTotal.appendChild(divColTotalVazio);
            divRowTotal.appendChild(divColTotalPreenchido);

            divColExterna.appendChild(divRowTotal);
            divRowExterna.appendChild(divColExterna);
            compras_realizadas.appendChild(divRowExterna);
        }
    } else {
        let span = document.createElement('span');
        span.innerText = 'Usuário não possui compras para exibir.'
        compras_realizadas.appendChild(span);
    }
}










var dados = JSON.parse('{"produtos":['
        + '{"id":"1","nome":"Doce de Leite","descricao":"Doce de Leite para dietas de ingestão controlada de açúcares","categorias":["1","2"],"fabricante":"Haribol","peso":"600g","preco":"R$28,99"},'
        + '{"id":"2","nome":"Doce de Leite com Coco","descricao":"Doce de Leite para dietas de ingestão controlada de açúcares","categorias":["1","2"],"fabricante":"Haribol","peso":"600g","preco":"R$28,99"},'
        + '{"id":"3","nome":"Doce de Leite com Ameixa","descricao":"Doce de Leite para dietas de ingestão controlada de açúcares","categorias":["1","2"],"fabricante":"Haribol","peso":"600g","preco":"R$28,99"},'
        + '{"id":"4","nome":"Cocada Cremosa","descricao":"Cocada Cremosa para dietas de ingestão controlada de açúcares","categorias":["1","2"],"fabricante":"Haribol","peso":"600g","preco":"R$28,99"},'
        + '{"id":"5","nome":"Doce de Leite com Nozes","descricao":"Doce de Leite para dietas de ingestão controlada de açúcares","categorias":["1","2"],"fabricante":"Haribol","peso":"600g","preco":"R$28,99"},'
        + '{"id":"6","nome":"Doce de Abóbora com Coco","descricao":"Doce de Abóbora com Coco para dietas de ingestão controlada de açúcares","categorias":["1","2"],"fabricante":"Haribol","peso":"600g","preco":"R$28,99"},'
        + '{"id":"7","nome":"Pé de Moça de Colher","descricao":"Doce de Amendoin tipo pé de moça para dietas de ingestão controlada de açúcares - SEM ADIÇÃO DE AÇÚCARES","categorias":["1","2","3"],"fabricante":"Haribol","peso":"600g","preco":"R$35,99"},'
        + '{"id":"8","nome":"Leite Condensado","descricao":"Sobremesa Láctea sabor Leite Condensado para Dietas de ingestão controlada de açúcares","categorias":["1","2"],"fabricante":"Haribol","peso":"600g","preco":"R$35,99"},'
        + '{"id":"9","nome":"Beijinho","descricao":"Foundant de Leite com Coco para dietas de ingestão controlada de açúcares","categorias":["1","2"],"fabricante":"Haribol","peso":"600g","preco":"R$28,99"},'
        + '{"id":"10","nome":"Goibada Cascão Diet","descricao":"Goibada Cascão Diet - Linha Premium","categorias":["1"],"fabricante":"Famoso","peso":"600g","preco":"R$44,99"},'
        + '{"id":"11","nome":"Bananinha","descricao":"Bananinha - Sem adição de açúcar","categorias":["1"],"fabricante":"Famoso","peso":"600g","preco":"R$44,99"},'
        + '{"id":"12","nome":"Abacaxi com Coco","descricao":"Barrinha de Fruta de Abacaxi com Coco - Sem adição de açúcar","categorias":["1"],"fabricante":"Famoso","peso":"600g","preco":"R$44,99"},'
        + '{"id":"13","nome":"Banana com cobertura de chocolate","descricao":"Barrinha de Fruta de Banana com cobertura de chocolate","categorias":["1"],"fabricante":"Famoso","peso":"600g","preco":"R$44,99"},'
        + '{"id":"14","nome":"Coco com cobertura de chocolate","descricao":"Barrinha de Fruta de Coco com cobertura de chocolate","categorias":["1"],"fabricante":"Famoso","peso":"600g","preco":"R$44,99"},'
        + '{"id":"15","nome":"Paçoca","descricao":"Paçoca Moreninha do Rio","categorias":["1","2"],"fabricante":"Rio","peso":"800g","preco":"R$ 19,99"},'
        + '{"id":"16","nome":"Palha Italiana","descricao":"Palha Italiana Sabor Chocolate Enriquecida com Whey Protein","categorias":["1","3"],"fabricante":"Germanos","peso":"30g","preco":"R$ 14,99"},'
        + '{"id":"17","nome":"Palha Italiana","descricao":"Palha Italiana Sabor Cookies & Cream Enriquecida com Whey Protein","categorias":["1","3"],"fabricante":"Germanos","peso":"30g","preco":"R$ 14,99"},'
        + '{"id":"18","nome":"Caramelos de Leite","descricao":"Caramelos de Leite - Sem adição de açúcares - Contém açúcares próprios dos ingredientes","categorias":["1","3"],"fabricante":"Avaré","peso":"200g","preco":"R$ 14,99"},'
        + '{"id":"19","nome":"Gotas de Leite","descricao":"Produzido em Avaré: Doce de Leite Pingo para dietas com insgestão controlada de açúcares","categorias":["1"],"fabricante":"Avaré","peso":"100g","preco":"R$ 21,99"},'
        + '{"id":"20","nome":"Pirulito","descricao":"Pirulito Sabor Morango Zero Açúcar","categorias":["3"],"fabricante":"Doce Amor","peso":"35g","preco":"R$ 13,99"},'
        + '{"id":"21","nome":"Merenguinho", "descricao":"Merenguinho - Sabor Original","categorias":["3"],"fabricante":"Doce Amor","peso":"35g","preco":"R$ 15,99"},'
        + '{"id":"22","nome":"Pingo de Leite","descricao":"Foundant de Leite","categorias":["1"],"fabricante":"Yoot","peso":"500g","preco":"R$ 33,99"},'
        + '{"id":"23","nome":"Cidra","descricao":"Cidra Ralada para dietas com insgestão controlada de açúcares","categorias":["1"],"fabricante":"Doces Fazenda de Minas","peso":"400g","preco":"R$ 28,99"},'
        + '{"id":"24","nome":"Goiabada Cascão","descricao":"Goiabada Cascão (Jam Cascão) para dietas com insgestão controlada de açúcares","categorias":["1"],"fabricante":"Doces Fazenda de Minas","peso":"400g","preco":"R$ 28,99"},'
        + '{"id":"25","nome":"Bananinha Cremosa","descricao":"Bananinha Cremosa Sem Adição de Açúcares","categorias":["1"],"fabricante":"famoso","peso":"100g","preco":"R$ 21,99"},'
        + '{"id":"26","nome":"Goiabada Cascão","descricao":"Goiabada Cascão em barra para dietas com insgestão controlada de açúcares","categorias":["1"],"fabricante":"Doces Fazenda de Minas","peso":"500g","preco":"R$ 25,99"},'
        + '{"id":"27","nome":"Goiabada Cascão Zero Açúcar","descricao":"Goiabada Cascão em barra sem adição de açúcares","categorias":["1"],"fabricante":"Haribol","peso":"150g","preco":"R$ 21,99"},'
        + '{"id":"28","nome":"Pé de Moça Zero Açúcar","descricao":"Pé de Moça em barra sem adição de açúcares","categorias":["1"],"fabricante":"Haribol","peso":"150g","preco":"R$ 21,99"},'
        + '{"id":"29","nome":"Cocada ao Leite","descricao":"Cocada ao Leite em tablete sem adição de açúcares para dietas de ingestão controlada de açúcares","categorias":["1"],"fabricante":"Haribol","peso":"150g","preco":"R$ 21,99"},'
        + '{"id":"30","nome":"Doce de Leite","descricao":"Doce de Leite em tablete sem adição de açúcares para dietas de ingestão controlada de açúcares","categorias":["1"],"fabricante":"Haribol","peso":"150g","preco":"R$ 21,99"},'
        + '{"id":"31","nome":"YES! Milk Shake Instantâneo","descricao":"YES! Milk Shake Instantâneo - Sabor Mo","categorias":["1"],"fabricante":"Yes","peso":"80g","preco":"R$ 38,99"}'
        + ']}');
    var filtroCat = JSON.parse('{"categorias":['
        + '{"id":"1","descricao":"Doces"},'
        + '{"id":"2","descricao":"Diet"},'
        + '{"id":"3","descricao":"Zero Açucar"},'
        + '{"id":"4","descricao":"Sem adição de açúcar"},'
        + '{"id":"5","descricao":"Enriquecido com proteínas"}'
        + ']}');
    var filtroFab = JSON.parse('{"fabricante":['
        + '{"id":"1","descricao":"Haribol"},'
        + '{"id":"2","descricao":"Famoso"},'
        + '{"id":"3","descricao":"Doce Amor"},'
        + '{"id":"4","descricao":"Doces Fazenda de Minas"},'
        + '{"id":"5","descricao":"Germanos"},'
        + '{"id":"6","descricao":"Yes"}'
        + ']}');
