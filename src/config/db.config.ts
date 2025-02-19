import { connect } from "mongoose"
import { MONGO_URI } from "./env"

export const dbConnect = () => {
  connect(MONGO_URI!)
    .then(() => console.log(`Mongodb connected`))
    .catch(error => console.error("Mongodb error.", error));
}