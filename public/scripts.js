String.prototype.pluralize = function (count) {
    if (count == 1) {
        return this;
    } else {
        return this + "s";
    }
};


Date.prototype.getTimeSinceInWords = function (format) {
    var seconds = Math.abs(Math.floor((new Date().getTime() - this.getTime()) / 1000)),
        until;
    
    var HOURS = 60 * 60,
        DAYS = 24 * HOURS,
        WEEKS = 7 * DAYS,
        YEARS = 365 * DAYS,
        MONTHS = YEARS / 12;
    
    var years = Math.floor(seconds / YEARS);
    seconds -= years * YEARS;
    
    var months = Math.floor(seconds / MONTHS);
    seconds -= months * MONTHS;
    
    var days = Math.floor(seconds / DAYS);
    seconds -= days * DAYS;
    
    var since = [];
    if (years > 0) {
        since.push(years + " year".pluralize(years));
    }
    if (months > 0) {
        since.push(months + " month".pluralize(months));
    }
    if (days > 0) {
        since.push(days + " day".pluralize(days));
    }
    
    switch (since.length) {
        case 1:
            return since[0];
        case 2:
            return since.join(" and ");
        case 3:
            since[2] = "and " + since[2];
            return since.join(", ");
    }
};


$(document).ready(function () {
    $('*[data-date]').html(function () {
        if ($(this).data('date') == '') return 'never';
    
        var date = new Date();
        
        var t = $(this).data('date').split(/[:\- ]/);
        var time = new Date("Sun Jan 01 00:00:00 UTC 2012");
        time.setUTCFullYear(t[0]);
        time.setUTCMonth(t[1] - 1);
        time.setUTCDate(t[2]);
        time.setUTCHours(t[3]);
        time.setUTCMinutes(t[4]);
        time.setUTCSeconds(t[5]);
        
        return time.getTimeSinceInWords();
    });
});