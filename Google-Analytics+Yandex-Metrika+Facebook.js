function temposSendGoal(goal) {
    var logData = {};
    if (typeof ga == 'function') {
        ga('send', 'event', goal, 'send');
        logData['google_analytics'] = {gaGoal: goal,gaEvent:'send'};
    }
    if (window.yaCounter00000000 && typeof window.yaCounter00000000.reachGoal == 'function') {
        window.yaCounter00000000.reachGoal(goal);
        logData['yandex_metrika'] = goal;
    }
    if (typeof fbq == 'function') {
        fbq('track', 'Lead', {content_name:goal});
        logData['facebook_pixel'] = {'track':'Lead',content_name:goal};
    }
    if (typeof dataLayer != 'undefined' && Object.prototype.toString.call( dataLayer ) === '[object Array]' )) {
        logData['google_tag_manager'] = {'event': goal};
        dataLayer.push({'event': goal});
    }
    console.log(logData);
}


switch (formId) {
    case '***':
        goal = 'zakazat'
        break;
    case '***':
        goal = 'zakazat'
        break;
    case '***':
        goal = 'zakazat'
        break;
}

$( document ).ajaxSuccess(function( event, request, settings ) {
    console.log('event:::::::::::::::'+event);
    console.log(event);
    console.log('request:::::::::::::::'+request);
    console.log(request);
    console.log('settings:::::::::::::::'+settings);
    console.log(settings);
}); 

// Widget.Gen после успешной отправки
<script type="text/javascript">
function showSuccess(id) {
     jQuery('.modal').modal('hide'); jQuery('#thanksModal').modal('show');
}
</script>


/*
Задача:
"Нужно отслеживать успешную отправку формы, и передавать данные об этом событии в Google Analytics.
Передача аналитики осуществляется вызовом метода ga(), который принимает 4 параметра:
     ga('send', 'event', 'НАЗВАНИЕ ЦЕЛИ' ИЛИ СОБЫТИЯ, 'send');
Обычно вызов такой такой функции вешают на событие "submit" отправки формы, например, так:
<form onsubmit="ga('send', 'event', 'НАЗВАНИЕ ЦЕЛИ' ИЛИ СОБЫТИЯ, 'send');"> ...
или так, если используется jQuery:
$('#form1').submit(function() { ga('send', 'event', 'НАЗВАНИЕ ЦЕЛИ' ИЛИ СОБЫТИЯ, 'send'); });
При этом подразумеватеся, что валидация / проверка правильности ввода данных в формуосуществляется на фронтенеде
(Например, поля < input type=" email" /> имеет атрибут required )
*/
