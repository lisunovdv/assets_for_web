function temposSendGoal(goal) {
    var logData = {};
    if (typeof ga == 'function') {
        ga('send', 'event', goal, 'send');
        logData['google_analytics'] = goal;
    }
    if (typeof window.yaCounter00000000.reachGoal == 'function') {
        window.yaCounter00000000.reachGoal(goal);
        logData['yandex_metrika'] = goal;
    }
    if (typeof fbq == 'function') {
        fbq('track', 'Lead');
        logData['facebook_pixel'] = goal;
    }
    console.log(logData);
}


$( document ).ajaxSuccess(function( event, request, settings ) {
    console.log('event:::::::::::::::'+event);
    console.log(event);
    console.log('request:::::::::::::::'+request);
    console.log(request);
    console.log('settings:::::::::::::::'+settings);
    console.log(settings);
}); 
