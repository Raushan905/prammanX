require('dotenv').config();
const mongoose = require('mongoose');
const CategoryRule = require('./models/CategoryRule');

const categoryRules = [
  {
    category: "Packaged Food",
    requiredFields: [
      { fieldName: "manufacturerName", displayName: "Manufacturer/Packer/Importer Name & Address" },
      { fieldName: "commonName", displayName: "Common/Generic Name of Commodity" },
      { fieldName: "netQuantity", displayName: "Net Quantity" },
      { fieldName: "mfgDate", displayName: "Month & Year of Manufacture" },
      { fieldName: "mrp", displayName: "Maximum Retail Price (inclusive of taxes)" },
      { fieldName: "customerCare", displayName: "Consumer Care Details" },
      { fieldName: "fssaiLicense", displayName: "FSSAI License Number" },
      { fieldName: "bestBefore", displayName: "Best Before / Expiry Date" },
      { fieldName: "vegNonVeg", displayName: "Veg/Non-Veg Symbol" }
    ]
  },
  {
    category: "Cosmetic",
    requiredFields: [
      { fieldName: "manufacturerName", displayName: "Manufacturer/Packer/Importer Name & Address" },
      { fieldName: "commonName", displayName: "Common/Generic Name of Commodity" },
      { fieldName: "netQuantity", displayName: "Net Quantity" },
      { fieldName: "mfgDate", displayName: "Month & Year of Manufacture" },
      { fieldName: "mrp", displayName: "Maximum Retail Price" },
      { fieldName: "customerCare", displayName: "Consumer Care Details" },
      { fieldName: "ingredients", displayName: "Ingredients List" },
      { fieldName: "usageInstructions", displayName: "Usage Instructions" },
      { fieldName: "batchNumber", displayName: "Batch Number" }
    ]
  },
  {
    category: "Electronics/Appliances",
    requiredFields: [
      { fieldName: "manufacturerName", displayName: "Manufacturer/Packer/Importer Name & Address" },
      { fieldName: "commonName", displayName: "Common/Generic Name of Commodity" },
      { fieldName: "netQuantity", displayName: "Net Quantity (units, if applicable)" },
      { fieldName: "mfgDate", displayName: "Month & Year of Manufacture" },
      { fieldName: "mrp", displayName: "Maximum Retail Price" },
      { fieldName: "customerCare", displayName: "Consumer Care Details" },
      { fieldName: "ratedVoltage", displayName: "Rated Voltage/Power" },
      { fieldName: "bisMark", displayName: "BIS Standard Mark (if applicable)" }
    ]
  },
  {
    category: "Textile",
    requiredFields: [
      { fieldName: "manufacturerName", displayName: "Manufacturer/Packer/Importer Name & Address" },
      { fieldName: "commonName", displayName: "Common/Generic Name of Commodity" },
      { fieldName: "netQuantity", displayName: "Net Quantity" },
      { fieldName: "mfgDate", displayName: "Month & Year of Manufacture" },
      { fieldName: "mrp", displayName: "Maximum Retail Price" },
      { fieldName: "customerCare", displayName: "Consumer Care Details" },
      { fieldName: "fabricComposition", displayName: "Fabric Composition" },
      { fieldName: "careInstructions", displayName: "Care Instructions" }
    ]
  },
  {
    category: "Household Chemicals",
    requiredFields: [
      { fieldName: "manufacturerName", displayName: "Manufacturer/Packer/Importer Name & Address" },
      { fieldName: "commonName", displayName: "Common/Generic Name of Commodity" },
      { fieldName: "netQuantity", displayName: "Net Quantity" },
      { fieldName: "mfgDate", displayName: "Month & Year of Manufacture" },
      { fieldName: "mrp", displayName: "Maximum Retail Price" },
      { fieldName: "customerCare", displayName: "Consumer Care Details" },
      { fieldName: "safetyWarning", displayName: "Safety/Hazard Warning" },
      { fieldName: "usageInstructions", displayName: "Usage Instructions" }
    ]
  }
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Connected. Seeding category rules...');
    await CategoryRule.deleteMany({});
    await CategoryRule.insertMany(categoryRules);
    console.log('✅ Category rules seeded successfully!');
    mongoose.connection.close();
  })
  .catch((err) => console.error('❌ Error:', err));