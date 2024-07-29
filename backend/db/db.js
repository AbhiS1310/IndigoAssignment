import mongoose from "mongoose";
import colors from "colors";

const Connect = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(
      colors.bgMagenta.white(`Database Connected Successfully ${conn.connection.host}`)
    );
  } catch (error) {
    console.log(colors.bgRed.white(`Error While Connecting the database ${error}`));
  }
};

export default Connect;