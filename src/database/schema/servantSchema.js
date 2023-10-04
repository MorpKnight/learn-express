import mongoose from "mongoose";

const servantSchema = new mongoose.Schema({
    name: String,
    class: String,
    origin: String,
    npType: String,
    registeredAt: {
        type: Date,
        default: new Date(),
    },
})

const Servant = mongoose.model("Servant", servantSchema);

export default Servant;