interface Product {
  id: number;
  name: string;
  price: number;
  quantityInStock: number;
}

type Inventory = Product[];

function addProduct(inventory: Inventory, product: Product): Inventory {
  for (const existingProduct of inventory) {
    if (existingProduct.id === product.id) {
      console.log(`Product already exist with id ${existingProduct.id}`);
      return inventory;
    }
  }

  return [...inventory, product];
}

function updateStock(
  inventory: Inventory,
  productId: number,
  quantityChange: number
): Inventory {
  return inventory.map((p) => {
    if (p.id === productId) {
      const newQuantity = Math.max(0, p.quantityInStock + quantityChange);
      return { ...p, quantityInStock: newQuantity };
    }

    return p;
  });
}

function getProductById(
  inventory: Inventory,
  productId: number
): Product | undefined {
  for (const product of inventory) {
    if (product.id === productId) {
      return product;
    }
  }
  return undefined;
}

function getTotalInventoryValue(inventory: Inventory): number {
  return inventory.reduce((total, product) => {
    total = total + product.price * product.quantityInStock;
    return total;
  }, 0);
}

const initialInventory: Inventory = [];

console.log("Initial Inventory", initialInventory);

const inventory1 = addProduct(initialInventory, {
  id: 1,
  name: "laptop",
  price: 20000,
  quantityInStock: 10,
});

console.log(inventory1);

const inventory2 = addProduct(inventory1, {
  id: 1,
  name: "lapt",
  price: 20,
  quantityInStock: 1,
});

console.log(inventory2);

const updatedInventory = updateStock(inventory1, 1, -2);

console.log("updated stock", updatedInventory);

const productById = getProductById(updatedInventory, 1);

console.log(productById);

console.log(getTotalInventoryValue(updatedInventory));
