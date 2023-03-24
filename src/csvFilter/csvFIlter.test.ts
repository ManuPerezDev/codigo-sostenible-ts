/**
 * 1.
 * Num _factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente\n1,02/05/2019,1008,810,19,,ACERLaptop,B76430134,
 * Num _factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente\n1,02/05/2019,1008,810,19,,ACERLaptop,B76430134,
 *
 * 2.
 * Num _factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente\n1,02/05/2019,1008,810,19,8,ACERLaptop,B76430134,
 * Num _factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente
 *
 * 3.
 * Num _factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente\n1,02/05/2019,1008,1008,19,,ACERLaptop,B76430134,
 * Num _factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente
 *
 * 4.
 * Num _factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente\n1,02/05/2019,1008,1008,19,,ACERLaptop,B76430134,45345666Y
 * Num _factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente
 *
 * 5.
 * Num _factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente\n1,02/05/2019,1008,1008,19,,ACERLaptop,B76430134,\n1,02/05/2019,1008,1008,19,,ACERLaptop,B76430134,
 * Num _factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente
 *
 * 6.
 * Empty list
 * Empty list
 *
 * 7.
 * 1,02/05/2019,1008,1008,19,,ACERLaptop,B76430134,45345666Y
 * throw Error('Missing headers.')
 *
 * 8.
 * Num _factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente\n1,02/05/2019,1008,810,19,,ACERLaptop,B76430134,\n2,02/05/2019,2008,1620,19,,MACLaptop,B76430134,
 * Num _factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente\n1,02/05/2019,1008,810,19,,ACERLaptop,B76430134,\n2,02/05/2019,2008,1620,19,,MACLaptop,B76430134,
 *
 */

function csvFiler(csv: string) {
  const [header, ...invoices] = csv.split('\n')

  const filteredInvoices = getFilteredInvoices(invoices)

  return [header, ...filteredInvoices].join('\n')
}

function getFilteredInvoices(invoices: string[]) {
  return invoices.reduce((acc, invoice) => {
    const invoiceFields = invoice.split(',')
    if (thereArePresentBothTaxes(invoiceFields)) {
      return acc
    }
    if(netIsWrong(invoiceFields)) {
      return acc
    }
    return [...acc, invoice]
  }, []);
}

function thereArePresentBothTaxes(invoiceFields: string[]) {
  const iva = invoiceFields[4]
  const igic = invoiceFields[5]
  return iva && igic;
}

function netIsWrong(invoiceFields: string[]) {
  const iva = invoiceFields[4]
  const igic = invoiceFields[5]
  const gross = Number(invoiceFields[2])
  const net = Number(invoiceFields[3])
  const presentTax = Number(iva || igic)
  return gross - (gross * (presentTax / 100)) !== net;
}

describe('CsvFilter should', () => {
  it('not filter a invoice without errors',  () => {
    const csv = 'Num _factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente\n1,02/05/2019,1008,816.48,19,,ACERLaptop,B76430134,';
    expect(csvFiler(csv)).toBe(csv)
  });

  it('filter an invoce if iva and igic are present at the same time', () => {
    const csv = 'Num _factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente\n1,02/05/2019,1008,816.48,19,8,ACERLaptop,B76430134,'

    const expectedFilteredCsv = 'Num _factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente';
    expect(csvFiler(csv)).toBe(expectedFilteredCsv)
  });

  it('filter and invoice when the net is wrong',  () => {
    const csv = 'Num _factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente\n1,02/05/2019,1008,1008,19,,ACERLaptop,B76430134,'

    const expectedFilteredCsv = 'Num _factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente';
    expect(csvFiler(csv)).toBe(expectedFilteredCsv)
  });
});
