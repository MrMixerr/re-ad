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
    const users = await pool.query("SELECT * FROM `users` WHERE name=?", [name]);
    if(users[0].length == 0) {
        const result = await pool.query("INSERT INTO `users` (name, pass) VALUES (?, ?)", [name, pass]);
        return 1;
    } else {
        return 0;
    }
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
export async function community_list(id){
    const [result] = await pool.query("SELECT * FROM join_com WHERE user_id = ?", [id]);
    return result
}
export async function community_list_name(id){
    const [result] = await pool.query("SELECT communitys.name FROM communitys JOIN join_com ON communitys.id = join_com.com_id WHERE communitys.id = ?", [id]);
    return result
}
export async function join_com(user_id, com_id, status) {
    const result = await pool.query("INSERT INTO `join_com` (user_id, com_id, status) VALUES (?, ?, ?)", [
      user_id, com_id, status 
    ]);
    return result;
  }
