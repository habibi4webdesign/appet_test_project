import React from 'react';
import DatePicker from 'material-ui/DatePicker';
import areIntlLocalesSupported from 'intl-locales-supported';
import persianUtils from 'material-ui-persian-date-picker-utils';

let DateTimeFormat;


if (areIntlLocalesSupported(['fa-IR'])) {
    DateTimeFormat = global.Intl.DateTimeFormat;
} else {
    const IntlPolyfill = require('intl');
    DateTimeFormat = IntlPolyfill.DateTimeFormat;
    require('intl/locale-data/jsonp/fa-IR');
}

const PersianDatePicker= (props) => (

    <DatePicker
        hintText="تاریخ"
        DateTimeFormat={DateTimeFormat}
        okLabel="تایید"
        cancelLabel="لغو"
        locale="fa-IR"
        value={props.default}
        firstDayOfWeek={6}
        utils={persianUtils}
        onChange={(event,date) => props.dateOnChange(date)}
       // formatDate={formatPersianDate}
        {...props}
    />
);


function onChange(event,date){

   return date;
    
}

export default PersianDatePicker;