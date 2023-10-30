import mongoose from 'mongoose';

const indexSchema = new mongoose.Schema({
  indexes: {
    type: [Number],
    unique: true,
    required: true,
  },
});
const indexModel = mongoose.model('indexes', indexSchema);
export default indexModel;
