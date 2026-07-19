import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../lib/axios";
import { Product } from "../types";
import { ProductForm } from "../components/product/ProductForm";
import { Spinner } from "../components/ui/Spinner";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/products/${id}`).then((res) => setProduct(res.data.product)).finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Spinner className="py-32" />;
  if (!product) return <p className="text-center py-32">Product not found.</p>;

  const handleSubmit = async (payload: any) => {
    await api.put(`/products/${id}`, payload);
    navigate(`/products/${id}`);
  };

  return (
    <div className="section-padding container-hunar">
      <h1 className="font-display text-3xl mb-8">Edit Product</h1>
      <ProductForm initial={product} onSubmit={handleSubmit} submitLabel="Save Changes" />
    </div>
  );
};

export default EditProduct;
