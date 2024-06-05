/**
 * Nome do arquivo: clientes-html.js
 * Data de criação: 01/06/2024
 * Autor: Francesco Antony
 * Matrícula: 01609346
 *
 * Descrição:
 * Este arquivo JavaScript mostra a inicialização de dois conteiners que mostra o CRUD básico da 
 * tabela HTML de clientes para à tabela ordens de serviços assim que for adicionar um cliente.
 *
 * Este script é parte o curso de ADS.
 */



import { useState } from 'react';

// Função para validar email
const validateEmail = (email) => {
  // Expressão regular para validar email
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export default function Home() {
  const [clients, setClients] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceName, setServiceName] = useState('');
  const [serviceDescription, setServiceDescription] = useState('');
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editServiceName, setEditServiceName] = useState('');
  const [editServiceDescription, setEditServiceDescription] = useState('');
  const [error, setError] = useState('');

  // States for Service Orders
  const [serviceOrders, setServiceOrders] = useState([]);
  
  // Client functions
  const handleAddClient = () => {
    if (name.trim() === '') {
      setError('O nome do cliente não pode estar vazio');
      return;
    }
    if (email.trim() === '') {
      setError('O email do cliente não pode estar vazio');
      return;
    }
    if (phone.trim() === '') {
      setError('O telefone do cliente não pode estar vazio');
      return;
    }
    if (serviceName.trim() === '' || serviceDescription.trim() === '') {
      setError('Preencha o nome do serviço ou a descrição do serviço');
      return;
    }
    if (!validateEmail(email)) {
      setError('Por favor, insira um email válido');
      return;
    }

    const newClient = {
      id: Date.now().toString(),
      name,
      email,
      phone,
      serviceName,
      serviceDescription,
    };
    setClients([...clients, newClient]);
    setServiceOrders([...serviceOrders, { clientId: newClient.id, name: newClient.serviceName, description: newClient.serviceDescription }]);
    setName('');
    setEmail('');
    setPhone('');
    setServiceName('');
    setServiceDescription('');
    setError('');
  };

  const handleEditClient = (id) => {
    const client = clients.find(client => client.id === id);
    setEditId(id);
    setEditName(client.name);
    setEditEmail(client.email);
    setEditPhone(client.phone);
    setEditServiceName(client.serviceName);
    setEditServiceDescription(client.serviceDescription);
  };

  const handleUpdateClient = () => {
    if (editName.trim() === '') {
      setError('O nome do cliente não pode estar vazio');
      return;
    }
    if (editEmail.trim() === '') {
      setError('O email do cliente não pode estar vazio');
      return;
    }
    if (editPhone.trim() === '') {
      setError('O telefone do cliente não pode estar vazio');
      return;
    }
    if (editServiceName.trim() === '' || editServiceDescription.trim() === '') {
      setError('Preencha o nome do serviço ou a descrição do serviço');
      return;
    }
    if (!validateEmail(editEmail)) {
      setError('Por favor, insira um email válido');
      return;
    }

    setClients(clients.map(client => (client.id === editId ? {
      ...client,
      name: editName,
      email: editEmail,
      phone: editPhone,
      serviceName: editServiceName,
      serviceDescription: editServiceDescription,
    } : client)));
    setEditId(null);
    setEditName('');
    setEditEmail('');
    setEditPhone('');
    setEditServiceName('');
    setEditServiceDescription('');
    setError('');
  };

  const handleDeleteClient = (id) => {
    setClients(clients.filter(client => client.id !== id));
    setServiceOrders(serviceOrders.filter(order => order.clientId !== id));
  };

  // Service Order functions
  const handleEditServiceOrder = (id) => {
    const order = serviceOrders.find(order => order.id === id);
    setEditId(id);
    setEditServiceName(order.name);
    setEditServiceDescription(order.description);
  };

  const handleUpdateServiceOrder = () => {
    if (editServiceName.trim() === '') {
      setError('O nome da ordem de serviço não pode estar vazio');
      return;
    }
    if (editServiceDescription.trim() === '') {
      setError('A descrição da ordem de serviço não pode estar vazia')
      return;
    }
    setServiceOrders(serviceOrders.map(order => (order.id === editId ? {
      ...order,
      name: editServiceName,
      description: editServiceDescription,
    } : order)));
    setEditId(null);
    setEditServiceName('');
    setEditServiceDescription('');
    setError('');
  };

  const handleDeleteServiceOrder = (id) => {
    const orderToDelete = serviceOrders.find(order => order.id === id);
    
    if (orderToDelete) {
      const clientId = orderToDelete.clientId;
      setServiceOrders(serviceOrders.filter(order => order.clientId !== clientId)); // Remove a ordem de serviço
  
      // Remove o cliente correspondente da tabela de clientes
      setClients(clients.filter(client => client.id !== clientId));
    }
  };
  return (
    <div style={styles.page}>
      <div style={{...styles.container, marginRight: '20px'}}>
        <h1 style={styles.title}>Clientes</h1>
        <div style={styles.form}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nome do Cliente"
            style={styles.input}
          />
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            style={styles.input}
          />
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Telefone"
            style={styles.input}
          />
          <input
            type="text"
            value={serviceName}
            onChange={(e) => setServiceName(e.target.value)}
            placeholder="Nome do Serviço"
            style={styles.input}
          />
          <input
            type="text"
            value={serviceDescription}
            onChange={(e) => setServiceDescription(e.target.value)}
            placeholder="Descrição do Serviço"
            style={styles.input}
          />
          <button onClick={handleAddClient} style={styles.button}>Adicionar Cliente</button>
          {error && <p style={styles.error}>{error}</p>}
        </div>
        <ul style={styles.list}>
          {clients.map(client => (
            <li key={client.id} style={styles.listItem}>
              {client.id === editId ? (
                <div style={styles.form}>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    style={styles.input}
                  />
                  <input
                    type="text"
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    style={styles.input}
                  />
                  <input
                    type="text"
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                    style={styles.input}
                  />
                  <input
                    type="text"
                    value={editServiceName}
                    onChange={(e) => setEditServiceName(e.target.value)}
                    style={styles.input}
                  />
                  <input
                    type="text"
                    value={editServiceDescription}
                    onChange={(e) => setEditServiceDescription(e.target.value)}
                    style={styles.input}
                  />
                  <button onClick={handleUpdateClient} style={styles.button}>Salvar</button>
                  <button onClick={() => setEditId(null)} style={styles.buttonCancel}>Cancelar</button>
                </div>
              ) : (
                <div style={styles.clientInfo}>
                  <strong>ID:</strong> {client.id}<br />
                  <strong>Nome do Cliente:</strong> {client.name}<br />
                  <strong>Email:</strong> {client.email}<br />
                  <strong>Telefone:</strong> {client.phone}<br />
                  <strong>Nome do Serviço:</strong> {client.serviceName}<br />
                  <strong>Descrição do Serviço:</strong> {client.serviceDescription}<br />
                  <button onClick={() => handleEditClient(client.id)} style={styles.buttonEdit}>Editar</button>
                  <button onClick={() => handleDeleteClient(client.id)} style={styles.buttonDelete}>Deletar</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div style={{...styles.container, marginLeft: '20px'}}>
        <h1 style={styles.title}>Ordens de Serviço</h1>
        <ul style={styles.list}>
          {serviceOrders.map(order => (
            <li key={order.id} style={styles.listItem}>
              {order.id === editId ? (
                <div style={styles.form}>
                  <input
                    type="text"
                    value={editServiceName}
                    onChange={(e) => setEditServiceName(e.target.value)}
                    style={styles.input}
                  />
                  <input
                    type="text"
                    value={editServiceDescription}
                    onChange={(e) => setEditServiceDescription(e.target.value)}
                    style={styles.input}
                  />
                  <button onClick={handleUpdateServiceOrder} style={styles.button}>Salvar</button>
                  <button onClick={() => setEditId(null)} style={styles.buttonCancel}>Cancelar</button>
                </div>
              ) : (
                <div style={styles.clientInfo}>
                  <strong>ID do Cliente:</strong> {order.clientId}<br />
                  <strong>Nome do Serviço:</strong> {order.name}<br />
                  <strong>Descrição do Serviço:</strong> {order.description}<br />
                  <button onClick={() => handleEditServiceOrder(order.id)} style={styles.buttonEdit}>Editar</button>
                  <button onClick={() => handleDeleteServiceOrder(order.id)} style={styles.buttonDelete}>Deletar</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const styles = {
  page: {
    backgroundColor: '#f0f0f0',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: '20px',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#fff',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    maxWidth: '300px',
  },
  title: {
    color: '#333',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '20px',
  },
  input: {
    padding: '10px',
    margin: '10px 0',
    width: '200px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    color: '#000',
  },
  button: {
    padding: '10px 20px',
    margin: '5px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  buttonCancel: {
    padding: '10px 20px',
    margin: '5px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  buttonEdit: {
    padding: '10px 20px',
    margin: '5px',
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  buttonDelete: {
    padding: '10px 20px',
    margin: '5px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    marginTop: '10px',
  },
  list: {
    listStyleType: 'none',
    padding: '0',
    width: '100%',
  },
  listItem: {
    marginBottom: '10px',
    backgroundColor: '#fff',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    color: '#000',
  },
  clientInfo: {
    color: '#000',
  },
};
