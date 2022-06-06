var dadosGridModalBeneficiarios = [];
$(document).ready(function () {
    $('#formCadastro').submit(function (e) {
        e.preventDefault();
        var beneficiarios = retornarObjBeneficiarios();
        var model = {
            "NOME": $(this).find("#Nome").val(),
            "CEP": $(this).find("#CEP").val(),
            "Email": $(this).find("#Email").val(),
            "CPF": $(this).find("#CPF").val(),
            "Sobrenome": $(this).find("#Sobrenome").val(),
            "Nacionalidade": $(this).find("#Nacionalidade").val(),
            "Estado": $(this).find("#Estado").val(),
            "Cidade": $(this).find("#Cidade").val(),
            "Logradouro": $(this).find("#Logradouro").val(),
            "Telefone": $(this).find("#Telefone").val()
        }
        $.ajax({
            url: urlPost,
            method: "POST",
            data: { model: model, beneficiarios: beneficiarios },
            error:
                function (r) {
                    if (r.status == 400)
                        ModalDialog("Ocorreu um erro", r.responseJSON);
                    else if (r.status == 500)
                        ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
                },
            success:
                function (r) {
                    ModalDialog("Sucesso!", r)
                    $("#formCadastro")[0].reset();
                }
        });
    })

}).on('keyup', '#CPF', function () {
    mascaraCPF($(this));
}).on('click', '#IncluirBeneficiarioGrid', function () {
    var modalGrid = $(".modal-body");
    var CPF = $(modalGrid).find("#CPFBeneficiario");
    var Nome = $(modalGrid).find("#NomeBeneficiario");
    var dados = {
        id: 0, CPF: $(CPF).val(), Nome: $(Nome).val()
    };
    incluirDadosBeneficiario(dados);
    retornarObjBeneficiarios()
}).on('blur', '#CPF', function () {
    $('#erroCPF').remove();
    if ($.trim($('#CPF').val()) != "") {
        var validado = validarCPF($.trim($('#CPF').val()))
        if (!validado) {
            $('#CPF').after('<span id="erroCPF" style="color : red">CPF inválido</span>');
        }
    }
}).on('keyup', '#CEP', function () {
    mascaraCEP($(this))
}).on('blur', '#Email', function () {
    $('#erroEmail').remove();
    if ($.trim($('#Email').val()) != "") {
        var validado = validarEmail($.trim($('#Email').val()))
        if (!validado) {
            $('#Email').after('<span id="erroEmail" style="color : red">Email inválido</span>');
        }
    }
}).on('click', '#salvarCliente', function () {
    $('#formCadastro').submit();
})
    ;

function mascaraCPF(c, f) {
    setTimeout(function () {
        var valor = validarMascaraCPF($(c).val());
        if (valor != $(c).val()) {
            $(c).val(valor);
        }
    }, 1);
}

function validarMascaraCPF(valor) {
    var ret = valor.replace(/\D/g, "");
    if (ret.length > 8) {
        ret = ret.replace(/^(\d{3})(\d{3})(\d{3})/, "$1.$2.$3-");
    }
    else if (ret.length > 5) {
        ret = ret.replace(/^(\d{3})(\d{3})/, "$1.$2.");
    }
    else if (ret.length > 2) {
        ret = ret.replace(/^(\d{3})/, "$1.");
    }

    return ret;
}

function validarCPF(strCPF) {
    var Soma;
    var Resto;
    Soma = 0;
    if (strCPF == "000.000.000-00") return false;
    strCPF = strCPF.replace(/[^0-9]/g, '')

    for (i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10))) return false;

    Soma = 0;
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11))) {
        return false;
    }
    return true;
}

function mascaraCEP(c, f) {
    setTimeout(function () {
        var valor = validarCEP($(c).val());
        if (valor != $(c).val()) {
            $(c).val(valor);
        }
    }, 1);
}

function validarCEP(valor) {
    var ret = valor.replace(/\D/g, "");
    if (ret.length > 4) {
        ret = ret.replace(/^(\d{2})(\d{3})/, "$1$2-");
    }

    return ret;
}

function validarEmail(email) {
    var texto = /\S+@\S+\.\S+/;
    return texto.test(email);
}

function ModalDialog(titulo, texto) {
    var random = Math.random().toString().replace('.', '');
    var texto = '<div id="' + random + '" class="modal fade">                                                               ' +
        '        <div class="modal-dialog">                                                                                 ' +
        '            <div class="modal-content">                                                                            ' +
        '                <div class="modal-header">                                                                         ' +
        '                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>         ' +
        '                    <h4 class="modal-title">' + titulo + '</h4>                                                    ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-body">                                                                           ' +
        '                    <p>' + texto + '</p>                                                                           ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-footer">                                                                         ' +
        '                    <button type="button" id="fecharModal" class="btn btn-default" data-dismiss="modal">Fechar</button>             ' +
        '                                                                                                                   ' +
        '                </div>                                                                                             ' +
        '            </div><!-- /.modal-content -->                                                                         ' +
        '  </div><!-- /.modal-dialog -->                                                                                    ' +
        '</div> <!-- /.modal -->                                                                                        ';

    $('body').append(texto);
    $('#' + random).modal('show');
}

function incluirDadosBeneficiario(dados) {
    var dado = `<tr>
        <td class="CPFB">${dados.CPF}</td>
        <td class="NomeB">${dados.Nome}</td>
        <td class="Acao">
            <button type="button" data-id="${dados.Id}" style="padding: 6px 12px" class="btn btn-primary">Alterar</button>
            <button type="button" data-id="${dados.Id}" style="padding: 6px 12px" class="btn btn-primary">Excluir</button>
        </td>
    </tr>`;
    var modalGrid = $(".modal-body");
    var modalTable = $(modalGrid).find("table");
    var divGrid = $(modalTable).find("#DadosBeneficiarios");
    dadosGridModalBeneficiarios.push(dado);

    $(divGrid).append(dado);
}

function retornarDadosBeneficiarioInMemoria() {
    var modalGrid = $(".modal-body");
    var modalTable = $(modalGrid).find("table");
    var divGrid = $(modalTable).find("#DadosBeneficiarios");
    $(dadosGridModalBeneficiarios).each(function (i, e) {
        $(divGrid).append($(e));
    })
}

function beneficiario(idCliente) {
    $('#DadosBeneficiarios').empty();
    $('.modal.fade').each(function (i, e) {
        if ($(e).css('display', 'none')) {
            $(e).empty();
        }
    })
    $.ajax({
        url: urlBenfiPartial,
        type: 'GET',
        data: { idCliente: idCliente },
        success: function (result) {
            ModalDialog("Beneficiários", result);
            retornarDadosBeneficiarioInMemoria();
        }
    });

}
function retornarObjBeneficiarios() {
    var modalGrid = $(".modal-body");
    var modalTable = $(modalGrid).find("table");
    var divGrid = $(modalTable).find("#DadosBeneficiarios");
    var rows = $(divGrid).find('tr');
    var listaRow = [];
    $(rows).each(function (i, e) {
        var linha = {
        CPF: $(e).find('.CPFB').text(),
        Nome: $(e).find('.NomeB').text()
        };
        listaRow.push(linha);
    })
    return listaRow;
}