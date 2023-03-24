import { Csv } from "./Csv";
import { Invoice } from "./Invoice";

export class CsvFilter {
  run(csv: Csv) {
    if (!csv.hasHeader('Num_factura')) {
      throw Error('Missing headers.')
    }
    const invoices = Invoice.invoicesFromCsv(csv)
    const filteredInvoices = this.getFilteredInvoices(invoices)
    const csvRows = filteredInvoices.map(invoice => invoice.toCsvRow())
    return [csv.getHeader(), ...csvRows].join('\n')
  }

  private getFilteredInvoices(invoices: Invoice[]) {
    const filteredInvoices = invoices.reduce((acc, invoice) => {
      if (invoice.hasTwoTaxes()) {
        return acc
      }
      if(invoice.netIsWrong()) {
        return acc
      }
      if(invoice.hasTwoIdentifications()) {
        return acc
      }
      return [...acc, invoice]
    }, []);

    return this.removeDuplicates(filteredInvoices)
  }

  private removeDuplicates(filteredInvoices: Invoice[]) {
    const invoicesCounter = {}
    filteredInvoices.forEach(invoice => {
      if(invoicesCounter[invoice.id]) {
        invoicesCounter[invoice.id] += 1
      } else {
        invoicesCounter[invoice.id] = 1
      }
    })

    return filteredInvoices.reduce((acc, invoice) => {
      const invoiceId = invoice.id
      if(invoicesCounter[invoiceId] >= 2) {
        return acc.filter(invoice => invoice.id !== invoiceId)
      }
      return acc
    }, filteredInvoices)
  }
}
