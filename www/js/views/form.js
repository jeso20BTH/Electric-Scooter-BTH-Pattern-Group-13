"use strict";
import axios from 'axios';
import m from 'mithril';
import deliveries from '../models/deliveries';
import products from '../models/products';


// let x = 
//     axios.post ({
//         url: "http://localhost:1337/graphql",
//         data: ({
//             query: `
//             query {
//                 cities {
//                     id
//                     name
//                 }
//             }
//             `
//         })
//     })
//     // .then((res) => {return res})
//     .then((res) => {
//         console.log(res.data)
//         return res.data
//       })
//       .catch((err) => {
//         console.log(err)
//       })
//       ;


// console.log(x)
    


let form = {
    oninit: products.getProducts,
    view: function (vnode) {
        return m("main.container", [
            m("div", "Hello, " + vnode.attrs.name),
            m("h1", "Ny leverans"),
            m("form", {
                onsubmit: function(event) {
                    event.preventDefault();
                    deliveries.save();
                    m.route.set("/");
                }
            }, [
                m("label.input-label", "Produkt"),
                m("select.input", {
                    onchange: function (e) {
                        deliveries.currentDelivery.id = parseInt(e.target.value);
                    }
                }, products.allProducts.map(function (product) {
                    return m("option", { value: product.id }, product.name);
                })),
                m("label.input-label", "Antal"),
                m("input[type=number][placeholder=Ange antal][required=required].input", {
                    oninput: function(event) {
                        deliveries.currentDelivery.amount = event.target.value;
                    }
                }),
                m("label.input-label", "Kommentar"),
                m(`input[type=textarea][value=Inleverans].input`, {
                    onchange: function(event) {
                        deliveries.currentDelivery.comment = event.target.value;
                    },
                }),
                m("label.input-label", "Datum för inleverans"),
                m("input.input[type=date][required=required]", {
                    oninput: function(event) {
                        deliveries.currentDelivery.date = event.target.value;
                    }
                }),
                m("input[type=submit][value=Spara].Btn", "Spara")
            ])
        ]);
    }
};

export default form;
