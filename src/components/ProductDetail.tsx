import {
  ActionFunctionArgs,
  Form,
  useNavigate,
  redirect,
  useFetcher,
} from "react-router-dom";
import { formatCurrency } from "../helpers";
import type { Product } from "../types";
import { deleteProduct } from "../services/ProductService";

type ProductDetailProps = {
  product: Product;
};

export async function action({ params }: ActionFunctionArgs) {
  if (params.id !== undefined) {
    await deleteProduct(Number(params.id));
  }

  return redirect("/");
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const navigate = useNavigate();

  const fetcher = useFetcher();

  const isAvailable = product.availability;

  return (
    <tr className="border-b ">
      <td className="p-3 text-lg text-gray-800">{product.name}</td>
      <td className="p-3 text-lg text-gray-800">
        {formatCurrency(product.price)}
      </td>
      <td className="p-3 text-lg text-gray-800">
        <fetcher.Form method="POST">
          <button
            type="submit"
            name="id"
            value={product.id}
            className={`${
              isAvailable ? "text-black" : "text-red-600"
            } rounded-lg p-2 text-sm uppercase font-bold w-full border border-slate-600`}
          >
            {isAvailable ? "Disponible" : "No Disponible"}
          </button>
        </fetcher.Form>
      </td>
      <td className="p-3 text-lg text-gray-800 ">
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(`productos/${product.id}/edit`)}
            className="w-full bg-indigo-600 text-white text-center p-2 rounded-lg font-bold uppercase"
          >
            Editar
          </button>
          <Form
            method="POST"
            className="w-full"
            action={`productos/${product.id}/eliminar`}
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
              if (!confirm("Eliminar?")) {
                e.preventDefault();
              }
            }}
          >
            <input
              type="submit"
              value="Eliminar"
              className="w-full bg-red-600 text-white text-center p-2 rounded-lg font-bold uppercase"
            />
          </Form>
        </div>
      </td>
    </tr>
  );
}
