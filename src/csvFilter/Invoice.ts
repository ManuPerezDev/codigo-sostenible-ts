export class Invoice {
  id: string;
  gross: number;
  net: number;
  iva: number;
  igic: number;
  CIF: string;
  NIF: string;
  date: string;
  concept: string;
  constructor(params: {
    id: string,
    date: string,
    gross: number,
    net: number,
    iva: number,
    igic: number,
    concept: string,
    CIF: string,
    NIF: string
  }) {
    this.id = params.id;
    this.gross = params.gross;
    this.net = params.net;
    this.iva = params.iva;
    this.igic = params.igic;
    this.CIF = params.CIF;
    this.NIF = params.NIF;
    this.date = params.date;
    this.concept = params.concept;
  }
  static fromCsvRow(row: string) {
    const fields = row.split(',');
    return new Invoice({
      id: fields[0],
      date: fields[1],
      gross: Number(fields[2]),
      net: Number(fields[3]),
      iva: Number(fields[4]),
      igic: Number(fields[5]),
      concept: fields[6],
      CIF: fields[7],
      NIF: fields[8]
    })
  }

  toCsvRow() {
    const valuesWithoutZeros = this.turnZerosToEmptyStrings();
    return [valuesWithoutZeros.id, valuesWithoutZeros.date, valuesWithoutZeros.gross, valuesWithoutZeros.net, valuesWithoutZeros.iva, valuesWithoutZeros.igic, valuesWithoutZeros.concept, valuesWithoutZeros.CIF, valuesWithoutZeros.NIF].join(',')
  }

  private turnZerosToEmptyStrings() {
    const valuesWithoutZeros: InvoicePrimitive = Object.keys(this).reduce((acc, key) => {
      if (this[key] === 0) {
        return {...acc, [key]: ''}
      }
      return {...acc, [key]: this[key]}
    }, {} as InvoicePrimitive)
    return valuesWithoutZeros;
  }
}

type InvoicePrimitive = {
  id: string
  date: string
  gross: number
  net: number
  iva: number
  igic: number
  concept: string
  CIF: string
  NIF: string
}
