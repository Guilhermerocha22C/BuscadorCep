import { useState, useEffect } from "react";
import axios from "axios";

export default function BuscarCep() {
  const [cep, setCep] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [uf, setUf] = useState("");

  useEffect(() => {
    if (cep.length === 8) {
      axios
        .get(`https://viacep.com.br/ws/${cep}/json/`)
        .then((response) => {
          setLogradouro(response.data.logradouro);
          setBairro(response.data.bairro);
          setCidade(response.data.localidade);
          setUf(response.data.uf);
        });
    }
  }, [cep]);

  return (
    <section>
      <h2>Exemplo 2: Buscar Endereço</h2>

      <input
        type="number"
        placeholder="Digite o seu CEP:"
        onChange={(input) => setCep(input.target.value)}
      />

      {cep.length === 8 && (
        <>
          <h3>Informações do endereço:</h3>
          <ul>
            <li>Rua: {logradouro}</li>
            <li>Bairro: {bairro}</li>
            <li>Cidade: {cidade}</li>
            <li>Estado: {uf}</li>
          </ul>
        </>
      )}
    </section>
  );
}
