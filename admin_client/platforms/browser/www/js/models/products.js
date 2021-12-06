"use strict";
import axios from 'axios';
import m from 'mithril';

import {baseUrl, apiKey} from "../vars.js";

let products = {
    allProducts: [],
    allMiso: [],

    getProducts: function () {
        return m.request({
            method: "GET",
            url: `${baseUrl}products?api_key=${apiKey}`
        }).then(function (result) {
            products.allProducts = result.data;
        });
    },
    getOne: function (delivery) {
        return m.request({
            method: "GET",
            url: `${baseUrl}products/${delivery.product_id}?api_key=${apiKey}`
        }).then(function (result) {
            products.update(result.data.stock, delivery);
        });
    },
    update: function (productStock, delivery) {
        var updateProduct = {
            id: delivery.product_id,
            api_key: `${apiKey}`,
            stock: (productStock + (parseInt(delivery.amount)))
        };

        fetch(`${baseUrl}products`, {
            body: JSON.stringify(updateProduct),
            headers: {
                "content-type": "application/json"
            },
            method: "PUT"
        });
    },
};


export default products;
