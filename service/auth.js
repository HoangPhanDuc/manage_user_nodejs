import connection from "../config/database.js";

export const auth = async (email) => {
  const query = "SELECT id, email, password FROM admin WHERE email = ?";
  try {
    const [result] = await connection.execute(query, [email]);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const validate = async (email) => {
  const validate = "SELECT DISTINCT * FROM admin WHERE email = ?";
  try {
    const [result] = await connection.execute(validate, [email]);
    return result.length > 0 ? result : null;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const reg = async (email, password) => {
  const query = "INSERT INTO admin (email, password) VALUES (?, ?)";
  try {
    const [result] = await connection.execute(query, [email, password]);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const saveRefreshToken = async (token, id) => {
  const query = "UPDATE admin SET token = ? WHERE id = ?";
  try {
    const [result] = await connection.execute(query, [token, id]);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const refreshTokenService = async (id, token) => {
  const query = "SELECT * FROM admin WHERE id = ? AND token = ?";
  try {
    const [result] = await connection.execute(query, [id, token]);
    return result.length > 0 ? result : null;
  } catch (error) {
    console.log(error);
  }
};
