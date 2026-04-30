import { faker } from '@faker-js/faker';
import { Product } from '../models/Product';

export function createRandomProduct(
  overrides?: Partial<Product>
): Product {
  return {
    name: `producto prueba ${faker.string.alphanumeric(6)}`,
    supplierName: 'Aux joyeux ecclésiastiques',
    categoryName: 'Produce',
    unitsInStock: faker.number.int({ min: 1, max: 20 }),
    unitsOnOrder: faker.number.int({ min: 1, max: 10 }),
    reorderLevel: faker.number.int({ min: 1, max: 5 }),
    ...overrides,
  };
}
