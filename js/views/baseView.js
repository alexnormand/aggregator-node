define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone) {
    var BaseView = Backbone.View.extend({

        loaderImage : '<div class="hero-unit loader"></div>',

        updateMainView: function(html, i, footerAbsolutePosition) {
            var menuItems = $('ul.nav li');

            $('#main').html(html);
            menuItems.removeClass('active');
            i !== null && menuItems.eq(i).addClass('active');

            if (footerAbsolutePosition) {
                $('body').addClass('footerAbsolute');
            } else {
                $('body').removeClass('footerAbsolute');
            }
        }
    });

    return BaseView;
});
