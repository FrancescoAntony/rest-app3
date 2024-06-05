/**
 * Nome do arquivo: REST-cli.js
 * Data de criação: 08/05/2024
 * Autor: Francesco Antony
 * Matrícula: 01609346
 *
 * Descrição:
 * Este arquivo JavaScript é responsável por implementar as funcionalidades respectivas de uma APi-RESTFULL, com todos os métodos de requisição de dados do usuário.
 *
 * Este script é parte o curso de ADS.
 */



// Importe as funções necessárias do Firebase
import { app, collection, getDocs, getDoc, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { database } from '@/Deploy-js/firebase'; // Certifique-se de ajustar o caminho correto

export default async function handler(req, res) {
  if (req.method === "GET") {
    const id = req.query.id;

    if (id === undefined) {
      try {
        // Obtenha todos os documentos da coleção 'clientes'
        const clientesSnapshot = await getDocs(collection(database, "clientes"));
        const clientes = clientesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        res.status(200).json(clientes);
      } catch (error) {
        res.status(500).json({ message: "Erro ao obter clientes" });
      }
    } else {
      try {
        // Obtenha um documento específico da coleção 'clientes' com base no ID
        const clienteDoc = await getDoc(doc(database, `clientes/${id}`));
        if (clienteDoc.exists()) {
          res.status(200).json({ id: clienteDoc.id, ...clienteDoc.data() });
        } else {
          res.status(404).json({ message: "Cliente não encontrado" });
        }
      } catch (error) {
        res.status(500).json({ message: "Erro ao obter cliente" });
      }
    }
  }

  if (req.method === "POST") {
    const new_cliente = req.body;

    try {
      // Adicione um novo documento à coleção 'clientes'
      // const docRef = await addDoc(collection(database, "clientes"), new_cliente);
      create_user(new_cliente)
      res.status(201).json({ id: docRef.id });
    } catch (error) {
      res.status(500).json({ message: "Erro ao criar cliente" });
    }
  }

  if (req.method === "PUT") {
    const update_cliente = req.body;

    try {
      // Atualize um documento específico na coleção 'clientes' com base no ID
      await updateDoc(doc(database, `clientes/${update_cliente.id}`), update_cliente);
      res.status(200).json({});
    } catch (error) {
      res.status(500).json({ message: "Erro ao atualizar cliente" });
    }
  }

  if (req.method === "DELETE") {
    const ID = req.body.id;

    try {
      // Exclua um documento específico na coleção 'clientes' com base no ID
      await deleteDoc(doc(database, `clientes/${ID}`));
      res.status(200).json({});
    } catch (error) {
      res.status(500).json({ message: "Erro ao excluir cliente" });
    }
  }
}