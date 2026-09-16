const express = require('express');
const app = express();
const PORT = 3000;

const menu = [
  { id: 1, name: "Pork BBQ", category: "Grilled", price: 25 },
  { id: 2, name: "Chicken BBQ", category: "Grilled", price: 30 },
  { id: 3, name: "Chicken Isaw", category: "Street Food", price: 10 },
  { id: 4, name: "Pork Belly Liempo", category: "Grilled", price: 120 },
  { id: 5, name: "Hotdog on Stick", category: "Street Food", price: 20 },
  { id: 6, name: "Puso Rice", category: "Rice", price: 8 },
  { id: 7, name: "Plain Rice", category: "Rice", price: 15 },
  { id: 8, name: "Iced Tea", category: "Drinks", price: 25 }
];

// Load full menu
app.get('/menu', (req, res) => {
  res.json(menu);
});

// Search menu by name or ID: /menu/search?q=chicken or /menu/search?q=3
app.get('/menu/search', (req, res) => {
  const query = (req.query.q || '').toLowerCase();
  const results = menu.filter(item =>
    item.name.toLowerCase().includes(query) ||
    String(item.id) === query
  );
  res.json(results);
});

// Get one item by ID
app.get('/menu/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const item = menu.find(m => m.id === itemId);
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ error: "Menu item not found" });
  }
});

app.use(express.static(__dirname));

app.listen(PORT, () => {
  console.log(`Chep's BBQ is running on http://localhost:${PORT}`);
});