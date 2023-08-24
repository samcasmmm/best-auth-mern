const Card = ({
  product_id,
  product_name,
  price,
  quantity,
  category,
  brand,
  description,
  rating,
  availability,
}) => {
  return (
    <div className='border border-slate-200 p-2 max-w-[300px]'>
      <div className='flex flex-col items-start gap-5 justify-center'>
        <img src={brand} alt='' className='w-full h-[200px]' />
        <div className=''>
          <h2>{product_name}</h2>
          <p>Category: {category}</p>
          <p>
            <ion-icon name='star-outline'></ion-icon> {rating}
          </p>
        </div>
      </div>
      <p>Price: {price}</p>
      <p>Quantity: {quantity}</p>
      <p>Availability: {availability ? 'Available' : 'Not Available'}</p>
    </div>
  );
};

export default Card;
