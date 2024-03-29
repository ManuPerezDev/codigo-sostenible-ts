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
import {CsvFilter} from "./CsvFilter";
import {Csv} from "./Csv";


describe('CsvFilter should', () => {
  it('not filter a invoice without errors',  () => {
    const csv = new Csv('Num_factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente\n1,02/05/2019,1008,816.48,19,,ACERLaptop,B76430134,');
    expect(new CsvFilter().run(csv)).toBe(csv.value())
  });

  it('not filter a invoice without errors with multiple lines',  () => {
    const csv = new Csv('Num_factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente\n1,02/05/2019,1008,816.48,19,,ACERLaptop,B76430134,\n2,02/05/2019,1008,816.48,19,,MACLaptop,B76430134,');
    expect(new CsvFilter().run(csv)).toBe(csv.value())
  });

  it('filter an invoce if iva and igic are present at the same time', () => {
    const csv = new Csv('Num_factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente\n1,02/05/2019,1008,816.48,19,8,ACERLaptop,B76430134,');

    const expectedFilteredCsv = 'Num_factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente';
    expect(new CsvFilter().run(csv)).toBe(expectedFilteredCsv)
  });

  it('filter and invoice when the net is wrong',  () => {
    const csv = new Csv('Num_factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente\n1,02/05/2019,1008,1008,19,,ACERLaptop,B76430134,')

    const expectedFilteredCsv = 'Num_factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente';
    expect(new CsvFilter().run(csv)).toBe(expectedFilteredCsv)
  });

  it('filter and invoice when are present CIF and NIF at the same time',  () => {
    const csv = new Csv('Num_factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente\n1,02/05/2019,1008,816.48,19,,ACERLaptop,B76430134,45345666Y')

    const expectedFilteredCsv = 'Num_factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente';
    expect(new CsvFilter().run(csv)).toBe(expectedFilteredCsv)
  });

  it('filter the invoices which have the same identification',  () => {
    const csv = new Csv('Num_factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente\n1,02/05/2019,1008,816.48,19,,ACERLaptop,B76430134,\n1,02/05/2019,1008,816.48,19,,MacLaptop,B76430134,')

    const expectedFilteredCsv = 'Num_factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente';
    expect(new CsvFilter().run(csv)).toBe(expectedFilteredCsv)
  });

  it('send an error if there is no headers',  () => {
    expect(() => new CsvFilter().run(new Csv('1,02/05/2019,1008,1008,19,,ACERLaptop,B76430134,45345666Y'))).toThrowError('Missing headers.')
  });
});
