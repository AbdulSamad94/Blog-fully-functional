const username = process.env.myusername
const passsword = process.env.mypassword

if (!username || !passsword) {
    throw new Error("Missing MongoDB credentials!")
}

export const userConnectionString = `mongodb+srv://${username}:${passsword}@cluster0.1itt6.mongodb.net/User?retryWrites=true&w=majority&appName=Cluster0`