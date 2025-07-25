const pool = require('./db');


const createUsersTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        firebase_uid TEXT UNIQUE NOT NULL,
        name TEXT,
        email TEXT,
        role TEXT CHECK (role IN ('citizen', 'responder', 'admin')),
        location_lat DOUBLE PRECISION,
        location_lng DOUBLE PRECISION,
        fcm_token TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("✅ Created 'users' table");
  } catch (error) {
    console.error("❌ Error creating 'users' table:", error);
  }
};
const air_quality_predictions = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS air_quality_predictions (
        id SERIAL PRIMARY KEY,
        city TEXT NOT NULL,
        state TEXT NOT NULL,
        latitude DOUBLE PRECISION NOT NULL,
        longitude DOUBLE PRECISION NOT NULL,
        pm25_prediction DOUBLE PRECISION NOT NULL,
        pm10_prediction DOUBLE PRECISION NOT NULL,
        timestamp TIMESTAMPTZ DEFAULT NOW()
      );
    `);
    console.log("✅ Created 'air_quality_predictions' table or already exists");
  } catch (error) {
    console.error("❌ Error creating 'air_quality_predictions' table:", error);
  }
};



const init = async () => {
  await createUsersTable();
  await air_quality_predictions()
};

init();
