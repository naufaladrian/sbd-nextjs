import { log } from 'console';
import mysql from 'mysql2/promise';

export async function query({ query, values = [] }) {
    
    const dbconnection = await mysql.createConnection(
      "mysql://vina:134679@localhost:3306/dbakademik"
    );
  
    try {
      const [results] = await dbconnection.execute(query, values);
      dbconnection.end();
      log("Query executed successfully");
      return results;
    } catch (error) {
      log("AHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH")
      throw Error(error.message);
    }
  }


