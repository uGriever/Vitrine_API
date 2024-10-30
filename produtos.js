var urlProdutos = "http://localhost:8090/produtos";

$(document).ready(function () {
    pesquisarProdutos();
});

function pesquisarProdutos() {
    escreverLoadAction();
    $.get(urlProdutos, function (json, status) {
        $("#listaProdutos").html(escreverTabelaProdutos(json));
        removerLoadAction();
    })
}

function escreverTabelaProdutos(json) {
    var html = "";
    html += '<div class="row">';
    html += '<div class="col s6 l3"><label>Nome</label></div>';
    html += '<div class="col s6 l3"><label>Descrição</label></div>';
    html += '<div class="col s6 l2"><label>Valor</label></div>';
    html += '<div class="col s6 l2"><label>Estoque</label></div>';
    html += '<div class="col s6 l1"><label>Editar</label></div>';
    html += '<div class="col s6 l1"><label>Excluir</label></div>';
    html += '</div>';
    for (var i = 0; i < json.length; i++) {
        html += '<div class="row">';
        html += '<div class="col s6 l3">' + json[i].nome + '</div>';
        html += '<div class="col s6 l3">' + json[i].descricao + '</div>';
        html += '<div class="col s6 l2">' + json[i].valor + '</div>';
        html += '<div class="col s6 l2">' + json[i].qtdeEstoque + '</div>';
        html += '<div class="col s6 l1">';
        html += '<i class="small material-icons blue-text text-darken-2';
        html += ' cursorPointer selectNone" ';
        html += ' onclick="editar(\'' + json[i].id + '\')">edit</i>';
        html += '</div>';
        html += '<div class="col s6 l1">';
        html += '<div class="col s6 l1">';
        html += '<i class="small material-icons red-text text-darken-2';
        html += ' cursorPointer selectNone" ';
        html += ' onclick="excluir(\'' + json[i].id + '\')">delete_forever</i>';
        html += '</div>';
        html += '</div>';
    }
    return html;
}

function editar(id) {
    escreverLoadAction();
    $.get(urlProdutos + "/" + id, function (json, status) {
        preencherFormProduto(json);
        removerLoadAction();
    })
}

function preencherFormProduto(json) {
    $("#id").val(json.id);
    $("#nome").val(json.nome);
    $("#nome").focus();
    $("#descricao").val(json.descricao);
    $("#descricao").focus();
    $("#valor").val(json.valor);
    $("#valor").focus();
    $("#qtdeEstoque").val(json.qtdeEstoque);
    $("#qtdeEstoque").focus();
    $("#estoqueMinimo").val(json.estoqueMinimo);
    $("#estoqueMinimo").focus();
    $("#imagem").val(json.imagem);
    $("#imagem").focus();
}

function excluir(id) {
    escreverLoadAction();
    $.ajax({
        type: "DELETE",
        url: urlProdutos + "/" + id,
        success: function() {
            exibirMensagem("Item " + id + " excluído.");
        },
        complete: function() {
            removerLoadAction();
        }
    })

    location.reload();
}

function salvar() {
    escreverLoadAction();
    var tipo ="POST";
    var url = urlProdutos;
    if($("#id").val().length >3){
        tipo = "PUT";
        url = urlProdutos+"/"+$("#id").val();
    }
   
    var dados = JSON.stringify({
        "nome":$("#nome").val(),
        "descricao":$("#descricao").val(),
        "valor":$("#valor").val(),
        "qtdeEstoque":$("#qtdeEstoque").val(),
        "estoqueMinimo":$("#estoqueMinimo").val(),
        "imagem":$("#imagem").val()
    });

    $.ajax({
        type: tipo,
        url: url,
        data: dados,
        contentType: 'application/json',
        success: function (dados) {
            location.reload();
            pesquisarProdutos();
        },
        complete: function () {
            removerLoadAction();
        }
    });
}