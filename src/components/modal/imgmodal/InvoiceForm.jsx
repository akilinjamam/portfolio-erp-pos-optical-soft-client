

const InvoiceForm = () => {
    return (
        <div style={{ width: '100%', maxWidth: '700px', margin: '0 auto', border: '1px solid #000', padding: '20px', fontFamily: '"DM Sans", sans-serif' }}>
      
      {/* Header Section */}
      <div style={{ textAlign: 'center', borderBottom: '2px solid #000', paddingBottom: '10px' }}>
        <h1 style={{ margin: 0 }}>AL-ARAFAT OPTICAL</h1>
        <p style={{ fontSize: '12px' }}>
          মিনহাজ কমপ্লেক্স (গ্রাউন্ড ফ্লোর), ১২-জামালখান রোড, চট্টগ্রাম<br />
          Cell: 01841 631667, 01729 435335
        </p>
      </div>

      {/* Invoice Details */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        <div>
          <p><strong>Order Date:</strong> ___________</p>
          <p><strong>Name:</strong> ___________</p>
          <p><strong>Address:</strong> ___________</p>
        </div>
        <div>
          <p><strong>Invoice serial:</strong> 000001</p>
          <p><strong>Mobile:</strong> ___________</p>
          <p><strong>Delivery Date:</strong> ___________</p>
        </div>
      </div>

      {/* Product Table */}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }} border="1">
        <thead>
          <tr>
            <th style={{ padding: '10px' }}>Product</th>
            <th style={{ padding: '10px' }}>Frame Details</th>
            <th style={{ padding: '10px' }}>Quantity</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ padding: '10px', height: '100px' }}></td>
            <td style={{ padding: '10px' }}></td>
            <td style={{ padding: '10px' }}></td>
          </tr>
        </tbody>
      </table>

      {/* Eye Prescription Section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        <div style={{ width: '48%' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }} border="1">
            <thead>
              <tr>
                <th colSpan="3" style={{ padding: '10px', textAlign: 'center' }}>Right Eye</th>
              </tr>
              <tr>
                <th style={{ padding: '10px' }}>Sph.</th>
                <th style={{ padding: '10px' }}>Cyl.</th>
                <th style={{ padding: '10px' }}>Axis</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '10px' }}></td>
                <td style={{ padding: '10px' }}></td>
                <td style={{ padding: '10px' }}></td>
              </tr>
              <tr>
                <td colSpan="3" style={{ padding: '10px' }}><strong>Near Add:</strong> ___________</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div style={{ width: '48%' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }} border="1">
            <thead>
              <tr>
                <th colSpan="3" style={{ padding: '10px', textAlign: 'center' }}>Left Eye</th>
              </tr>
              <tr>
                <th style={{ padding: '10px' }}>Sph.</th>
                <th style={{ padding: '10px' }}>Cyl.</th>
                <th style={{ padding: '10px' }}>Axis</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '10px' }}></td>
                <td style={{ padding: '10px' }}></td>
                <td style={{ padding: '10px' }}></td>
              </tr>
              <tr>
                <td colSpan="3" style={{ padding: '10px' }}><strong>Near Add:</strong> ___________</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Instruction Section */}
      <div style={{ marginTop: '20px' }}>
        <h3>Instruction</h3>
        <div style={{ border: '1px solid #000', padding: '10px', height: '100px' }}></div>
      </div>

      {/* Total Section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        <table style={{ width: '30%', borderCollapse: 'collapse' }} border="1">
          <tbody>
            <tr>
              <td style={{ padding: '10px', backgroundColor:'lightgray' }}>SUBTOTAL</td>
              <td style={{ padding: '10px' }}>___________</td>
            </tr>
            <tr>
              <td style={{ padding: '10px' }}>DISCOUNT</td>
              <td style={{ padding: '10px' }}>___________</td>
            </tr>
            <tr>
              <td style={{ padding: '10px' }}>ADVANCE</td>
              <td style={{ padding: '10px' }}>___________</td>
            </tr>
            <tr>
              <td style={{ padding: '10px' }}>DUE</td>
              <td style={{ padding: '10px' }}>___________</td>
            </tr>
            <tr>
              <td style={{ padding: '10px' }}>TOTAL</td>
              <td style={{ padding: '10px' }}>___________</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Footer Section */}
      <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '12px' }}>
        <p>নির্দেশ: ডেলিভারী বিক্রয় ও টাকা পরিশোধের ১৫ দিনের মধ্যে না হলে পণ্য হারানোর বা ক্ষতির দায়িত্ব নেই।</p>
        <p style={{ borderTop: '1px solid #000', paddingTop: '10px' }}>Customer Copy</p>
      </div>
    </div>
    );
};

export default InvoiceForm;