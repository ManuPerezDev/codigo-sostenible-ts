import { Csv } from "./Csv";
import { Invoice } from "./Invoice";

export class CsvFilter {
  run(csv: Csv) {
    if (!csv.hasHeader('Num_factura')) {
      throw Error('Missing headers.')
    }
    const invoices = csv.getRows().map(row => Invoice.fromCsvRow(row));
    const filteredInvoices = this.getFilteredInvoices(invoices)

    const csvRows = filteredInvoices.map(invoice => invoice.toCsvRow())

    return [csv.getHeader(), ...csvRows].join('\n')
  }

  private getFilteredInvoices(invoices: Invoice[]) {
    const filteredInvoices = invoices.reduce((acc, invoice) => {
      if (this.thereArePresentBothTaxes(invoice)) {
        return acc
      }
      if(this.netIsWrong(invoice)) {
        return acc
      }
      if(this.thereArePresentBothIdentifications(invoice)) {
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

  private thereArePresentBothTaxes(invoice: Invoice) {
    return invoice.iva && invoice.igic;
  }

  private netIsWrong(invoice: Invoice) {
    const presentTax = invoice.iva || invoice.igic
    return invoice.gross - (invoice.gross * (presentTax / 100)) !== invoice.net;
  }

  private thereArePresentBothIdentifications(invoice: Invoice) {
    return invoice.CIF && invoice.NIF
  }
}
