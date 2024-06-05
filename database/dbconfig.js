/**
 * Nome do arquivo: dbconfig.js
 * Data de criação: 10/05/2024
 * Autor: Francesco Antony
 * Matrícula: 01609346
 *
 * Descrição:
 * Este arquivo JavaScript é responsável por mostrar as configurações de acesso
 * ao meu banco de dados.
 *
 * Este script é parte o curso de ADS.
 */

const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');

export default async function openDB() {
    return sqlite.open({
        filename: "./banco.db",
        driver: sqlite3.Database
    })
}