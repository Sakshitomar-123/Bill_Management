import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  customers: [],
  currentBill: {
    customerName: '',
    customerMobile: '',
    customerAddress: '',
    billingDate: '',
    products: [
      {
        id: 1,
        name: '',
        quantity: 0,
        price: 0,
        total: 0
      }
    ],
    subTotal: 0,
    taxPercentage: 13,
    taxAmount: 0,
    total: 0
  }
};

const billSlice = createSlice({
  name: 'bills',
  initialState,
  reducers: {
    updateCurrentBill: (state, action) => {
      state.currentBill = { ...state.currentBill, ...action.payload };
    },
    addProduct: (state) => {
      const newId = state.currentBill.products.length > 0 
        ? Math.max(...state.currentBill.products.map(p => p.id)) + 1 
        : 1;
      
      state.currentBill.products.push({
        id: newId,
        name: '',
        quantity: 0,
        price: 0,
        total: 0
      });
    },
    updateProduct: (state, action) => {
      const { id, field, value } = action.payload;
      const productIndex = state.currentBill.products.findIndex(p => p.id === id);
      
      if (productIndex !== -1) {
        state.currentBill.products[productIndex][field] = value;
        
        // Update total for this product
        if (field === 'quantity' || field === 'price') {
          const product = state.currentBill.products[productIndex];
          state.currentBill.products[productIndex].total = product.quantity * product.price;
        }
        
        // Recalculate subtotal, tax and total
        const subTotal = state.currentBill.products.reduce((sum, product) => sum + product.total, 0);
        const taxAmount = (subTotal * state.currentBill.taxPercentage) / 100;
        
        state.currentBill.subTotal = subTotal;
        state.currentBill.taxAmount = taxAmount;
        state.currentBill.total = subTotal + taxAmount;
      }
    },
    removeProduct: (state, action) => {
      const id = action.payload;
      state.currentBill.products = state.currentBill.products.filter(p => p.id !== id);
      
      // Recalculate subtotal, tax and total
      const subTotal = state.currentBill.products.reduce((sum, product) => sum + product.total, 0);
      const taxAmount = (subTotal * state.currentBill.taxPercentage) / 100;
      
      state.currentBill.subTotal = subTotal;
      state.currentBill.taxAmount = taxAmount;
      state.currentBill.total = subTotal + taxAmount;
    },
    saveBill: (state) => {
      // Generate unique ID for the bill
      const billId = Date.now().toString();
      
      // Add the current bill to customers array
      state.customers.push({
        id: billId,
        customerName: state.currentBill.customerName,
        customerMobile: state.currentBill.customerMobile,
        customerAddress: state.currentBill.customerAddress,
        billingDate: state.currentBill.billingDate,
        productQuantity: state.currentBill.products.reduce((sum, product) => sum + Number(product.quantity), 0),
        billingPrice: state.currentBill.total
      });
      
      // Reset current bill to initial state except tax percentage
      const taxPercentage = state.currentBill.taxPercentage;
      state.currentBill = {
        ...initialState.currentBill,
        taxPercentage
      };
    },
    updateTaxPercentage: (state, action) => {
      state.currentBill.taxPercentage = action.payload;
      
      // Recalculate tax amount and total
      const taxAmount = (state.currentBill.subTotal * state.currentBill.taxPercentage) / 100;
      state.currentBill.taxAmount = taxAmount;
      state.currentBill.total = state.currentBill.subTotal + taxAmount;
    }
  }
});

export const { 
  updateCurrentBill, 
  addProduct, 
  updateProduct, 
  removeProduct, 
  saveBill,
  updateTaxPercentage
} = billSlice.actions;

export default billSlice.reducer;