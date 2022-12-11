var produtosEmDestaque = ["1","2","3"];

function pegarIndexBase(produto) {
    var i = 0;
    var indexBase = 0;
    for (; i < produtosEmDestaque.length; i++) {
        if (produtosEmDestaque[i] == produto) {
            indexBase = i;
            break;
        }
    }
    return indexBase;
}

function next() {
    let img = document.getElementById('produto_destaque');
    let produto = img.classList;
    let indexBase = pegarIndexBase(produto);
    let novoIndex = (indexBase < (produtosEmDestaque.length-1)) ? indexBase+1 : 0;
    let produtoObj = obterProduto(produtosEmDestaque[novoIndex]);
    let imagem = obterImagemPorProduto(produtoObj.id);
    if (imagem != null && imagem != 'undefined'
        && imagem.id != null && imagem.id != 'undefined' && imagem.id > 0) {
            img.src = 'data:image/'+imagem.extensao+';base64,'+imagem.dadosBase64;
    } else {
        img.src = 'resources/images/imagem_nao_disponivel.jpeg';
    }
    img.setAttribute("onclick", "javascript:carregarProduto('"+produtosEmDestaque[novoIndex]+"');");
    img.classList = produtosEmDestaque[novoIndex];
}
function previous() {
    var img = document.getElementById('produto_destaque');
    var produto = img.classList;
    var indexBase = pegarIndexBase(produto);
    var novoIndex = (indexBase > 0) ? indexBase-1 : produtosEmDestaque.length-1;
    let produtoObj = obterProduto(produtosEmDestaque[novoIndex]);
    let imagem = obterImagemPorProduto(produtoObj.id);
    if (imagem != null && imagem != 'undefined'
        && imagem.id != null && imagem.id != 'undefined' && imagem.id > 0) {
            img.src = 'data:image/'+imagem.extensao+';base64,'+imagem.dadosBase64;
    } else {
        img.src = 'resources/images/imagem_nao_disponivel.jpeg';
    }
    img.setAttribute("onclick", "javascript:carregarProduto('"+produtosEmDestaque[novoIndex]+"');");
    img.classList = produtosEmDestaque[novoIndex];
}
function carregarProdutoDestaque() {
    let img = document.getElementById('produto_destaque');
    console.log(img);
    let produtoObj = obterProduto(produtosEmDestaque[0]);
    let imagem = obterImagemPorProduto(produtoObj.id);
    img.removeAttribute("src");
    if (imagem != null && imagem != 'undefined'
        && imagem.id != null && imagem.id != 'undefined' && imagem.id > 0) {
            img.setAttribute('src', 'data:image/'+imagem.extensao+';base64,'+imagem.dadosBase64);
    } else {
        img.setAttribute('src', 'resources/images/imagem_nao_disponivel.jpeg');
    }
    img.setAttribute('onclick','javascript:carregarProduto('+produtosEmDestaque[0]+');');
    img.classList = produtosEmDestaque[0];
}