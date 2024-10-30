var urlPerfil = "http://localhost:8090/perfil";

$(document).ready(function() {
    pesquisarPerfis();
})

function pesquisarPerfis() {
    escreverLoadAction();
    $.get(urlPerfil, function (json, status) {
        $("#listaPerfis").html(escreverTabelaPerfil(json));
        removerLoadAction();
    })
}

function escreverTabelaPerfil(json) {
    var html = "";
    html += '<div class="row">';
    html += '<div class="col s6 l10"><label>Descrição</label></div>';
    html += '<div class="col s6 l1"><label>Editar</label></div>';
    html += '<div class="col s6 l1"><label>Excluir</label></div>';
    html += '</div>';
    for (var i = 0; i < json.length; i++) {
        html += '<div class="row">';
        html += '<div class="col s6 l10">' + json[i].descricao + '</div>';
        html += '<div class="col s6 l1">';
        html += '<i class="small material-icons blue-text text-darken-2';
        html += ' cursorPointer selectNone" ';
        html += ' onclick="editar(\'' + json[i].id + '\')">edit</i>';
        html += '</div>';
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
    $.get(urlPerfil + "/" + id, function (json, status) {
        preencherFormPerfil(json);
        removerLoadAction();
    })
}

function preencherFormPerfil(json) {
    $("#id").val(json.id);
    $("#descricao").val(json.descricao);
    $("#descricao").focus();
}

function excluir(id) {
    escreverLoadAction();
    $.ajax({
        type: "DELETE",
        url: urlPerfil + "/" + id,
        success: function() {
            exibirMensagem("Perfil " + id + " excluído.");
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
    var url = urlPerfil;
    if($("#id").val().length >3){
        tipo = "PUT";
        url = urlPerfil+"/"+$("#id").val();
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