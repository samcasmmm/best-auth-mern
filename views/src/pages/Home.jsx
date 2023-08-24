import Card from '../components/Card';
import { ProductsData } from './../data/ProductData';
const Home = () => {
  return (
    <div className='flex items-center justify-center min-h-[85vh]'>
      <div className='flex items-center justify-center'>
        <div className='grid gap-5 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2  xs:grid-cols-1 m-10'>
          {ProductsData.map((product) => (
            <Card
              key={product.product_id}
              product_id={product.product_id}
              product_name={product.product_name}
              price={product.price}
              quantity={product.quantity}
              category={product.category}
              brand={product.brand}
              description={product.description}
              rating={product.rating}
              availability={product.availability}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
