import React, { useState, useEffect } from 'react'
import PaymentForm from '../../component/Payment'

const PaymentPage = () => {
  const [invoice, setInvoice] = useState(null);

  const fetchInvoices = async () => {
    try {
      const loggedInUser = localStorage.getItem("loggedInUser");
      if (!loggedInUser) {
        throw new Error("User not logged in");
      }

      const user = JSON.parse(loggedInUser);
      if (!user || !user.id) {
        throw new Error("User ID not found");
      }

      console.log(`Fetching invoices for user ID: ${user.id}`);
      const response = await fetch(
        `http://localhost:3000/users/${user.id}/invoices`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch invoices");
      }
      const invoiceData = await response.json();
      console.log("Fetched invoices:", invoiceData);
      setInvoice(invoiceData[0]); // Assuming you want to display the first invoice
    } catch (error) {
      console.error("Error fetching invoices:", error);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  // If invoice data is not yet available, show a loading message
  if (!invoice) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <PaymentForm invoice={invoice} onPay={(invoiceId) => console.log(`Paid invoice ${invoiceId}`)} />
    </div>
  )
}

export default PaymentPage;
