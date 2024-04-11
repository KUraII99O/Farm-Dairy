import React, { useState, useContext, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "../../Translator/Provider";
import { FaPrint, FaSave } from 'react-icons/fa'; // Importing icons

import ReactToPrint from 'react-to-print';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { SaleListContext } from "../provider";

const MilkSaleInvoice: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { CowSales } = useContext(SaleListContext);

  const isEditMode = !!id;
  const { translate, language } = useTranslation();

  const [formData, setFormData] = useState({
    id: "",
  customerName: "",
  customerPhone:"" ,
  customerEmail: "",
  address: "",
  totalPrice:"" ,
  totalPaid: "",
  due: "",
  note:"" ,
  collectedFrom: "",
  image: "",
  stallNo: "",
  cowNumber: "",
  gender:"" ,
  weight:"" ,
  height:"" ,

  });

  useEffect(() => {
    if (isEditMode) {
      const selectedMilkSale = CowSales.find(
        (CowSales) => CowSales.id === parseInt(id)
      );
      if (selectedMilkSale) {
        setFormData(selectedMilkSale);
      }
    }
  }, [id, isEditMode, CowSales]);

  const componentRef: any = useRef();

  const handleSaveAsPDF = () => {
    html2canvas(componentRef.current, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4'); // Specify page dimensions as per your requirements
      const imgWidth = pdf.internal.pageSize.getWidth();
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= imgHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= imgHeight;
      }

      pdf.save("invoice.pdf");
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="p-8 bg-white border w-4/5" ref={componentRef} style={{ direction: language === 'ar' ? 'rtl' : 'ltr' }}>
        <h2 className="text-2xl font-bold mb-4">
          {translate("milksaleinvoice")}
        </h2>
        <div className="flex justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">{translate("from")}:</h3>
            <p>KHAN DAIRY FARM</p>
            <p>{translate("branch")} - 01</p>
            <p>Uttara, Dhaka, Bangladesh</p>
            <p>{translate("email")}: akh01@gmail.com</p>
            <p>{translate("phone")}: 017865567610</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">{translate("to")}:</h3>
            <p>
              {translate("name")}: {formData.customerName}
            </p>
            <p>
              {translate("contact")}: {formData.customerPhone}
            </p>
            <p>
              {translate("email")}: {formData.customerEmail}
            </p>
            <p>
              {translate("address")}: {formData.address}
            </p>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-lg font-semibold">
            {translate("invoicenumber")}: {formData.id}
          </p>
        </div>

        {formData && (
          <table className="w-full border-collapse">
            <tbody>
              <tr className="border-b">
                <td className="py-2 px-4 font-semibold">
                  {translate("accountnumber")}:
                </td>
                <td className="py-2 px-4">{formData.stallNo}</td>
                <td className="py-2 px-4 font-semibold">
                  {translate("suppliers")}:
                </td>
                <td className="py-2 px-4">{formData.supplier}</td>
              </tr>

              <tr className="border-b">
                <td className="py-2 px-4 font-semibold">
                  {translate("liter")}:
                </td>
                <td className="py-2 px-4">{formData.gender}</td>
                <td className="py-2 px-4 font-semibold">
                  {translate("price")}/{translate("liter")}:
                </td>
                <td className="py-2 px-4">{formData.weight}</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-4 font-semibold">
                  {translate("total")}:
                </td>
                <td className="py-2 px-4">{formData.height}</td>
                <td className="py-2 px-4 font-semibold">
                  {translate("paid")}:
                </td>
                <td className="py-2 px-4">{formData.note}</td>
              </tr>
              <tr>
                <td className="py-2 px-4 font-semibold">{translate("due")}:</td>
                <td className="py-2 px-4" colSpan={3}>
                  {formData.due}
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
      <div className="flex justify-between w-4/5 mt-4">
        <div className="flex justify-between w-5/5 mt-4 ">
          <button onClick={handleSaveAsPDF} className="flex items-center px-4 py-2 rounded-lg bg-secondary text-white hover:bg-primary focus:outline-none ml-4">
            <FaSave className=" items-center" />
          </button>
          <ReactToPrint
            trigger={() => (
              <button className="flex items-center px-4 py-2 rounded-lg bg-secondary text-white hover:bg-primary focus:outline-none ml-4">
                <FaPrint className=" items-center " />
              </button>
            )}
            content={() => componentRef.current}
          />
        </div>
      </div>
    </div>
  );
};

export default MilkSaleInvoice;
