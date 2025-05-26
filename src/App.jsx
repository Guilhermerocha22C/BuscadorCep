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
    <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
          Buscar Endereço por CEP
        </h2>

        <input
          type="text"
          placeholder="Digite seu CEP (8 dígitos)"
          value={cep}
          maxLength={8}
          onChange={(e) => setCep(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-center mb-4"
        />

        {cep.length === 8 && (
          <>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Informações do Endereço
            </h3>
            <ul className="space-y-1 text-gray-600">
              <li><strong>Rua:</strong> {logradouro || "Não encontrado"}</li>
              <li><strong>Bairro:</strong> {bairro || "Não encontrado"}</li>
              <li><strong>Cidade:</strong> {cidade || "Não encontrado"}</li>
              <li><strong>Estado:</strong> {uf || "Não encontrado"}</li>
            </ul>
          </>
        )}
      </div>
    </section>
  );
}
