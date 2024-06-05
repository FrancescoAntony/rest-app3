/**
 * Nome do arquivo: DB.sql
 * Data de criação: 08/05/2024
 * Autor: Francesco Antony
 * Matrícula: 01609346
 *
 * Descrição:
 * Este arquivo SQL é responsável por implementar as tabelas com a CRUD completa e todas as configurações por dentro do banco de dados.
 *
 * Este script é parte o curso de ADS.
 */




/* TABELA CLIENTE */

create table clientes (
    id integer primary key autoincrement,
    nome varchar(15) not null,
    endereço varchar(20) not null,
    telefone varchar(15) not null,
    email varchar(20) not null
);

INSERT INTO clientes (nome, endereço, telefone, email) VALUES ('Tony Yuri', 'Rua Vasconcelos, Joaquim 33' '(53) 2883-4359' 'tony@outlook.com.br');

UPDATE clientes SET email = 'antony@gmail.com.br' where id = 1;

SELECT * from clientes WHERE id = 1;

DELETE from clientes WHERE id = 1;


/* TABELA DE ORDEM DE SERVIÇO */

/* Habilitando a chave estrangeira */
PRAGMA foreign_keys = ON;

create table cliente_serviço (
    id varchar(30) primary key,
    cliente_associado integer,
    data_ordem datetime default CURRENT_TIMESTAMP,
    desc_serviço text not null,
    custo_estimado integer,
    custo_final integer,
    status_servico text not null,
    FOREIGN KEY (cliente_associado) REFERENCES clientes(id)
);

INSERT INTO cliente_servico (id, cliente_associado, data_ordem, desc_serviço, custo_estimado, status_servico) VALUES (UUID(), cliente_associado, data_ordem, 'desc_serviço', 'custo_estimado', 'status_serviço', custo_final);

UPDATE cliente_servico SET status_servico = 'Em andamento', 'Concluído', 'Cancelado' where id = 'UUID() da ordem';
UPDATE custo_final SET custo_final = x where id = cliente_associado;

SELECT * from cliente_servico;

DELETE from cliente_servico WHERE id = "UUID() da ordem";