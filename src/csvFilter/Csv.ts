export class Csv {
  private csv: string

  constructor(csv: string) {
    this.csv = csv
  }

  getHeader() {
    return this.csv.split('\n')[0]
  }

  getRows() {
    return this.csv.split('\n').slice(1)
  }

  hasHeader(header: string) {
    return this.csv.includes(header)
  }

  value() {
    return this.csv
  }
}
