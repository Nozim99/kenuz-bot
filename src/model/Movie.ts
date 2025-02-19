import mongoose, { Schema } from 'mongoose';


export interface IMovie extends Schema {
  message_id: number;
  fromChatId: number;
  description?: string;
  _id: Schema.Types.ObjectId;
}


const MovieSchema = new Schema<IMovie>({
  message_id: {
    type: Number,
    required: true,
  },
  fromChatId: {
    type: Number,
    required: true,
  },
  description: String,
});

const Movie = mongoose.model<IMovie>('Movie', MovieSchema);
export default Movie;