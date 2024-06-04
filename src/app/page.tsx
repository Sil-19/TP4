"use client"; // Indica que este es un componente del cliente

import React, { useState, useEffect } from 'react';
import { getNumero , updateNumero} from './lib/supabase';

export default function Contador() {
  const [numero, setNumero] = useState(0);

  useEffect(() => {
    async function fetchNumero() {
      const numeroFromDB = await getNumero();
      if (numeroFromDB && numeroFromDB.numero !== null) {
        const aux = parseInt(numeroFromDB.numero.toString()); // Convert the bigint value to a string before parsing it
        setNumero(aux); // Actualiza el estado del contador con el número de la base de datos
      }
    }
    fetchNumero();
  }, []);

  const incrementar = async () => {
    const nuevoNumero = numero + 1;
    setNumero(nuevoNumero);
    await updateNumero(nuevoNumero); // Actualiza el número en la base de datos
  };


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800">
      <main className="text-center">
        <h1 className="text-2xl mb-4 bg-purple-800">Contador: {numero}</h1>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={incrementar}>Incrementar</button>
      </main>
    </div>
  );
}
