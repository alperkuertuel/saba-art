import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI ?? '';

interface Cached {
  conn: mongoose.Mongoose | undefined;
  promise: Promise<mongoose.Mongoose> | undefined;
}

// Use a global variable to store the cached connection
const globalWithCache = global as typeof global & { mongoose: Cached };

if (!globalWithCache.mongoose) {
  globalWithCache.mongoose = { conn: undefined, promise: undefined };
}

const cached = globalWithCache.mongoose;

async function databaseConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const options = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, options).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = undefined;
    throw error;
  }

  return cached.conn;
}

export default databaseConnect;
