
'use server';

import fs from 'fs/promises';
import path from 'path';

// Define the path to the JSON file
const dbPath = path.join(process.cwd(), 'src', 'lib', 'db.json');

// Define the structure of our database
interface DbData {
  products: Product[];
  profile: Profile;
}

export interface Product {
    name: string;
    description: string;
    status: 'Active' | 'Draft' | 'Archived';
    price: string;
    stock: number;
    date: string;
    image: string;
    aiHint: string;
}

export interface Profile {
    name: string;
    location: string;
    story: string;
    heritage: string;
}

// Initial data if the file doesn't exist
const initialData: DbData = {
    products: [
        {
            name: "Hand-painted Madhubani Saree",
            description: "A beautiful Tussar silk saree, hand-painted with traditional Madhubani motifs depicting tales of nature and mythology.",
            status: "Active",
            price: "₹8,999",
            stock: 25,
            date: "2023-07-12 10:42 AM",
            image: "https://picsum.photos/100/100?random=1",
            aiHint: "painted saree"
        },
        {
            name: "Terracotta Horse Statue",
            description: "A rustic terracotta horse, symbolizing power and grace, handcrafted by artisans from Panchmura village.",
            status: "Active",
            price: "₹3,499",
            stock: 8,
            date: "2023-10-18 03:21 PM",
            image: "https://picsum.photos/100/100?random=2",
            aiHint: "terracotta statue"
        },
        {
            name: "Warli Art Coasters (Set of 4)",
            description: "Set of four wooden coasters, hand-painted with intricate Warli art, perfect for adding a touch of ethnic charm to your home.",
            status: "Draft",
            price: "₹999",
            stock: 100,
            date: "2024-01-05 09:12 AM",
            image: "https://picsum.photos/100/100?random=3",
            aiHint: "art coasters"
        },
        {
            name: "Pashmina Shawl with Sozni Embroidery",
            description: "An exquisite Pashmina shawl from Kashmir featuring delicate Sozni hand-embroidery. A timeless piece of wearable art.",
            status: "Archived",
            price: "₹15,000",
            stock: 0,
            date: "2022-11-29 01:55 PM",
            image: "https://picsum.photos/100/100?random=4",
            aiHint: "pashmina shawl"
        },
    ],
    profile: {
        name: "Ravi Kumar",
        location: "Jaipur, Rajasthan",
        story: "I am a third-generation block-printer from Jaipur, keeping the traditions of my family alive through vibrant textiles...",
        heritage: "Sanganeri block-printing is a traditional art form from Rajasthan, known for its delicate floral patterns and use of natural dyes."
    }
};

// Function to read the database
async function readDb(): Promise<DbData> {
    try {
        await fs.access(dbPath);
        const fileContent = await fs.readFile(dbPath, 'utf-8');
        return JSON.parse(fileContent);
    } catch (error) {
        // If the file doesn't exist, create it with initial data
        await fs.writeFile(dbPath, JSON.stringify(initialData, null, 2), 'utf-8');
        return initialData;
    }
}

// Function to write to the database
async function writeDb(data: DbData): Promise<void> {
    await fs.writeFile(dbPath, JSON.stringify(data, null, 2), 'utf-8');
}

// --- API Functions ---

// Products
export async function getProducts(): Promise<Product[]> {
    const db = await readDb();
    return db.products;
}

export async function addProduct(product: Omit<Product, 'date'>): Promise<Product> {
    const db = await readDb();
    const newProduct: Product = {
        ...product,
        date: new Date().toISOString(),
    };
    db.products.unshift(newProduct); // Add to the beginning of the list
    await writeDb(db);
    return newProduct;
}


// Profile
export async function getProfile(): Promise<Profile> {
    const db = await readDb();
    return db.profile;
}

export async function saveProfile(profile: Profile): Promise<Profile> {
    const db = await readDb();
    db.profile = profile;
    await writeDb(db);
    return db.profile;
}
