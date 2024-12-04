import mongoose from "mongoose"

const username = process.env.myusername
const passsword = process.env.mypassword

const connectToDatabase = async () => {
    return await mongoose.connect(`mongodb+srv://${username}:${passsword}@cluster0.1itt6.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0`);
};

export default connectToDatabase