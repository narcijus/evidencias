const novo = document.getElementById("novo");
const formulario = document.getElementById("formulario");
const salvar = document.getElementById("salvar");
const lista = document.getElementById("lista");

novo.addEventListener("click", () => {

    formulario.hidden = false;

    const agora = new Date();

    agora.setMinutes(
        agora.getMinutes() - agora.getTimezoneOffset()
    );

    document.getElementById("data").value =
        agora.toISOString().slice(0, 16);
});


salvar.addEventListener("click", () => {

    const id = crypto.randomUUID();

    const ocorrencia = {

        id: id,

        data:
            document.getElementById("data").value,

        plataforma:
            document.getElementById("plataforma").value,

        usuario:
            document.getElementById("usuario").value,

        url:
            document.getElementById("url").value,

        descricao:
            document.getElementById("descricao").value,

        arquivo:
            document.getElementById("arquivo").value
    };


    const registros =
        JSON.parse(
            localStorage.getItem("evidencias") || "[]"
        );


    registros.push(ocorrencia);


    localStorage.setItem(
        "evidencias",
        JSON.stringify(registros)
    );


    mostrarRegistros();


    formulario.hidden = true;

    formulario.reset();

    alert(
        "Ocorrência registrada!\n\nID:\n" + id
    );
});


function mostrarRegistros() {

    const registros =
        JSON.parse(
            localStorage.getItem("evidencias") || "[]"
        );


    lista.innerHTML = "";


    registros.forEach((item) => {

        const div =
            document.createElement("article");


        div.innerHTML = `

            <h3>Ocorrência</h3>

            <p>
                <strong>ID:</strong><br>
                ${item.id}
            </p>

            <p>
                <strong>Data:</strong><br>
                ${item.data || "—"}
            </p>

            <p>
                <strong>Plataforma:</strong><br>
                ${item.plataforma || "—"}
            </p>

            <p>
                <strong>Usuário:</strong><br>
                ${item.usuario || "—"}
            </p>

            <p>
                <strong>URL:</strong><br>
                ${item.url || "—"}
            </p>

            <p>
                <strong>Descrição:</strong><br>
                ${item.descricao || "—"}
            </p>

            <p>
                <strong>Arquivo:</strong><br>
                ${item.arquivo || "—"}
            </p>

        `;


        lista.appendChild(div);

    });
}


mostrarRegistros();