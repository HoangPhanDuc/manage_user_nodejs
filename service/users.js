import connection from "../config/database.js";

export const getAll = async () => {
  const query = "SELECT * FROM users";
  try {
    const [results] = await connection.execute(query);
    return results;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getById = async (id) => {
  const query = "SELECT * FROM users WHERE id = ?";
  try {
    const [result] = await connection.execute(query, [id]);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const create = async (user) => {
  const query =
    "INSERT INTO users (users_name, phone, address) VALUES (?, ?, ?)";
  try {
    const [result] = await connection.execute(query, [
      user.users_name,
      user.phone,
      user.address,
    ]);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const update = async (id, user) => {
  const query =
    "UPDATE users SET users_name = ?, phone = ?, address = ? WHERE id = ?";
  try {
    const [result] = await connection.execute(query, [
      user.users_name,
      user.phone,
      user.address,
      id,
    ]);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteUser = async (id) => {
  const query = "DELETE FROM users WHERE id = ?";
  try {
    const [result] = await connection.execute(query, [id]);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
