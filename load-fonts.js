 // Load the Open Sans font
    try {
        document.addEventListener("DOMContentLoaded", function() { // prevent a Flash Of Unstyled Text (FOUT)
            document.querySelector('head').innerHTML += "<link href='https://fonts.googleapis.com/css?family=Open+Sans:400,700' rel='stylesheet' type='text/css'>";
            document.body.classList.add('loaded');
        });
    } catch (e) { }
