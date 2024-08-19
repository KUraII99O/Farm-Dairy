import React from "react";

interface Invoice {
  id: number;
  user: string;
  plan: string;
  price: string;
  features: {
    description: string;
    limitations: {
      [key: string]: number;
    };
  };
  startDate: string;
  dueDate: string;
  paymentStatus: string;
}

interface PaymentFormProps {
  invoice: Invoice | undefined; // Ensure invoice is optional
  onPay: (invoiceId: number) => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ invoice, onPay }) => {
  const handlePay = () => {
    if (invoice) {
      onPay(invoice.id);
    }
  };

  if (!invoice) {
    return <div>Loading...</div>; // Handle case where invoice is not available
  }

  return (
    <div className="w-full bg-gray-100 dark:bg-gray-950 min-h-screen flex flex-grow">
      <div className="bg-gray-100 hidden lg:flex flex-col justify-center items-center w-1/2">
        <div className="max-w-lg w-full m-auto px-6 py-6 sm:py-10">
          <div className="flex justify-between">
            <h3 className="text-lg lg:text-3xl font-medium">
            {invoice.plan} subscription
            </h3>
            <div className="text-lg lg:text-xl font-medium">${invoice.price}</div>
          </div>
          <div className="mt-2 text-gray-500 dark:text-gray-400 text-sm">
            ${invoice.price} billed every month
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-900 w-full lg:w-1/2 flex flex-col">
        <div className="max-w-lg w-full m-auto px-6 py-6 sm:py-10">
          <div className="mb-5">
            <label
              htmlFor="input-number"
              className="block text-sm font-medium mb-2 dark:text-white"
            >
              Card number
            </label>
            <input
              type="text"
              id="input-number"
              className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 placeholder-gray-300 dark:placeholder-gray-500 shadow-sm"
              placeholder="0000 0000 0000 0000"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
            <div className="mb-5">
              <label
                htmlFor="input-exp"
                className="block text-sm font-medium mb-2 dark:text-white"
              >
                Expiration
              </label>
              <input
                type="text"
                id="input-exp"
                className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 placeholder-gray-300 dark:placeholder-gray-500 shadow-sm"
                placeholder="MM/YY"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="input-exp"
                className="block text-sm font-medium mb-2 dark:text-white"
              >
                CVC
              </label>
              <input
                type="text"
                id="input-exp"
                className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 placeholder-gray-300 dark:placeholder-gray-500 shadow-sm"
                placeholder="CVC"
              />
            </div>
          </div>
          <div className="mb-5 text-xs text-gray-400 dark:text-gray-500">
            By providing your card information, you allow Company to charge your
            card for future payments in accordance with their terms.
          </div>
          <div className="mb-5">
            <label
              htmlFor="input-number"
              className="block text-sm font-medium mb-2 dark:text-white"
            >
              Cardholder name
            </label>
            <input
              type="text"
              id="input-number"
              className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 placeholder-gray-300 dark:placeholder-gray-500 shadow-sm"
              placeholder="John Doe"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="input-country"
              className="block text-sm font-medium mb-2 dark:text-white"
            >
              Billing address
            </label>
            <select
              id="input-country"
              className="py-3 px-4 block w-full border-gray-200 rounded-t-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 placeholder-gray-300 dark:placeholder-gray-500"
            >
              <option>Country</option>
            </select>
            <input
              type="text"
              id="input-zip"
              className="py-3 px-4 block w-full border-gray-200 rounded-b-lg border-t-0 text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 placeholder-gray-300 dark:placeholder-gray-500 shadow-sm"
              placeholder="Zip Code"
            />
          </div>
          <div className="mb-5">
            <div className="flex justify-between py-1 text-gray-700 dark:text-gray-200 font-medium">
              <div>Subtotal</div>
              <div>${invoice.price}</div>
            </div>
            <div className="flex justify-between py-1 text-gray-700 dark:text-gray-200 font-medium">
              <div>Total</div>
              <div>${invoice.price}</div>
            </div>
          </div>
          <button
            type="button"
            className="w-full py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all dark:focus:ring-offset-gray-800"
            onClick={handlePay}
          >
            Pay ${invoice.price}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;