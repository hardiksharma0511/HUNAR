import { useNavigate } from "react-router-dom";
import api from "../lib/axios";
import { ProductForm } from "../components/product/ProductForm";

const AddProduct = () => {
  const navigate = useNavigate();

  const handleSubmit = async (payload: any) => {
    const { data } = await api.post("/products", payload);
    navigate(`/products/${data.product._id}`);
  };

  return (
    <div className="section-padding container-hunar">
      <h1 className="font-display text-3xl mb-8">Add a New Product</h1>
      <ProductForm onSubmit={handleSubmit} submitLabel="Publish Product" />
    </div>
  );
};

export default AddProduct;
