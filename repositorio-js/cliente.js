/**
 * Nome do arquivo: repository.js
 * Data de criação: 09/05/2024
 * Autor: Francesco Antony
 * Matrícula: 01609346
 *
 * Descrição:
 * Este arquivo JavaScript é responsável por consultar todas as funções pelo banco de dados.
 *
 * Este script é parte o curso de ADS.
 */

async function create_user(new_cliente){
    const docRef = await addDoc(collection(database, "clientes"), new_cliente);
  }

// READ //

if (req.method === "GET") {
    const id = req.query.id;
    console.log("", id);

    if (id === undefined) {
      const clientes = await db.all("SELECT * from clientes");

      res.status(200).json(clientes);
    } else {
      const cliente = await db.get("SELECT * from clientes WHERE id = ?", [id]);
      res.status(200).json(cliente);
    }
  }

// CREATE //

if (req.method === "POST") {
    const new_cliente = req.body;

    console.log("====================================");
    console.log(new_cliente.nome, new_cliente.endereço, new_cliente.telefone, new_cliente.email);
    console.log("====================================");

    if (new_cliente.nome === undefined || new_cliente.nome === "") {
        res.status(402).json({message: "nome é obrigatorio!"});
      }

      if (new_cliente.endereço=== undefined || new_cliente.endereço === "") {
        res.status(402).json({message: "endereço é obrigatorio!"});
    }

    if (new_cliente.telefone === undefined || new_cliente.telefone === "") {
        res.status(402).json({message: "telefone é obrigatorio!"});
    }

    if (new_cliente.email === undefined || new_cliente.email === "") {
        res.status(402).json({message: "email é obrigatorio!"});
      }

      const createUser = await db.prepare(
        "INSERT INTO clientes (nome, endereço, telefone, email) VALUES (?, ?, ?, ?);"
    );

    const runCreat = await createUser.run(new_cliente.nome, new_cliente.endereço, new_cliente.telefone, new_cliente.email);

    res.status(201).json({});
  }

  // UPDATE // 

if (req.method === "PUT") {
    const update_cliente = req.body;

    const valid_cliente = await db.get("SELECT * from clientes WHERE id = ?", [
      update_cliente.id,
    ]);
    if (valid_cliente === undefined) {
      res.status(404).json({});
    }

    const updateCliente = await db.prepare(
      "UPDATE clientes SET nome = ?, endereço = ?, telefone = ?, email = ? WHERE id = ?"
    );
    const runCreat = await updateCliente.run(
      update_cliente.nome,
      update_cliente.endereço,
      update_cliente.telefone,
      update_cliente.email,
      update_cliente.id
    );

    res.status(200).json({});
  }

  // DELETE //

  if (req.method === "DELETE") {
    const ID = req.body.id;

    const valid_cliente = await db.get("SELECT * from clientes WHERE id = ?", [
      ID,
    ]);
    if (valid_cliente === undefined) {
      res.status(404).json({});
    }

    const deleteCliente = await db.prepare(
      "DELETE FROM Clientes WHERE id = ?;"
    );

    const delete_cliente = await deleteCliente.run(ID);

    res.status(201).json({});
  }