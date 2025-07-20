import React, { useEffect, useState } from 'react';
import { ProductList, BasketItem, BasketResponse } from '../types';
import { fetchProducts, addBasket } from '../services/api';
import {
  Box,
  MenuItem,
  Select,
  TextField,
  Typography,
  Button,
  TableHead,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@mui/material';

const MainPage: React.FC = () => {
  const [products, setProducts] = useState<ProductList[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);
  const [basket, setBasket] = useState<BasketResponse | null>(null);
  const [basketItem, setBasketItem] = useState<BasketItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchProducts().then((data)=>{setProducts(data); setLoading(false);});
  }, []);

  const handleAdd = async () => {
    debugger
    if (selectedProductId && quantity > 0) {
      setLoading(true);
      const updated = [...basketItem];
      const index = updated.findIndex(b => b.productId === selectedProductId);
      if (index >= 0) {
        updated[index].quantity += quantity;
      } else {
        updated.push({ productId: selectedProductId, quantity });
      }
     await addBasket({ items: updated })
     .then((data) => { 
      setBasket(data); 
      setBasketItem(updated);
      setQuantity(0); 
      setLoading(false); 
      setSelectedProductId(0) 
     }).catch((error)=>console.log(error))
    }
  };

  return (
  
<>
    {loading ? (
      <div className="spinner"></div>
    ) : (
    <Box p={4}>
      <Box display="flex" alignItems="center" gap={2} mb={4}>
        <Typography>Select Item</Typography>
        <Select
          value={selectedProductId}
          onChange={(e) => setSelectedProductId(Number(e.target.value))}
          size="small"
        >
           <MenuItem key='0' value='0'>---Select---</MenuItem>
          {products.map(p => (
            <MenuItem key={p.id} value={p.id}>{p.name}</MenuItem>
          ))}
        </Select>

        <Typography>Quantity</Typography>
        <TextField
          size="small"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          style={{ width: 100 }}
        />

        <Button variant="outlined" onClick={handleAdd}>Add</Button>
      </Box>
     {basket?.products && ( <Table>
        <TableHead>
          <TableRow>
            <TableCell>S. No.</TableCell>
            <TableCell>Item Name</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Rate</TableCell>
            <TableCell>Discount</TableCell>
            <TableCell>Final Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {basket?.products.map((item, index) => (
            <TableRow key={item.productId}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>₹{item.price}</TableCell>
              <TableCell>₹{item.discount}</TableCell>
              <TableCell>₹{item.rowTotal}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={5} align="right"><strong>Total</strong></TableCell>
            <TableCell><strong>₹{basket?.total}</strong></TableCell>
          </TableRow>
        </TableBody>
      </Table>)}

    </Box> )}
  </>
  );
};

export default MainPage;