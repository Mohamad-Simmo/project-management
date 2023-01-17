import { connect } from 'mongoose';

export const connectDB = async () => {
  const conn = await connect(process.env.MONGO_URI!);
  console.log(`MONGODB Connected: ${conn.connection.host}`.cyan.underline.bold);
};
