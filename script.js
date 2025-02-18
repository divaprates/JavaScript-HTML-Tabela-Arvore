function criarLinhaTabela(data, nome, nivel) {
    var ul = document.createDocumentFragment();
    // linhaT.innerHTML = '<th class="col">Dado</th> <th class="col">Nome</th>';

    // Itera sobre os dados para criar as colunas
    data.forEach(function(item) {
        var linha = document.createElement('tr');
        linha.classList.add('row');

        if (nome) {
            nome.forEach(n => {
                linha.classList.add(n);
            })
        }

        linha.setAttribute('id', item.nome);

        var coluna0 = document.createElement('td');
        coluna0.classList.add('col-'+(nivel+1), 'text-right', 'coluna-0');

        linha.appendChild(coluna0);

        // Cria uma div para representar a coluna 1
        var coluna1 = document.createElement('td');
        coluna1.classList.add('col', 'pr-'+nivel);
        // coluna1.style.paddingLeft = nivel+'px';

        coluna1.textContent = item.dado; // Define o texto da coluna 1

        // Adiciona a coluna 1 à linha
        linha.appendChild(coluna1);

        // Cria uma div para representar a coluna 2
        var coluna2 = document.createElement('td');
        coluna2.classList.add('col-6');
        coluna2.textContent = item.nome; // Define o texto da coluna 2

        // Adiciona a coluna 2 à linha
        linha.appendChild(coluna2);
        ul.appendChild(linha);

        if (item.filho != undefined && item.filho != null) {
            coluna0.textContent = '-';
            linha.classList.add('marca');

            linha.addEventListener( 'click', function() {
                l = linha.getAttribute('id');
                
                var h = !document.querySelector('.'+l).hidden;

                var list = document.querySelectorAll('#'+l+' .coluna-0');
                list.forEach(d => {
                    d.textContent = h ? '+' : '-';
                });

                var list = document.querySelectorAll('.'+l+'.marca .coluna-0');
                list.forEach(d => {
                    d.textContent = h ? '+' : '-';
                });

                var list = document.querySelectorAll('.'+l)
                list.forEach(d => {
                    d.hidden = h;
                });
            });

            ul.appendChild(criarLinhaTabela(item.filho, nome == null ? Array(item.nome) : Array(...nome, item.nome), nivel+1));
        }
    });

    return ul;
}

// Exemplo de uso
var dados = [
    { dado: '1', nome: 'banana', filho: [
        { dado: '4', nome: 'uva' },
        { dado: '5', nome: 'maracujá', filho: [
            { dado: '7', nome: 'melancia' },
        ]}
    ] },
    { dado: '2', nome: 'morango' },
    { dado: '3', nome: 'jabuticaba', filho: [
        { dado: '6', nome: 'maça' },
        { dado: '7', nome: 'caju'}
    ] },
    { dado: '8', nome: 'mamão' },
    { dado: '9', nome: 'goiba', filho: [
        { dado: '10', nome: 'amora' },
        { dado: '11', nome: 'maça', filho: [
            { dado: '13', nome: 'pera' },
        ]},
        { dado: '12', nome: 'abacate'}
    ] }
];
var linhaTabela = criarLinhaTabela(dados, null, 0);

// Adiciona a linha à tabela (supondo que você tenha uma div com a classe "tabela" onde deseja adicionar a linha)
document.querySelector('.tabela').appendChild(linhaTabela);
