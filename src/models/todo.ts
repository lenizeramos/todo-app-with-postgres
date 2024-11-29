import { pool } from "../db";

export const getAll = async () => {
  let data = await pool.query(`SELECT * FROM todo ORDER BY id DESC;`);
  return data;
};

export const create = async (description: string) => {
  await pool.query(`INSERT INTO todo (description) VALUES ($1) RETURNING *;`, [
    description,
  ]);
};

export const remove = async (id: number) => {
  await pool.query(`DELETE FROM todo WHERE id = $1 RETURNING *;`, [id]);
};

export const edit = async (description: string, completed: boolean, id: number) => {
  const data = await pool.query(
    `UPDATE todo SET description = $1, completed = $2 WHERE id = $3 RETURNING *;`,
    [description, completed, id]
  );
};
