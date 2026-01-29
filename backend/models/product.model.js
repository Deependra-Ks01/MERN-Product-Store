import mongose from 'mongoose';

const productSchema = new mongose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});    

const Product = mongose.model('Product', productSchema);
// products
export default Product; 