function fortitles() {
    var pirmaist = $('#pirmais').text();
    var otraist = $('#otrais').text();
    if (otraist == 'Yearly/') {
        var intervaltxt = 'Gada';
    }
    var yearselect = $('#ceturtais').text();

    var tresaist = $('#tresais').text();
    if (otraist == 'Monthly/') {
        if (tresaist == 'Multiyear_monthly_maximum/' || tresaist == 'Multiyear_monthly_minimum/' || tresaist == 'Multiyear_monthly_mean/') {
            var intervaltxt = 'mēneša';
        } else {
            var intervaltxt = 'Mēneša';
        }
    }
    var yeart = $('#ceturtais').text();
    var montht = $('#sestais').text();
    var seasont = $('#piektais').text();
    if (otraist == 'Seasonal/') {
        if (tresaist == 'Multiyear_seasonal_maximum/' || tresaist == 'Multiyear_seasonal_minimum/' || tresaist == 'Multiyear_seasonal_mean/') {
            var intervaltxt = 'sezonas';
        } else {
            var intervaltxt = 'Sezonas';
        }
    }
    if (montht == '01') {
        var monthname = 'janvārī';
    }
    if (montht == '02') {
        var monthname = 'februārī';
    }
    if (montht == '03') {
        var monthname = 'martā';
    }
    if (montht == '04') {
        var monthname = 'aprīlī';
    }
    if (montht == '05') {
        var monthname = 'maijā';
    }
    if (montht == '06') {
        var monthname = 'jūnijā';
    }
    if (montht == '07') {
        var monthname = 'jūlijā';
    }
    if (montht == '08') {
        var monthname = 'augustā';
    }
    if (montht == '09') {
        var monthname = 'septembrī';
    }
    if (montht == '10') {
        var monthname = 'oktobrī';
    }
    if (montht == '11') {
        var monthname = 'novembrī';
    }
    if (montht == '12') {
        var monthname = 'decembrī';
    }
    if (seasont == '02') {
        var seasonname = 'ziemā';
    }
    if (seasont == '05') {
        var seasonname = 'pavasarī';
    }
    if (seasont == '08') {
        var seasonname = 'vasarā';
    }
    if (seasont == '11') {
        var seasonname = 'rudenī';
    }
    if (pirmaist == 'SIS/') {
        prod = 'globālā saules radiācija piezemē (W/m²)';
        if (tresaist == 'Monthly_mean/') {
            var virsraksts = intervaltxt + ' vidējā ' + prod + ' ' + yearselect + '. gada ' + monthname;
        }
        if (tresaist == 'Seasonal_mean/') {
            var virsraksts = intervaltxt + ' vidējā ' + prod + ' ' + yearselect + '. gada ' + seasonname;
        }
        if (tresaist == 'Yearly_mean/') {
            var virsraksts = 'Vidējā ' + prod + ' ' + yearselect + '. gadā';
        }
        if (tresaist == 'Multiyear_monthly_maximum/') {
            var virsraksts = 'Ilggadīgā ' + intervaltxt + ' maksimālā ' + prod + ' ' + monthname;
        }
        if (tresaist == 'Multiyear_monthly_minimum/') {
            var virsraksts = 'Ilggadīgā ' + intervaltxt + ' minimālā ' + prod + ' ' + monthname;
        }
        if (tresaist == 'Multiyear_monthly_mean/') {
            var virsraksts = 'Ilggadīgā ' + intervaltxt + ' ' + prod + ' ' + monthname;
        }
        if (tresaist == 'Multiyear_seasonal_maximum/') {
            var virsraksts = 'Ilggadīgā ' + intervaltxt + ' maksimālā ' + prod + ' ' + seasonname;
        }
        if (tresaist == 'Multiyear_seasonal_minimum/') {
            var virsraksts = 'Ilggadīgā ' + intervaltxt + ' minimālā ' + prod + ' ' + seasonname;
        }
        if (tresaist == 'Multiyear_seasonal_mean/') {
            var virsraksts = 'Ilggadīgā ' + intervaltxt + ' ' + prod + ' ' + seasonname;
        }
        if (tresaist == 'Multiyear_yearly_maximum/') {
            var virsraksts = 'Ilggadīgā gada maksimālā ' + prod;
        }
        if (tresaist == 'Multiyear_yearly_minimum/') {
            var virsraksts = 'Ilggadīgā gada minimālā ' + prod;
        }
        if (tresaist == 'Multiyear_yearly_mean/') {
            var virsraksts = 'Ilggadīgā gada vidējā ' + prod;
        }
        if (tresaist == 'Multiyear_yearly_std/') {
            var virsraksts = intervaltxt + ' vidējās globālās saules radiācijas piezemē (W/m²) standartnovirze';
        }
        if (tresaist == 'Multiyear_monthly_std/') {
            var virsraksts = intervaltxt + ' vidējās globālās saules radiācijas piezemē (W/m²) standartnovirze ' + monthname;
        }
        if (tresaist == 'Multiyear_seasonal_std/') {
            var virsraksts = intervaltxt + ' vidējās globālās saules radiācijas piezemē (W/m²) standartnovirze ' + seasonname;
        }
        if (tresaist == 'Monthly_anomaly/') {
            var virsraksts = intervaltxt + ' vidējās globālās saules radiācijas piezemē (W/m²) anomālija ' + yearselect + '. gada ' + monthname;
        }
        if (tresaist == 'Seasonal_anomaly/') {
            var virsraksts = intervaltxt + ' vidējās globālās saules radiācijas piezemē (W/m²) anomālija ' + yearselect + '. gada ' + seasonname;
        }
        if (tresaist == 'Yearly_anomaly/') {
            var virsraksts = intervaltxt + ' vidējās globālās saules radiācijas piezemē (W/m²) anomālija ' + yearselect + '. gadā';
        }
    }
    if (pirmaist == 'DNI/') {
        prod = 'normalizētā tiešā saules radiācija piezemē (W/m²)';
        if (tresaist == 'Monthly_mean/') {
            var virsraksts = intervaltxt + ' vidējā ' + prod + ' ' + yearselect + '. gada ' + monthname;
        }
        if (tresaist == 'Seasonal_mean/') {
            var virsraksts = intervaltxt + ' vidējā ' + prod + ' ' + yearselect + '. gada ' + seasonname;
        }
        if (tresaist == 'Yearly_mean/') {
            var virsraksts = 'Vidējā ' + prod + ' ' + yearselect + '. gadā';
        }
        if (tresaist == 'Multiyear_monthly_maximum/') {
            var virsraksts = 'Ilggadīgā ' + intervaltxt + ' maksimālā ' + prod + ' ' + monthname;
        }
        if (tresaist == 'Multiyear_monthly_minimum/') {
            var virsraksts = 'Ilggadīgā ' + intervaltxt + ' minimālā ' + prod + ' ' + monthname;
        }
        if (tresaist == 'Multiyear_monthly_mean/') {
            var virsraksts = 'Ilggadīgā ' + intervaltxt + ' ' + prod + ' ' + monthname;
        }
        if (tresaist == 'Multiyear_seasonal_maximum/') {
            var virsraksts = 'Ilggadīgā ' + intervaltxt + ' maksimālā ' + prod + ' ' + seasonname;
        }
        if (tresaist == 'Multiyear_seasonal_minimum/') {
            var virsraksts = 'Ilggadīgā ' + intervaltxt + ' minimālā ' + prod + ' ' + seasonname;
        }
        if (tresaist == 'Multiyear_seasonal_mean/') {
            var virsraksts = 'Ilggadīgā ' + intervaltxt + ' ' + prod + ' ' + seasonname;
        }
        if (tresaist == 'Multiyear_yearly_maximum/') {
            var virsraksts = 'Ilggadīgā gada maksimālā ' + prod;
        }
        if (tresaist == 'Multiyear_yearly_minimum/') {
            var virsraksts = 'Ilggadīgā gada minimālā ' + prod;
        }
        if (tresaist == 'Multiyear_yearly_mean/') {
            var virsraksts = 'Ilggadīgā gada vidējā ' + prod;
        }
        if (tresaist == 'Multiyear_yearly_std/') {
            var virsraksts = intervaltxt + ' vidējās normalizētās tiešās saules radiācijas piezemē (W/m²) standartnovirze';
        }
        if (tresaist == 'Multiyear_monthly_std/') {
            var virsraksts = intervaltxt + ' vidējās normalizētās tiešās saules radiācijas piezemē (W/m²) standartnovirze ' + monthname;
        }
        if (tresaist == 'Multiyear_seasonal_std/') {
            var virsraksts = intervaltxt + ' vidējās normalizētās tiešās saules radiācijas piezemē (W/m²) standartnovirze ' + seasonname;
        }
        if (tresaist == 'Monthly_anomaly/') {
            var virsraksts = intervaltxt + ' vidējās normalizētās tiešās saules radiācijas piezemē (W/m²) anomālija ' + yearselect + '. gada ' + monthname;
        }
        if (tresaist == 'Seasonal_anomaly/') {
            var virsraksts = intervaltxt + ' vidējās normalizētās tiešās saules radiācijas piezemē (W/m²) anomālija ' + yearselect + '. gada ' + seasonname;
        }
        if (tresaist == 'Yearly_anomaly/') {
            var virsraksts = intervaltxt + ' vidējās normalizētās tiešās saules radiācijas piezemē (W/m²) anomālija ' + yearselect + '. gadā';
        }
    }
    if (pirmaist == 'SID/') {
        prod = 'tiešā saules radiācija piezemē (W/m²)';
        if (tresaist == 'Monthly_mean/') {
            var virsraksts = intervaltxt + ' vidējā ' + prod + ' ' + yearselect + '. gada ' + monthname;
        }
        if (tresaist == 'Seasonal_mean/') {
            var virsraksts = intervaltxt + ' vidējā ' + prod + ' ' + yearselect + '. gada ' + seasonname;
        }
        if (tresaist == 'Yearly_mean/') {
            var virsraksts = 'Vidējā ' + prod + ' ' + yearselect + '. gadā';
        }
        if (tresaist == 'Multiyear_monthly_maximum/') {
            var virsraksts = 'Ilggadīgā ' + intervaltxt + ' maksimālā ' + prod + ' ' + monthname;
        }
        if (tresaist == 'Multiyear_monthly_minimum/') {
            var virsraksts = 'Ilggadīgā ' + intervaltxt + ' minimālā ' + prod + ' ' + monthname;
        }
        if (tresaist == 'Multiyear_monthly_mean/') {
            var virsraksts = 'Ilggadīgā ' + intervaltxt + ' ' + prod + ' ' + monthname;
        }
        if (tresaist == 'Multiyear_seasonal_maximum/') {
            var virsraksts = 'Ilggadīgā ' + intervaltxt + ' maksimālā ' + prod + ' ' + seasonname;
        }
        if (tresaist == 'Multiyear_seasonal_minimum/') {
            var virsraksts = 'Ilggadīgā ' + intervaltxt + ' minimālā ' + prod + ' ' + seasonname;
        }
        if (tresaist == 'Multiyear_seasonal_mean/') {
            var virsraksts = 'Ilggadīgā ' + intervaltxt + ' ' + prod + ' ' + seasonname;
        }
        if (tresaist == 'Multiyear_yearly_maximum/') {
            var virsraksts = 'Ilggadīgā gada maksimālā ' + prod;
        }
        if (tresaist == 'Multiyear_yearly_minimum/') {
            var virsraksts = 'Ilggadīgā gada minimālā ' + prod;
        }
        if (tresaist == 'Multiyear_yearly_mean/') {
            var virsraksts = 'Ilggadīgā gada vidējā ' + prod;
        }
        if (tresaist == 'Multiyear_yearly_std/') {
            var virsraksts = intervaltxt + ' vidējās tiešās saules radiācijas piezemē (W/m²) standartnovirze';
        }
        if (tresaist == 'Multiyear_monthly_std/') {
            var virsraksts = intervaltxt + ' vidējās tiešās saules radiācijas piezemē (W/m²) standartnovirze ' + monthname;
        }
        if (tresaist == 'Multiyear_seasonal_std/') {
            var virsraksts = intervaltxt + ' vidējās tiešās saules radiācijas piezemē (W/m²) standartnovirze ' + seasonname;
        }
        if (tresaist == 'Monthly_anomaly/') {
            var virsraksts = intervaltxt + ' vidējās tiešās saules radiācijas piezemē (W/m²) anomālija ' + yearselect + '. gada ' + monthname;
        }
        if (tresaist == 'Seasonal_anomaly/') {
            var virsraksts = intervaltxt + ' vidējās tiešās saules radiācijas piezemē (W/m²) anomālija ' + yearselect + '. gada ' + seasonname;
        }
        if (tresaist == 'Yearly_anomaly/') {
            var virsraksts = intervaltxt + ' vidējās tiešās saules radiācijas piezemē (W/m²) anomālija ' + yearselect + '. gadā';
        }
    }
    $('#header h3').html(virsraksts);
}