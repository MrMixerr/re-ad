import mysql from "mysql2"

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'read_db'
}).promise()
export async function communitys(){
    const [result] = await pool.query("SELECT * FROM communitys");
    return result
}
export async function createcom(name, privacy, usercount, creator_id) {
    const result = await pool.query("INSERT INTO `communitys` (name, privacy, usercount, creator_id) VALUES (?, ?, ?, ?)", [
      name, privacy, usercount, creator_id
    ]);
    return result;
  }
export async function selectedcoms(id){
    const [rows] = await pool.query("SELECT * FROM communitys WHERE id = ?", [id])
    return rows
}
export async function selectuser(id){
    const [rows] = await pool.query("SELECT users.name FROM users JOIN communitys ON users.id = communitys.creator_id WHERE communitys.id = ?", [id])
    return rows
}


export async function adduser(name, pass){
    const result = await pool.query("INSERT INTO `users` (name, pass) VALUES (?, ?)", 
    [name, pass]);
    return result
} 
export async function checkuser(name, pass){
    const [rows] = await pool.query("SELECT * FROM users WHERE name = ? AND pass = ?", 
    [name, pass])
    return rows
} 
export async function getidbyusername(name){
    const [rows] = await pool.query("SELECT id FROM users WHERE name = ?", [name])
    return rows
}
export async function getuserprofile(id){
    const [result] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
    return result
}