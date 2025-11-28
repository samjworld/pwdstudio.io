(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').addClass('bg-white shadow-sm').css('top', '0px');
        } else {
            $('.sticky-top').removeClass('bg-white shadow-sm').css('top', '-150px');
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Header carousel
    $(".header-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        loop: true,
        dots: true,
        items: 1
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        items: 1,
        autoplay: true,
        smartSpeed: 1000,
        animateIn: 'fadeIn',
        animateOut: 'fadeOut',
        dots: true,
        loop: true,
        nav: false
    });
    


    // Lead forms: modal quoteForm + contactQuoteForm
    $(function () {
        function handleLeadForm($form) {
            if (!$form.length) return;
            $form.on('submit', function (e) {
                e.preventDefault();
                var $f = $(this);
                var data = {
                    name: $f.find('input[name="name"]').val() || '',
                    phone: $f.find('input[name="phone"]').val() || '',
                    email: $f.find('input[name="email"]').val() || '',
                    message: $f.find('textarea[name="message"]').val() || '',
                    propertyType: $f.find('input[name="propertyType"]:checked').val() || '',
                    propertyLocation: $f.find('[name="propertyLocation"]').val() || '',
                    whatsappOptIn: $f.find('[name="whatsappOptIn"]').is(':checked') ? 1 : 0
                };

                if (!data.name || !data.phone) {
                    alert('Please enter your name and phone number.');
                    return;
                }

                $.ajax({
                    url: 'php-backend/contact_smtp.php',
                    method: 'POST',
                    data: data,
                    dataType: 'json'
                }).done(function (res) {
                    var waNumber = '919666476363'; // your WhatsApp number without +
                    var text = 'Hi, I am ' + encodeURIComponent(data.name)
                             + '%0APhone: ' + encodeURIComponent(data.phone)
                             + '%0AProperty Type: ' + encodeURIComponent(data.propertyType)
                             + '%0ALocation: ' + encodeURIComponent(data.propertyLocation)
                             + '%0AInterested in interior design consultation.';
                    var waUrl = 'https://wa.me/' + waNumber + '?text=' + text;

                    window.open(waUrl, '_blank');

                    alert('Thank you! Your details have been submitted. We will contact you shortly.');
                    $f[0].reset();
                    if ($('#quoteModal').length) {
                        var modalEl = document.getElementById('quoteModal');
                        if (modalEl && bootstrap.Modal.getInstance(modalEl)) {
                            bootstrap.Modal.getInstance(modalEl).hide();
                        }
                    }
                }).fail(function () {
                    alert('Something went wrong. Please try again or contact us directly on WhatsApp.');
                });
            });
        }

        handleLeadForm($('#quoteForm'));
        handleLeadForm($('#contactQuoteForm'));
    });


})(jQuery);

