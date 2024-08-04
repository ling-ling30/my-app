import ProductList from "./components/ProductList";

type Props = {};

function page({}: Props) {
  return (
    <main className="p-5">
      <ProductList />
    </main>
  );
}

export default page;
