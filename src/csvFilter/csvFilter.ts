export function csvFilter(csv: string) {
  if (doesNotHaveHeaders(csv)) {
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
