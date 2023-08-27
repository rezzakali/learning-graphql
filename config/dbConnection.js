import mongoose from 'mongoose';

const connectionToDb = async () => {
  try {
    await mongoose.connect(
      `${process.env.MONGO_CONN_URI}/${process.env.DB_NAME}`
    );
    console.log('🔗 Database connected successfully!'.cyan);
  } catch (error) {
    console.log(`😨 ${error.message}`.red);
  }
};

export default connectionToDb;
