"use strict";

import m from 'mithril';

let index = {
    view: function() {
        return [
            m('h1', 'Välkommen'),
            m('p', 'Vi på Svenska Elsparkscyklar AB, erbjuder dig en modern upplevelse gällande uthyrning av cyklar.'),
            m('p', 'Vi finns i nuläget i tre städer med vision att udvidga oss.')
        ]
    }
};

export default index;
