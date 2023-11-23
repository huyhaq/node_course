import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const categorySchema = new Schema({
    name: String,
    slug: String
});

const Category  = mongoose.model('Category', categorySchema);
export default Category;