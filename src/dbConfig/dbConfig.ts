import mongoose from "mongoose";

export default function connect() {
    try {
        mongoose.connect(process.env.MONGO_URL!);
        const connection = mongoose.connection
        connection.on('connected', () => {
            console.log('MongoDB connected successfully')
        })
        connection.on('error', (err) => {
            console.log({ status : false, message : err})
        })
    } catch (error) {
        console.log(error)
    }    
}
