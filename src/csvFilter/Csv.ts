export class Csv {
  private csv: string

  constructor(csv: string) {
    this.csv = csv
  }

  getHeader() {
    return this.csv.split('\n')[0]
  }

  getInvoices() {
    return this.csv.split('\n').slice(1)
  }

  value() {
    return this.csv
  }
}
