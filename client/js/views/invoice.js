"use strict";

import m from 'mithril';

import utilitiesModel from './../models/utilities';
import userModel from './../models/user';

let bank = {
    view: function() {
        let invoiceId = m.route.param("id");
        let invoice = userModel.filteredHistory[invoiceId];
        let sumary = utilitiesModel.getSumary(invoice, invoiceId, userModel.currentUser.id);
        return [
            m('div.flex.column.between.invoice-div', [
                m('div.flex.column.start', [
                    m('div.flex.column.center.invoice-info-div', [
                        m('div.flex.row.center',
                            m('p.invoice-header', 'FAKTURA')
                        ),
                        m('div.flex.row.between', [
                            m('div.flex.column.start.allign-center', [
                                m('p-invoice-info-text', `Svenska elsparkcyklar AB`),
                                m(
                                    'p-invoice-info-text',
                                    `Fakturaperiod: ${sumary.fromDate} - ${sumary.toDate}`),
                                m('p-invoice-info-text', `Förfallodatum: ${sumary.expDate}`)
                            ]),
                            m('div.flex.column.start.allign-center', [
                                m('p-invoice-info-text', `Kundnummer: ${userModel.currentUser.id}`),
                                m(
                                    'p-invoice-info-text',
                                    `${userModel.currentUser.firstname} ${userModel.currentUser.lastname}`
                                ),
                                m('p-invoice-info-text', `${userModel.currentUser.email}`),
                            ])
                        ])
                    ]),
                    m('table.invoice-table', [
                        m('thead',
                            m('tr',
                                m('td', 'Datum'),
                                m('td', 'Restid'),
                                m('td', 'Kostnad'),
                            )
                        ),
                        m('tbody', [
                            invoice.map((trip) => {
                                return m('tr', [
                                    m('td', `${trip.year}-${trip.month}-${trip.day}`),
                                    m('td', trip.duration),
                                    m('td', `${trip.price} SEK`)
                                ])
                            })
                        ]),
                        m('tfoot',
                            m('tr', [
                                m('td', 'Totalt'),
                                m('td', sumary.duration),
                                m('td', `${sumary.price} SEK`)
                            ])
                        )
                    ]),
                ]),
                m('div.flex.row.between.invoice-payment-info', [
                    m('div.column.flex.end', [
                        m('p.payment-header-text', 'OCR'),
                        m('p.payment-text', sumary.ocr),
                    ]),
                    m('div.column.flex.end', [
                        m('p.payment-header-text', 'Svenska kronor'),
                        m('p.payment-text', `${sumary.price}`),
                    ]),
                    m('div.column.flex.end', [
                        m('p.payment-header-text', 'Betalningsgiro'),
                        m('p.payment-text', sumary.paymentAccount)
                    ]),
                ])
            ])
        ]
    }
};

export default bank;
