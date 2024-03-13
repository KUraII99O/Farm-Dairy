import React, { createContext, useState, useContext } from "react";

export const SaleListContext = createContext();

export const SaleListProvider = ({ children }) => {
  const [sales, setSales] = useState([
    {
      id: 1,
      invoice: "INV001",
      date: "2024-03-01",
      customerName: "John Doe",
      customerPhone: "123-456-7890",
      customerEmail: "john@example.com",
      address: "123 Main St, City, Country",
      totalPrice: 500,
      totalPaid: 300,
      due: 200,
      note: "Payment pending for this invoice.",
      information: {
        image: "cow1.jpg",
        cowNumber: "Cow001",
        stallNo: "C3",
        gender: "Female",
        weight: 300,
        height: 55
      }
    },
    {
      id: 2,
      invoice: "INV001",
      date: "2024-03-01",
      customerName: "John Doe",
      customerPhone: "123-456-7890",
      customerEmail: "john@example.com",
      address: "123 Main St, City, Country",
      totalPrice: 500,
      totalPaid: 300,
      due: 200,
      note: "Payment pending for this invoice.",
      information: {
        image: "cow1.jpg",
        cowNumber: "Cow001",
        stallNo: "C3",
        gender: "Female",
        weight: 300,
        height: 55
      }
    },
    {
      id: 3,
      invoice: "INV001",
      date: "2024-03-01",
      customerName: "John Doe",
      customerPhone: "123-456-7890",
      customerEmail: "john@example.com",
      address: "123 Main St, City, Country",
      totalPrice: 500,
      totalPaid: 300,
      due: 200,
      note: "Payment pending for this invoice.",
      information: {
        image: "cow1.jpg",
        cowNumber: "Cow001",
        stallNo: "C3",
        gender: "Female",
        weight: 300,
        height: 55
      }
    },
    {
      id: 4,
      invoice: "INV001",
      date: "2024-03-01",
      customerName: "John Doe",
      customerPhone: "123-456-7890",
      customerEmail: "john@example.com",
      address: "123 Main St, City, Country",
      totalPrice: 500,
      totalPaid: 300,
      due: 200,
      note: "Payment pending for this invoice.",
      information: {
        image: "cow1.jpg",
        cowNumber: "Cow001",
        stallNo: "C3",
        gender: "Female",
        weight: 300,
        height: 55
      }
    },
    {
      id: 5,
      invoice: "INV001",
      date: "2024-03-01",
      customerName: "John Doe",
      customerPhone: "123-456-7890",
      customerEmail: "john@example.com",
      address: "123 Main St, City, Country",
      totalPrice: 500,
      totalPaid: 300,
      due: 200,
      note: "Payment pending for this invoice.",
      information: {
        image: "cow1.jpg",
        cowNumber: "Cow001",
        stallNo: "C3",
        gender: "Female",
        weight: 300,
        height: 55
      }
    },
    {
      id: 6,
      invoice: "INV001",
      date: "2024-03-01",
      customerName: "John Doe",
      customerPhone: "123-456-7890",
      customerEmail: "john@example.com",
      address: "123 Main St, City, Country",
      totalPrice: 500,
      totalPaid: 300,
      due: 200,
      note: "Payment pending for this invoice.",
      information: {
        image: "cow1.jpg",
        cowNumber: "Cow001",
        stallNo: "C3",
        gender: "Female",
        weight: 300,
        height: 55
      }
    },
    {
      id: 7,
      invoice: "INV001",
      date: "2024-03-01",
      customerName: "John Doe",
      customerPhone: "123-456-7890",
      customerEmail: "john@example.com",
      address: "123 Main St, City, Country",
      totalPrice: 500,
      totalPaid: 300,
      due: 200,
      note: "Payment pending for this invoice.",
      information: {
        image: "cow1.jpg",
        cowNumber: "Cow001",
        stallNo: "C3",
        gender: "Female",
        weight: 300,
        height: 55
      }
    },
    // Add more sales as needed
  ]);

  const addSale = (newSale) => {
    setSales([...sales, newSale]);
  };

  const deleteSale = (id) => {
    const updatedSales = sales.filter((sale) => sale.id !== id);
    setSales(updatedSales);
  };

  const editSale = (id, updatedSale) => {
    const updatedSales = sales.map((sale) =>
      sale.id === id ? { ...sale, ...updatedSale } : sale
    );
    setSales(updatedSales);
  };

  const getSaleById = (id) => {
    return sales.find((sale) => sale.id === id);
  };

  const value = {
    sales,
    addSale,
    deleteSale,
    editSale,
    getSaleById,
  };

  return (
    <SaleListContext.Provider value={value}>
      {children}
    </SaleListContext.Provider>
  );
};

export const useSaleList = () => {
  const context = useContext(SaleListContext);
  if (!context) {
    throw new Error("useSaleList must be used within a SaleListProvider");
  }
  return context;
};
