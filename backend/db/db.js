import mongoose from "mongoose";

const Connect = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(
      `Database Connected Successfully ${conn.connection.host}`
    );
  } catch (error) {
    console.log(`Error While Connecting the database ${error}`);
  }
};

export default Connect;