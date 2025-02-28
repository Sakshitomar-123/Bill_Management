import React from "react";

const InvoiceTemplate = ({ bill, companyInfo, showPreview }) => {
    return (
      <div 
        style={{
          fontFamily: 'Arial, sans-serif',
          maxWidth: '800px',
          margin: '0 auto',
          padding: showPreview ? '20px' : '40px',
          border: showPreview ? '1px solid #ddd' : 'none',
          borderRadius: '8px',
          backgroundColor: 'white',
          boxShadow: showPreview ? '0 2px 10px rgba(0,0,0,0.1)' : 'none',
        }}
      >
        {/* Header Section */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
          <div>
            <h1 style={{ color: '#3498db', margin: '0 0 5px 0', fontSize: '28px' }}>INVOICE</h1>
            <div style={{ color: '#7f8c8d', fontWeight: 'bold' }}>#{bill.invoiceNumber || 'INV-2023-001'}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontWeight: 'bold', fontSize: '20px', color: '#2c3e50', marginBottom: '5px' }}>
              {companyInfo.name || 'Your Company Name'}
            </div>
            <div style={{ color: '#7f8c8d' }}>{companyInfo.address || '123 Business St, City, Country'}</div>
            <div style={{ color: '#7f8c8d' }}>{companyInfo.phone || '+1 234 567 890'}</div>
            <div style={{ color: '#7f8c8d' }}>{companyInfo.email || 'contact@yourcompany.com'}</div>
          </div>
        </div>
  
        {/* Client & Invoice Info Section */}
        <div 
          style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            marginBottom: '30px',
            padding: '20px',
            backgroundColor: '#f9f9f9',
            borderRadius: '6px'
          }}
        >
          <div>
            <div style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '10px', color: '#2c3e50' }}>BILL TO</div>
            <div style={{ fontWeight: 'bold', fontSize: '18px', marginBottom: '5px' }}>{bill.customerName}</div>
            <div style={{ color: '#7f8c8d', marginBottom: '3px' }}>{bill.customerAddress}</div>
            <div style={{ color: '#7f8c8d' }}>Phone: {bill.customerMobile}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ marginBottom: '8px' }}>
              <span style={{ fontWeight: 'bold', color: '#7f8c8d' }}>Invoice Date: </span>
              <span>{bill.billingDate}</span>
            </div>
            <div style={{ marginBottom: '8px' }}>
              <span style={{ fontWeight: 'bold', color: '#7f8c8d' }}>Due Date: </span>
              <span>{bill.dueDate || 'N/A'}</span>
            </div>
          </div>
        </div>
  
        {/* Products Table */}
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '30px' }}>
          <thead>
            <tr style={{ backgroundColor: '#3498db', color: 'white' }}>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #2980b9' }}>Item Description</th>
              <th style={{ padding: '12px', textAlign: 'center', borderBottom: '2px solid #2980b9' }}>Quantity</th>
              <th style={{ padding: '12px', textAlign: 'right', borderBottom: '2px solid #2980b9' }}>Unit Price</th>
              <th style={{ padding: '12px', textAlign: 'right', borderBottom: '2px solid #2980b9' }}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {bill.products.map((product, index) => (
              <tr key={index} style={{ borderBottom: '1px solid #ecf0f1' }}>
                <td style={{ padding: '12px', textAlign: 'left' }}>{product.name}</td>
                <td style={{ padding: '12px', textAlign: 'center' }}>{product.quantity}</td>
                <td style={{ padding: '12px', textAlign: 'right' }}>${parseFloat(product.price).toFixed(2)}</td>
                <td style={{ padding: '12px', textAlign: 'right' }}>${product.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
  
        {/* Totals Section */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '30px' }}>
          <div style={{ width: '300px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
              <div style={{ fontWeight: 'bold', color: '#7f8c8d' }}>Subtotal:</div>
              <div>${bill.subTotal.toFixed(2)}</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
              <div style={{ fontWeight: 'bold', color: '#7f8c8d' }}>Tax ({bill.taxPercentage}%):</div>
              <div>${bill.taxAmount.toFixed(2)}</div>
            </div>
            <div 
              style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                padding: '15px 0',
                marginTop: '8px',
                borderTop: '2px solid #3498db',
                fontWeight: 'bold',
                fontSize: '18px'
              }}
            >
              <div>Total:</div>
              <div>${bill.total.toFixed(2)}</div>
            </div>
          </div>
        </div>
  
        {/* Notes Section */}
        {bill.notes && (
          <div 
            style={{ 
              padding: '20px', 
              backgroundColor: '#f9f9f9', 
              borderRadius: '6px',
              marginBottom: '30px'
            }}
          >
            <div style={{ fontWeight: 'bold', marginBottom: '10px', color: '#2c3e50' }}>Notes</div>
            <div style={{ color: '#7f8c8d' }}>{bill.notes}</div>
          </div>
        )}
  
        {/* Footer */}
        <div style={{ textAlign: 'center', marginTop: '40px', color: '#7f8c8d', borderTop: '1px solid #ecf0f1', paddingTop: '20px' }}>
          <div style={{ marginBottom: '5px' }}>Thank you for your business!</div>
          <div>{companyInfo.website || 'www.yourcompany.com'}</div>
        </div>
      </div>
    );
  };
export default InvoiceTemplate;  