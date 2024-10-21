

const InvoiceForm = () => {
    return (
        <div style={{ width: '100%', maxWidth: '700px', margin: '0 auto', border: '1px solid #000', padding: '20px', fontFamily: '"DM Sans", sans-serif'}}>
      
      {/* Header Section */}
      <div style={{ textAlign: 'center', borderBottom: '2px solid #000', paddingBottom: '10px' }}>
        <div style={{display:'flex', width:'70%', margin:'auto'}}>
            <span style={{width:'100px', textAlign:'right', fontWeight:'bold', fontSize:'13px', padding:'0 4px'}}>New</span>
            <h2 style={{ margin: 'auto', position:'relative',textAlign:'left',width:"90%" }}> AL-ARAFAT OPTICAL</h2>
        </div>
        <p style={{ fontSize: '12px' }}>
        
          Minhaz Complex (Ground Floor), 12-Jamal Khan Road, Chittagong<br />
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
        <div style={{ width: '48%' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }} border="1">
            <thead>
              <tr>
                <th colSpan="3" style={{ padding: '10px', textAlign: 'center' }}>Right Eye</th>
              </tr>
              <tr>
                <th style={{ padding: '10px', }}>Sph.</th>
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
              <td style={{ padding: '10px', fontWeight:'bold'}}>SUBTOTAL</td>
              <td style={{ padding: '10px' }}>___________</td>
            </tr>
            <tr>
              <td style={{ padding: '10px',  fontWeight:'bold' }}>DISCOUNT</td>
              <td style={{ padding: '10px' }}>___________</td>
            </tr>
            <tr>
              <td style={{ padding: '10px', fontWeight:'bold' }}>ADVANCE</td>
              <td style={{ padding: '10px' }}>___________</td>
            </tr>
            <tr>
              <td style={{ padding: '10px', fontWeight:'bold' }}>DUE</td>
              <td style={{ padding: '10px' }}>___________</td>
            </tr>
            <tr>
              <td style={{ padding: '10px', fontWeight:'bold' }}>TOTAL</td>
              <td style={{ padding: '10px' }}>___________</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Footer Section */}
      <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '10px' }}>
        <p>বিঃদ্রঃ ডেলিভারি বিকাল ৫ টার পর। ১৫ দিনের মধ্যে ডেলিভারি না নিলে পরে হারানো গেলে অথবা পুরানো জিনিস মেরামতের সময় নষ্ট হলে কোম্পানি দায়ী থাকবে না।</p>
      </div>
      <div style={{ marginTop: '10px', textAlign: 'center', fontSize: '12px', width:'100%', height:'30px', backgroundColor:'black', display:'flex', alignItems:'center', justifyContent:"space-between",color:'white', padding: '0 5px' }}>
            <p>Custoer Copy</p>
            <p>Any Complain: 01521-484359</p>
      </div>
    </div>
    );
};

export default InvoiceForm;