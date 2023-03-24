export class CsvFilter {
  run(csv: string) {
    if (this.doesNotHaveHeaders(csv)) {
      throw Error('Missing headers.')
    }

    const [header, ...invoices] = csv.split('\n')

    const filteredInvoices = this.getFilteredInvoices(invoices)

    return [header, ...filteredInvoices].join('\n')
  }


  private doesNotHaveHeaders(csv: string) {
    return !csv.includes('Num_factura')
  }


  private getFilteredInvoices(invoices: string[]) {

    const filteredInvoices = invoices.reduce((acc, invoice) => {
      const invoiceFields = invoice.split(',')
      if (this.thereArePresentBothTaxes(invoiceFields)) {
        return acc
      }
      if(this.netIsWrong(invoiceFields)) {
        return acc
      }
      if(this.thereArePresentBothIdentifications(invoiceFields)) {
        return acc
      }
      return [...acc, invoice]
    }, []);

    return this.removeDuplicates(filteredInvoices)
  }

  private removeDuplicates(filteredInvoices: string[]) {
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

  private thereArePresentBothTaxes(invoiceFields: string[]) {
    const iva = invoiceFields[4]
    const igic = invoiceFields[5]
    return iva && igic;
  }

  private netIsWrong(invoiceFields: string[]) {
    const iva = invoiceFields[4]
    const igic = invoiceFields[5]
    const gross = Number(invoiceFields[2])
    const net = Number(invoiceFields[3])
    const presentTax = Number(iva || igic)
    return gross - (gross * (presentTax / 100)) !== net;
  }

  private thereArePresentBothIdentifications(invoiceFields: string[]) {
    const CIF = invoiceFields[7]
    const NIF = invoiceFields[8]
    return CIF && NIF
  }
}

