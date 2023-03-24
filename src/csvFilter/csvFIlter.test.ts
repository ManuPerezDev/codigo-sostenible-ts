/**
 * 1.
 * Num_factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente\n1,02/05/2019,1008,816.48,19,,ACERLaptop,B76430134,
 * Num_factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente\n1,02/05/2019,1008,816.48,19,,ACERLaptop,B76430134,
 *
 * 2.
 * Num_factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente\n1,02/05/2019,1008,816.48,19,8,ACERLaptop,B76430134,
 * Num_factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente
 *
 * 3.
 * Num_factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente\n1,02/05/2019,1008,1008,19,,ACERLaptop,B76430134,
 * Num_factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente
 *
 * 4.
 * Num_factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente\n1,02/05/2019,1008,816.48,19,,ACERLaptop,B76430134,45345666Y
 * Num_factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente
 *
 * 5.
 * Num_factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente\n1,02/05/2019,1008,816.48,19,,ACERLaptop,B76430134,\n1,02/05/2019,1008,1008,19,,ACERLaptop,B76430134,
 * Num_factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente
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
 * Num_factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente\n1,02/05/2019,1008,810,19,,ACERLaptop,B76430134,\n2,02/05/2019,2008,1620,19,,MACLaptop,B76430134,
 * Num_factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente\n1,02/05/2019,1008,810,19,,ACERLaptop,B76430134,\n2,02/05/2019,2008,1620,19,,MACLaptop,B76430134,
 *
 */

function csvFilter(csv: string) {
  if(doesNotHaveHeaders(csv)) {
    throw Error('Missing headers.')
  }

  const [header, ...invoices] = csv.split('\n')

  const filteredInvoices = getFilteredInvoices(invoices)

  return [header, ...filteredInvoices].join('\n')
}

function doesNotHaveHeaders(csv: string) {
  return !csv.includes('Num_factura')
}


function getFilteredInvoices(invoices: string[]) {

  const filteredInvoices = invoices.reduce((acc, invoice) => {
    const invoiceFields = invoice.split(',')
    if (thereArePresentBothTaxes(invoiceFields)) {
      return acc
    }
    if(netIsWrong(invoiceFields)) {
      return acc
    }
    if(thereArePresentBothIdentifications(invoiceFields)) {
      return acc
    }
    return [...acc, invoice]
  }, []);

  return removeDuplicates(filteredInvoices)
}

function removeDuplicates(filteredInvoices: string[]) {
  const invoicesCounter = {}
  filteredInvoices.forEach(invoice => {
    const invoiceFields = invoice.split(',')
    const invoiceId = invoiceFields[0]
    if(invoicesCounter[invoiceId]) {
      invoicesCounter[invoiceId] += 1
    } else {
      invoicesCounter[invoiceId] = 1
    }
  })

  return filteredInvoices.reduce((acc, invoice) => {
    const invoiceFields = invoice.split(',')
    const invoiceId = invoiceFields[0]
    if(invoicesCounter[invoiceId] >= 2) {
      return acc.filter(invoice => invoice[0] !== invoiceId)
    }
    return acc
  }, filteredInvoices)
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

function thereArePresentBothIdentifications(invoiceFields: string[]) {
  const CIF = invoiceFields[7]
  const NIF = invoiceFields[8]
  return CIF && NIF
}

describe('CsvFilter should', () => {
  it('not filter a invoice without errors',  () => {
    const csv = 'Num_factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente\n1,02/05/2019,1008,816.48,19,,ACERLaptop,B76430134,';
    expect(csvFilter(csv)).toBe(csv)
  });

  it('not filter a invoice without errors with multiple lines',  () => {
    const csv = 'Num_factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente\n1,02/05/2019,1008,816.48,19,,ACERLaptop,B76430134,\n2,02/05/2019,1008,816.48,19,,MACLaptop,B76430134,';
    expect(csvFilter(csv)).toBe(csv)
  });

  it('filter an invoce if iva and igic are present at the same time', () => {
    const csv = 'Num_factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente\n1,02/05/2019,1008,816.48,19,8,ACERLaptop,B76430134,'

    const expectedFilteredCsv = 'Num_factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente';
    expect(csvFilter(csv)).toBe(expectedFilteredCsv)
  });

  it('filter and invoice when the net is wrong',  () => {
    const csv = 'Num_factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente\n1,02/05/2019,1008,1008,19,,ACERLaptop,B76430134,'

    const expectedFilteredCsv = 'Num_factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente';
    expect(csvFilter(csv)).toBe(expectedFilteredCsv)
  });

  it('filter and invoice when are present CIF and NIF at the same time',  () => {
    const csv = 'Num_factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente\n1,02/05/2019,1008,816.48,19,,ACERLaptop,B76430134,45345666Y'

    const expectedFilteredCsv = 'Num_factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente';
    expect(csvFilter(csv)).toBe(expectedFilteredCsv)
  });

  it('filter the invoices which have the same identification',  () => {
    const csv = 'Num_factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente\n1,02/05/2019,1008,816.48,19,,ACERLaptop,B76430134,\n1,02/05/2019,1008,816.48,19,,MacLaptop,B76430134,'

    const expectedFilteredCsv = 'Num_factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente';
    expect(csvFilter(csv)).toBe(expectedFilteredCsv)
  });

  it('send an error if there is no headers',  () => {
    expect(() => csvFilter('1,02/05/2019,1008,1008,19,,ACERLaptop,B76430134,45345666Y')).toThrowError('Missing headers.')
  });
});
