import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import jsPDF from "jspdf";
import {
  updateCurrentBill,
  addProduct,
  updateProduct,
  removeProduct,
  saveBill,
} from "../store/slices/billSlice";
import SuccessModal from "./SuccessModal";
import {
  DownloadButton,
  SaveButton,
  ButtonsContainer,
  RemoveButton,
  TotalLabel,
  Container,
  Title,
  FormGroup,
  FormRow,
  FormColumn,
  Label,
  Input,
  ProductsTable,
  Th,
  Td,
  AddButton,
  TotalsContainer,
  TotalsTable,
  TotalValue,
} from "../assets/BillGenerator.styled";

function BillGenerator() {
  const dispatch = useDispatch();
  const billRef = useRef(null);
  const currentBill = useSelector((state) => state.bills.currentBill);
  const user = useSelector((state) => state.auth.user);

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateCurrentBill({ [name]: value }));
  };

  const handleProductChange = (id, field, value) => {
    dispatch(updateProduct({ id, field, value }));
  };

  const handleAddProduct = () => {
    dispatch(addProduct());
  };

  const handleRemoveProduct = (id) => {
    dispatch(removeProduct(id));
  };

  const handleSaveBill = () => {
    dispatch(saveBill());
    setShowSuccessModal(true);
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
  };

  const handleDownloadInvoice = () => {
    // Create a new PDF with jsPDF
    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const margin = 20;

    // Add invoice header
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(20);
    pdf.text("INVOICE", pageWidth / 2, margin, { align: "center" });

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(12);

    // Add company info (if needed)
    pdf.text("Bill Management Services", margin, margin + 10);
    pdf.text("Noida , sector-15 ,Up", margin, margin + 15);
    pdf.text(`${user.email}`, margin, margin + 20);

    // Add customer info
    pdf.setFontSize(14);
    pdf.setFont("helvetica", "bold");
    pdf.text("Bill To:", margin, margin + 30);

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(12);
    pdf.text(`Name: ${currentBill.customerName}`, margin, margin + 37);
    pdf.text(`Mobile: ${currentBill.customerMobile}`, margin, margin + 44);
    pdf.text(`Address: ${currentBill.customerAddress}`, margin, margin + 51);

    // Add invoice details
    pdf.setFont("helvetica", "bold");
    pdf.text(
      `Invoice Date: ${currentBill.billingDate.split('-').reverse().join('-')}`,
      pageWidth - margin,
      margin + 30,
      { align: "right" }
    );
    pdf.text(
      `Invoice Id: ${new Date().getTime()}`,
      pageWidth - margin,
      margin + 37,
      { align: "right" }
    );

    // Add products table
    const tableStartY = margin + 60;
    const tableColumns = [
      { header: "Product", width: 60 },
      { header: "Quantity", width: 30, align: "center" },
      { header: "Price", width: 40, align: "right" },
      { header: "Total", width: 40, align: "right" },
    ];

    // Calculate columns x position
    let xPos = margin;
    tableColumns.forEach((col) => {
      col.x = xPos;
      xPos += col.width;
    });

    // Draw table header
    pdf.setFillColor(124, 204, 124); // Medium green
    pdf.rect(margin, tableStartY, pageWidth - margin * 2, 8, "F");
    pdf.setFont("helvetica", "bold");

    tableColumns.forEach((col) => {
      if (col.align === "right") {
        pdf.text(col.header, col.x + col.width - 2, tableStartY + 6, {
          align: "right",
        });
      } else if (col.align === "center") {
        pdf.text(col.header, col.x + col.width / 2, tableStartY + 6, {
          align: "center",
        });
      } else {
        pdf.text(col.header, col.x + 2, tableStartY + 6);
      }
    });

    // Draw table content
    let y = tableStartY + 8;
    pdf.setFont("helvetica", "normal");

    currentBill.products.forEach((product, i) => {
      if (y > 250) {
        // Add new page if content exceeds page height
        pdf.addPage();
        y = margin;

        // Redraw header on new page
        pdf.setFillColor(240, 240, 240);
        pdf.rect(margin, y, pageWidth - margin * 2, 8, "F");
        pdf.setFont("helvetica", "bold");

        tableColumns.forEach((col) => {
          if (col.align === "right") {
            pdf.text(col.header, col.x + col.width - 2, y + 6, {
              align: "right",
            });
          } else if (col.align === "center") {
            pdf.text(col.header, col.x + col.width / 2, y + 6, {
              align: "center",
            });
          } else {
            pdf.text(col.header, col.x + 2, y + 6);
          }
        });

        y += 8;
        pdf.setFont("helvetica", "normal");
      }

      // Alternate row colors for better readability
      if (i % 2 === 1) {
        pdf.setFillColor(250, 250, 250);
        pdf.rect(margin, y, pageWidth - margin * 2, 8, "F");
      }

      // Product name
      pdf.text(
        product.name.length > 25
          ? product.name.substring(0, 25) + "..."
          : product.name,
        tableColumns[0].x + 2,
        y + 6
      );

      // Quantity
      pdf.text(
        product.quantity.toString(),
        tableColumns[1].x + tableColumns[1].width / 2,
        y + 6,
        { align: "center" }
      );

      // Price
      pdf.text(
        "$" + product.price.toFixed(2),
        tableColumns[2].x + tableColumns[2].width - 2,
        y + 6,
        { align: "right" }
      );

      // Total
      pdf.text(
        "$" + product.total.toFixed(2),
        tableColumns[3].x + tableColumns[3].width - 2,
        y + 6,
        { align: "right" }
      );

      y += 8;
    });

    // Draw line under table
    pdf.setDrawColor(220, 220, 220);
    pdf.line(margin, y, pageWidth - margin, y);

    // Add totals
    y += 10;
    const totalsWidth = 80;
    const totalsX = pageWidth - margin - totalsWidth;

    pdf.text("Subtotal:", totalsX, y);
    pdf.text("$" + currentBill.subTotal.toFixed(2), pageWidth - margin, y, {
      align: "right",
    });

    y += 7;
    pdf.text(`Tax (${currentBill.taxPercentage}%):`, totalsX, y);
    pdf.text("$" + currentBill.taxAmount.toFixed(2), pageWidth - margin, y, {
      align: "right",
    });

    y += 7;
    pdf.setFont("helvetica", "bold");
    pdf.text("Total:", totalsX, y);
    pdf.text("$" + currentBill.total.toFixed(2), pageWidth - margin, y, {
      align: "right",
    });

    // Add footer
    const footerY = pdf.internal.pageSize.getHeight() - 20;
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(10);
    pdf.text("Thank you for your business!", pageWidth / 2, footerY, {
      align: "center",
    });

    // Save the PDF
    pdf.save("invoice.pdf");
  };

  const isFormValid = () => {
    return (
      currentBill.customerName.trim() !== "" &&
      currentBill.customerMobile.trim() !== "" &&
      currentBill.customerAddress.trim() !== "" &&
      currentBill.billingDate.trim() !== "" &&
      currentBill.products.length > 0 &&
      currentBill.products.every(
        (p) => p.name.trim() !== "" && p.quantity > 0 && p.price > 0
      )
    );
  };

  return (
    <Container>
      <Title>Bill Generator</Title>

      <div ref={billRef}>
        <FormRow>
          <FormColumn>
            <FormGroup>
              <Label>Customer Name</Label>
              <Input
                type="text"
                name="customerName"
                value={currentBill.customerName}
                onChange={handleInputChange}
                placeholder="Enter customer name"
              />
            </FormGroup>
          </FormColumn>

          <FormColumn>
            <FormGroup>
              <Label>Customer Mobile Number</Label>
              <Input
                type="text"
                name="customerMobile"
                value={currentBill.customerMobile}
                onChange={handleInputChange}
                placeholder="Enter mobile number"
              />
            </FormGroup>
          </FormColumn>
        </FormRow>

        <FormRow>
          <FormColumn>
            <FormGroup>
              <Label>Customer Address</Label>
              <Input
                type="text"
                name="customerAddress"
                value={currentBill.customerAddress}
                onChange={handleInputChange}
                placeholder="Enter address"
              />
            </FormGroup>
          </FormColumn>

          <FormColumn>
            <FormGroup>
              <Label>Billing Date</Label>
              <Input
                type="date"
                name="billingDate"
                value={currentBill.billingDate}
                onChange={handleInputChange}
              />
            </FormGroup>
          </FormColumn>
        </FormRow>

        <FormGroup>
          <Label>Products</Label>
          <ProductsTable>
            <thead>
              <tr>
                <Th>Product Name</Th>
                <Th>Product Quantity</Th>
                <Th>Product Price</Th>
                <Th>Total Price</Th>
                <Th></Th>
              </tr>
            </thead>
            <tbody>
              {currentBill.products.map((product) => (
                <tr key={product.id}>
                  <Td>
                    <Input
                      type="text"
                      value={product.name}
                      onChange={(e) =>
                        handleProductChange(product.id, "name", e.target.value)
                      }
                      placeholder="Product name"
                    />
                  </Td>
                  <Td>
                    <Input
                      type="number"
                      value={product.quantity}
                      onChange={(e) =>
                        handleProductChange(
                          product.id,
                          "quantity",
                          parseFloat(e.target.value) || 0
                        )
                      }
                      placeholder="Qty"
                      min="1"
                    />
                  </Td>
                  <Td>
                    <Input
                      type="number"
                      value={product.price}
                      onChange={(e) =>
                        handleProductChange(
                          product.id,
                          "price",
                          parseFloat(e.target.value) || 0
                        )
                      }
                      placeholder="Price"
                      min="0"
                      step="0.01"
                    />
                  </Td>
                  <Td>${product.total.toFixed(2)}</Td>
                  <Td>
                    {currentBill.products.length > 1 && (
                      <RemoveButton
                        onClick={() => handleRemoveProduct(product.id)}
                      >
                        Remove
                      </RemoveButton>
                    )}
                  </Td>
                </tr>
              ))}
            </tbody>
          </ProductsTable>
        </FormGroup>

        <AddButton onClick={handleAddProduct}>+ Add Field</AddButton>

        <TotalsContainer>
          <TotalsTable>
            <tbody>
              <tr>
                <TotalLabel>Sub Total:</TotalLabel>
                <TotalValue>
                  <Input
                    type="text"
                    value={`$${currentBill.subTotal.toFixed(2)}`}
                    readOnly
                  />
                </TotalValue>
              </tr>
              <tr>
                <TotalLabel>Tax ({currentBill.taxPercentage}%):</TotalLabel>
                <TotalValue>
                  <Input
                    type="text"
                    value={`$${currentBill.taxAmount.toFixed(2)}`}
                    readOnly
                  />
                </TotalValue>
              </tr>
              <tr>
                <TotalLabel>Total:</TotalLabel>
                <TotalValue>
                  <Input
                    type="text"
                    value={`$${currentBill.total.toFixed(2)}`}
                    readOnly
                  />
                </TotalValue>
              </tr>
            </tbody>
          </TotalsTable>
        </TotalsContainer>
      </div>

      <ButtonsContainer>
        <SaveButton onClick={handleSaveBill} disabled={!isFormValid()}>
          Save Invoice
        </SaveButton>

        <DownloadButton onClick={handleDownloadInvoice}>
          Download Invoice
        </DownloadButton>
      </ButtonsContainer>

      {showSuccessModal && <SuccessModal onClose={handleCloseModal} />}
    </Container>
  );
}

export default BillGenerator;
