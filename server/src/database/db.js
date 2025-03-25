import { createPool } from 'mysql2/promise'

export const pool = createPool({
  host: 'bs3drvgmpge7qfhsqnyt-mysql.services.clever-cloud.com',
  port: 3306,
  user: 'uvbsumzxmhersgif',
  password: 'FDY05z1DHuTCrZH6Si8z',
  database: 'bs3drvgmpge7qfhsqnyt',
})