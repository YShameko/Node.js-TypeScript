function getProductDescription(product: { name: string; price: number; isAvailable: boolean }): string {
  const availabilityText = product.isAvailable ? 'Так' : 'Ні';

  return `Товар: ${product.name}, Ціна: ${product.price} грн., В наявності: ${availabilityText}`;
}

export default getProductDescription;