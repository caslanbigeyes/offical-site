import React, { useState, useEffect, useCallback } from 'react';
import { getCertificateInfo } from '@/api'
import styles from './index.module.less';

const SearchFilters = ({ handleSearch, extList = [] }) => {
  const [features, setFeatures] = useState({
    customizable: false,
    paidSamples: false,
  });
  const [price, setPrice] = useState({ min: '', max: '' });
  const [minOrder, setMinOrder] = useState('');
  const [supplierSearch, setSupplierSearch] = useState('');
  const [managementSearch, setManagementSearch] = useState('');
  const [productSearch, setProductSearch] = useState('');
  const [suppliers, setSuppliers] = useState([{ countryName: '', code: '' }])
  const managementCerts = ['ISO', 'IATF6949'];
  const productCerts = ['CE', 'EN ISO 12100', 'EAC', '2006/42/EC', 'ROHS'];

  const [selectedSuppliers, setSelectedSuppliers] = useState([]);
  const [selectedManagementCerts, setSelectedManagementCerts] = useState([]);
  const [selectedProductCerts, setSelectedProductCerts] = useState([]);

  useEffect(() => {
    if (Array.isArray(extList) && extList.length) {
      setSuppliers(extList)
    } else {
      setSuppliers([])
    }
  }, [])


  const handleCheckboxChange = useCallback(
    (setSelected, selected, value, type) => {

      const isSelected = selected.includes(value);
      const newSelected = isSelected
        ? selected.filter(item => item !== value)
        : [...selected, value];

      setSelected(newSelected);

      if (type === 'city') {
        handleSearch({
          cityCodes: newSelected
        });
      }

    },
    [selectedSuppliers.length, setSelectedSuppliers],
  )




  const toggleFeature = (feature) => {
    setFeatures({ ...features, [feature]: !features[feature] });
  };

  const handleCertChange = (certType, cert) => {
    const certState = certType === 'management' ? managementCerts : productCerts;
    const setCertState = certType === 'management' ? setManagementCerts : setProductCerts;

    if (certState.includes(cert)) {
      setCertState(certState.filter(c => c !== cert));
    } else {
      setCertState([...certState, cert]);
    }
  };

  const handleSubmit = (type, e) => {
    if (type === 'range') {
      handleSearch({
        minPrice: price.min,
        maxPrice: price.max,
      })
    } else {
      handleSearch({
        deliveryNum: minOrder,
      })
    }
  }



  return (
    <div className={styles.filters}>
      <h3>Filters</h3>

      <div className={styles.section}>
        <h4>Product features</h4>
        <label>
          <input
            type="checkbox"
            checked={features.customizable}
            onChange={() => toggleFeature('customizable')}
          />
          Customizable
        </label>
        <label>
          <input
            type="checkbox"
            checked={features.paidSamples}
            onChange={() => toggleFeature('paidSamples')}
          />
          Paid samples
        </label>
      </div>

      <div className={styles.section}>
        <h4 className={styles.subTitle}>Price</h4>
        <div className={styles.priceChoose}>
          <input
            // type="number"
            placeholder="Min."
            value={price.min}
            className={styles.inpChoosePrice}
            onChange={(e) => {
              const value = parseInt(e.target.value, 10);
              if (value > 0 || e.target.value === '') {
                setPrice({ ...price, min: e.target.value })
              }
            }
            }
          />
          <span className={styles.dot}>   {'-'}</span>
          <input
            // type="number"
            placeholder="Max."
            value={price.max}
            className={styles.inpChoosePrice}
            onChange={(e) => {
              const value = parseInt(e.target.value, 10);
              if (value > 0 || e.target.value === '') {
                setPrice({ ...price, max: e.target.value })
              }
            }
            }
          />
          <button className={styles.priceOk} onClick={() => handleSubmit('range')}>OK</button>
        </div>
      </div>

      <div className={styles.section}>
        <h4 className={styles.subTitle}>Min. order</h4>
        <div className={styles.priceChoose}>
          <input
            // type="number"
            placeholder="Min. order"
            value={minOrder}
            className={styles.inpChoose}
            onChange={(e) => {
              const value = parseInt(e.target.value, 10);
              if (value > 0 || e.target.value === '') {
                setMinOrder(e.target.value);
              }
            }}
          />
          <button className={styles.priceOk} onClick={() => handleSubmit()}>OK</button>
        </div>
      </div>

      {extList.length ? <div className={styles.section}>
        <h4 className={styles.subTitle}>Supplier country/region</h4>
        <input
          type="text"
          placeholder="Search"
          value={supplierSearch}
          className={styles.inpSearch}
          onChange={(e) => setSupplierSearch(e.target.value)}
        />
        <div className={styles.dropdown}>
          {suppliers
            .filter(supplier => supplier.countryName && supplier.countryName.toLowerCase().includes(supplierSearch.toLowerCase()))
            .map((supplier, index) => (
              <label key={index}>
                <input
                  type="checkbox"
                  checked={selectedSuppliers.includes(supplier.code)}
                  onChange={() => handleCheckboxChange(setSelectedSuppliers, selectedSuppliers, supplier.code, 'city')}
                />
                {<img style={{ marginRight: '2px' }} alt={supplier.countryName} width={16} height={12} src={supplier?.nationalFlagUrl || '/china.png'} />}  {supplier.countryName}
              </label>
            ))}
        </div>
      </div> : null}
      <div className={styles.section}>
        <h4 className={styles.subTitle}>Management certifications</h4>
        <input
          type="text"
          placeholder="Search"
          value={managementSearch}
          className={styles.inpSearch}
          onChange={(e) => setManagementSearch(e.target.value)}
        />
        <div className={styles.dropdown}>
          {managementCerts
            .filter(cert => cert.toLowerCase().includes(managementSearch.toLowerCase()))
            .map((cert, index) => (
              <label key={index}>
                <input
                  type="checkbox"
                  checked={selectedManagementCerts.includes(cert)}
                  onChange={() => handleCheckboxChange(setSelectedManagementCerts, selectedManagementCerts, cert)}
                />
                {cert}
              </label>
            ))}
        </div>
      </div>

      <div className={styles.section}>
        <h4 className={styles.subTitle}>Product certifications</h4>
        <input
          type="text"
          placeholder="Search"
          value={productSearch}
          className={styles.inpSearch}
          onChange={(e) => setProductSearch(e.target.value)}
        />
        <div className={styles.dropdown}>
          {productCerts
            .filter(cert => cert.toLowerCase().includes(productSearch.toLowerCase()))
            .map((cert, index) => (
              <label key={index}>
                <input
                  type="checkbox"
                  checked={selectedProductCerts.includes(cert)}
                  onChange={() => handleCheckboxChange(setSelectedProductCerts, selectedProductCerts, cert)}
                />
                {cert}
              </label>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
