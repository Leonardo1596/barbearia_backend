const Product = require('../models/ProdutctSchema');

const createProduct = async (req, res) => {
    try {
        const { name, description, price, stock } = req.body;
        const newProduct = new Product({ name, description, price, stock });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Erro ao cadastrar o produto' });
    }
};

const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        // Search and delete by ID
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }

        res.status(200).json({ message: 'Produto excluído com sucesso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao excluir o produto' });
    }
};

const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, description, price, stock } = req.body;

    try {
        // Search and update product by ID
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { name, description, price, stock },
            { new: true, runValidators: true } // Returns the updated document and applies validations
        );

        if (!updatedProduct) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }

        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao atualizar o produto' });
    }
};



module.exports = {
    createProduct,
    deleteProduct,
    updateProduct
}