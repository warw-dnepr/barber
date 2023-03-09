
let delete_service = false;
let all_time_true_service = 0;
let free_time_to_order = [];

////////funk getFreeTime
function getFreeTime(mounth, day) {
   console.log(all_time_true_service)
   free_time_to_order = [];
   let result = [];
   trueWorkDay.forEach(element => {
      let temp = element.work_day.split('-');
      if (mounth == parseInt(temp[1]) && day == parseInt(temp[2])) {
         result[0] = [element.time_start_work, element.time_stop_work];
         let temp_t_arr = element.time_order.split('&');
         temp_t_arr.forEach(el => {
            let tempp = el.split('{');
            result.push(tempp[0])
         });
      }
   });
   let date = new Date();
   const [h_st, m_st, s_st] = result[0][0].split(':');
   const [h_end, m_end, s_end] = result[0][1].split(':');
   let start_free_time = date.setHours(h_st, m_st);
   let end_work_day = date.setHours(h_end, m_end);
   result.splice(0, 1);
   result.sort();
   for (i = 0; i < result.length; i++) {
      let part_order = result[i].split('-');
      const [h_or, m_or, s_or] = part_order[0].split(':')
      const [h_or_end, m_or_end, s_or_end] = part_order[1].split(':')

      if (start_free_time == date.setHours(h_or, m_or)) {
         start_free_time = date.setHours(h_or_end, m_or_end);
      } else {
         for (i_1 = 0; start_free_time + i_1 <= end_work_day; i_1 += (15 * 60000)) {
            if (start_free_time + i_1 + all_time_true_service * 60000 <= date.setHours(h_or, m_or)) {
               let temp_date = new Date(start_free_time + i_1);
               temp_date = temp_date.toTimeString();
               temp_date = temp_date.slice(0, 5)
               free_time_to_order.push(temp_date)

            } else {
               start_free_time = date.setHours(h_or_end, m_or_end)
            }
         }
      }
   }
   for (i = 0; i < free_time_to_order.length; i++) {
      $(".free-time-box").append(`<li class="time-check" id="${free_time_to_order[i]}">${free_time_to_order[i]}</li>`);
   }

}


//////////funk checkMasters
let trueMasters = [];
function checkMasters(service) {
   let count = 0;
   mastersList.forEach(element => {

      let tempArr = element.price_master.split('&');
      let check_all_service = false;
      tempArr.forEach(el => {
         el = el.split('{');
         if (el[0] == service) {
            check_all_service = true;
            let flag = false;
            trueMasters.forEach(ms => {
               if (ms.name_master == element.name_master) flag = true
            });
            if (!flag) {
               trueMasters.push(element);
               element['price'] = el[1];
               element['time'] = el[2];
               element['listPrice'] = [];
               element['timeService'] = [];
               element.listPrice.push(el[1]);
               element.timeService.push(el[2]);
            } else {
               let newPrice = el[1];
               let newService = el[2];
               trueMasters.forEach(i => {
                  i.listPrice.forEach(j => {
                     if (j != newPrice) {
                        element.price = parseInt(element.price);
                        element.price += parseInt(newPrice);
                        element.listPrice.push(el[1]);
                        element.time = parseInt(element.time);
                        element.time += parseInt(newService);
                        element.timeService.push(el[2]);
                     }
                  });
               });
            }
         }
      });
      if (!check_all_service) {
         trueMasters.forEach(tm => {
            if (tm.name_master == element.name_master) trueMasters.splice(count, 1);
         });
      } else count++;
   });
}
/////////////calendar barber
let trueWorkDay = [];
function getTrueWorkDay(id_barber) {
   trueWorkDay = [];
   allWorkDay.forEach(element => {
      if (element.id_master == id_barber) trueWorkDay.push(element)
   });
}

//////////add all service
function addAllService() {
   let count = 1;
   for (i = 0; i <= allService.length - 1; i++) {
      if (i == 0) {
         $('.servise-item-oll').append('<ul class="service-item-ul service-item-ul-' + count + '"></ul>');
         $('.service-item-ul-' + count).append(`<li id="${count}" class="service-item-${allService[i].id_all_service}" name="${allService[i].name_service}">${allService[i].name_service}</li>`)
      } else if (i % 6 == 0) {
         count++;
         $('.servise-item-oll').append('<ul class="service-item-ul service-item-ul-' + count + '"></ul>');
         $('.service-item-ul-' + count).append(`<li id="${count}" class="service-item-${allService[i].id_all_service}" name="${allService[i].name_service}">${allService[i].name_service}</li>`)
      } else {
         $('.service-item-ul-' + count).append(`<li id="${count}" class="service-item-${allService[i].id_all_service}" name="${allService[i].name_service}">${allService[i].name_service}</li>`)
      }
   }
}







//////header/////////////////////
//////audio
$(function () {
   $('.fa-volume-high').click(function () {
      $('.fa-volume-high').hide()
      $('.fa-volume-xmark').show()
   })
   $('.fa-volume-xmark').click(function () {
      $('.fa-volume-high').show()
      $('.fa-volume-xmark').hide()
   })
   $('.audio').mouseover(function () {
      $('.audio-info').show();
   })
   $('.audio').mouseout(function () {
      $('.audio-info').hide();
   })
})
var getNum = function () { return Math.floor(Math.random() * 256) };
setInterval(function () {
   document.querySelector('.fa-volume-high').style.color = ' rgb(' + getNum() + ', ' + getNum() + ', ' + getNum() + ')';
   document.querySelector('.fa-volume-xmark').style.color = ' rgb(' + getNum() + ', ' + getNum() + ', ' + getNum() + ')';
}, 400);


///////preloader

$(function () {
   setTimeout(function () {
      $('.preloader').addClass('loaded')
   }, 4000)
})


window.onscroll = function () { scrollFunction() };

function scrollFunction() {
   if (document.body.scrollTop > 60 || document.documentElement.scrollTop > 60) {
      document.querySelector(".logo1").style.display = "none";
      document.querySelector(".logo2").style.width = 90 + "px";
      document.querySelector(".logo2").style.marginTop = 40 + "px";
      document.querySelector(".main-block").style.marginTop = -56 + "px";
      document.querySelector(".main-block").style.maxWidth = 700 + 'px';
   } else {
      document.querySelector(".logo1").style.display = "block";
      document.querySelector(".logo2").style.width = 120 + "px";
      document.querySelector(".logo2").style.marginTop = 0 + "px";
      document.querySelector(".main-block").style.marginTop = -20 + "px";
      document.querySelector(".main-block").style.maxWidth = 900 + 'px';
   }
}


$(function () {
   $('.img-1').mouseover(function () {
      $('.block-1').css('opacity', 1).css('transition', '.6s')
   })
   $('.img-1').mouseout(function () {
      $('.block-1').css('opacity', .3).css('transition', '.6s')
   })

   $('.img-2').mouseover(function () {
      $('.block-2').css('opacity', 1).css('transition', '.6s')
   })
   $('.img-2').mouseout(function () {
      $('.block-2').css('opacity', .3).css('transition', '.6s')
   })

   $('.img-3').mouseover(function () {
      $('.block-3').css('opacity', 1).css('transition', '.6s')
   })
   $('.img-3').mouseout(function () {
      $('.block-3').css('opacity', .3).css('transition', '.6s')
   })
})
///////////menu burger

$(function () {
   $('.menu-burger').click(function () {
      $('.main-block-burger').fadeIn()
      $('.menu-burger').hide(500)
      $('.menu-burger-close').show(500)
   })
   $('.menu-burger-close').click(function () {
      $('.main-block-burger').fadeOut()
      $('.menu-burger').show(500)
      $('.menu-burger-close').hide(500)
   })
   $('.main-block-burger').children().click(function () {
      $('.main-block-burger').fadeOut()
      $('.menu-burger-close').hide(500)
      $('.menu-burger').show(500)
   })
})





////vacancies
$(function () {
   $('.vacancies').click(function () {
      $('.vacancies-window').show();
   })
   $('.closed-vacancies-window').click(function () {
      $('.vacancies-window,.info-vacancies-1, .info-vacancies-2, .info-vacancies-3, .vacancies-oll-info').hide();
   })
   $('.vacancies-1').click(function () {
      $('.info-vacancies-1, .vacancies-oll-info').show();
      $('.info-vacancies-2, .info-vacancies-3').hide();
   })
   $('.vacancies-2').click(function () {
      $('.info-vacancies-2, .vacancies-oll-info').show();
      $('.info-vacancies-1, .info-vacancies-3').hide();
   })
   $('.vacancies-3').click(function () {
      $('.info-vacancies-3, .vacancies-oll-info').show();
      $('.info-vacancies-1, .info-vacancies-2').hide();
   })
   $('.closed-vacancies-window-info').click(function () {
      $('.info-vacancies-1, .info-vacancies-2, .info-vacancies-3, .vacancies-oll-info').hide();
   })
   $('.vacancies-btn').click(function () {/////////////////final click
      let textArVal = $('#vacancies-textarea').val()
      if (textArVal == '') {
         $('textarea').css('box-shadow', ' 0 0 2px 2px red');
      } else {
         $('.vacancies-window,.info-vacancies-1, .info-vacancies-2, .info-vacancies-3, .vacancies-oll-info').hide();
         $('.true-vacancies').append('<p>' + textArVal + '</p>');
         $('textarea').css('box-shadow', 'none');
      }
      $('#vacancies-textarea').val('')
   })
})


//////////////////////////SERVICES/////////////////////////////////////
// $(function () {
//    $('.top-barber').click(function () {
//       $('.barber-top-list').css('display', 'flex');
//       $('.barber-list').css('display', 'none');
//       $('.top-barber').css('background', 'orange').css('color', 'black').css('font-weight', 'bold');
//       $('.barber').css('background', 'rgba(239, 201, 45, 0.542)').css('color', 'antiquewhite').css('font-weight', 'normal')
//    })
// })
// $(function () {
//    $('.barber').click(function () {
//       $('.barber-list').css('display', 'flex')
//       $('.barber-top-list').css('display', 'none')
//       $('.barber').css('background', 'orange').css('color', 'black').css('font-weight', 'bold')
//       $('.top-barber').css('background', 'rgba(239, 201, 45, 0.542)').css('color', 'antiquewhite').css('font-weight', 'normal')

//    })
// })


// ///service reserve links 

$(function () {
   $('.oll-service').click(function () {
      $('.look-calendar, .free-time,.service-item-masters, .client-contact, .barber, .top-barber').hide();
      $('.service-item,.service-item-ul').show();
      $('.oll-service').css('color', 'orange').css('box-shadow', ' 0 0 3px 3px orange')
      $('.oll-masters,.oll-date').css('color', 'antiquewhite').css('box-shadow', ' none');
      $('.true-reserv-date, .true-reserv-time,.true-reserv-masters').children().remove();
      $('.free-time-box').children().remove()
   })
   for (i = 0; i <= 20; i++) {
      $('.service-item-' + i).click(function () {
         let temp = document.getElementsByName($(this).attr('name'))
         checkMasters(temp[0].innerText);

         $('.true-reserv-service').append(this).children().addClass('new-item-service');
         $('.confirm-reserv, .client-contact, .barber, .top-barber').hide();
         if ($('.true-reserv-masters,.true-reserv-date,.true-reserv-time').html().trim() === '') {
            return
         } else {
            $('.true-reserv-date, .true-reserv-time,.true-reserv-masters').children().remove();
         }
      })
   }

   $('.true-reserv-service').click(function (e) {
      delete_service = true;
      let service_id = $(e.target).attr('id');
      console.log(service_id)
      $(e.target).appendTo(`.service-item-ul-${service_id}`);
      $('.look-calendar,.free-time').hide();

      if ($('.true-reserv-service').html().trim() === '') {
         $('.true-reserv-date li, .true-reserv-time li,.true-reserv-masters li').remove();
         $('.look-calendar, .free-time,.confirm-reserv').hide();
      }
      $('.true-reserv-date li, .true-reserv-time li, .true-reserv-masters li').remove();
      $('.service-item,.service-item-ul').show();
      $('.service-item-masters, .client-contact').hide();
      $('.oll-service').css('color', 'orange').css('box-shadow', ' 0 0 3px 3px orange').css('color', 'antiquewhite');
      $('.oll-date,.oll-masters').css('color', 'antiquewhite').css('box-shadow', ' none');
   })
})
function getMasterForAll() {
   trueMasters.forEach(element => {
      let li = document.createElement('li');
      li.className = `${element.name_status_master}`;
      li.id = `service-item-masters-${element.id_master}`;
      li.innerHTML = `${element.name_master}<img class='img-icon' src=img/${element.img_master}>`

      li.addEventListener('click', e => {
         $(li).clone().appendTo('.true-reserv-masters');
         $('.true-reserv-masters li').children('.img-icon').remove();
         getTrueWorkDay(element.id_master);
         all_time_true_service = 0;
         $('.true-reserv-service li').each(function (index) {
            let span = document.createElement("span");
            span.className = element.name_status_master;
            span.innerHTML = element['listPrice'][index] + ' грн. ( ' + element['timeService'][index] + ' хв.)';
            all_time_true_service += parseInt(element['timeService'][index]);
            $(this).children().remove();
            $(this).append(span);
         })

         if ($('.true-reserv-masters').children().length > 1) {
            all_time_true_service = 0;
            $('.true-reserv-masters').children().remove();
            $(li).clone().appendTo('.true-reserv-masters');
            $('.true-reserv-masters li').children('.img-icon').remove()
         }
         if ($(li).hasClass('master-barber')) {
            $('.barber').show()
            $('.top-barber').hide()
         }
         if ($(li).hasClass('master-barber-top')) {
            $('.barber').hide()
            $('.top-barber').show()
         }
      });

      $('.service-item-masters').append(li);
   });

}
$(function () {
   $('.oll-masters').click(function () {
      $('.service-item-masters').children().remove();
      $('.free-time-box').children().remove()
      $('.client-contact, .confirm-reserv').hide();
      if ($('.true-reserv-service').html().trim() === '') {
         $('.service-item,.service-item-ul').show();
         $('.oll-service').css('color', 'orange').css('box-shadow', '0 0 3px 3px orange');
         $('.oll-masters').css('color', 'antiquewhite').css('box-shadow', ' none')
         $('.look-calendar, .client-contact').hide();
      } else {
         $('.look-calendar, .free-time').hide();
         $('.service-item-ul').hide();
         if (delete_service) {
            $('.service-item-masters').children().remove();
            $('.true-reserv-service li').each(function (index) {
               $(this).children().remove();
               checkMasters($(this).text())
               getMasterForAll()
            })
            delete_service = false;

         } else {
            $('.service-item-masters').children().remove();
            getMasterForAll()
         }
         $('.service-item,.service-item-masters').show();
         $('.oll-masters').css('color', 'orange').css('box-shadow', '0 0 3px 3px orange')
         $('.oll-service').css('color', 'antiquewhite').css('box-shadow', ' none');
         $('.oll-date').css('color', 'antiquewhite').css('box-shadow', ' none')
      }
   })
})
//////////calendar
function calendar(id, year, month) {
   var Dlast = new Date(year, month + 1, 0).getDate(),
      D = new Date(year, month, Dlast),
      DNlast = new Date(D.getFullYear(), D.getMonth(), Dlast).getDay(),
      DNfirst = new Date(D.getFullYear(), D.getMonth(), 1).getDay(),
      calendar = '<tr>',
      month = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
   if (DNfirst != 0) {
      for (var i = 1; i < DNfirst; i++) calendar += '<td>';
   } else {
      for (var i = 0; i < 6; i++) calendar += '<td>';
   }
   for (var i = 1; i <= Dlast; i++) {
      let day_work = 'color : red;';
      let class_click = 'data-item_off';

      trueWorkDay.forEach(element => {
         let temp_date = element.work_day.split('-');
         if (parseInt(temp_date[1]) == D.getMonth() + 1 && parseInt(temp_date[2]) == i) {
            day_work = "color : orange; cursor : pointer; box-shadow: 0 0 3px 3px orange;color: orange;";
            class_click = 'data-item';
         }
      })
      if (D.getMonth() == new Date().getMonth() && i < new Date().getDate()) {
         calendar += '<td>';
      }
      else if (i == new Date().getDate() && D.getFullYear() == new Date().getFullYear() && D.getMonth() == new Date().getMonth()) {
         if (class_click == 'data-item_off') {
            calendar += '<td id=' + (D.getMonth() + 1) + ' class=" ' + class_click + ' " style="color: red; box-shadow: 0 0 3px 3px green; border: .3px solid rgba(255, 166, 0, 0.311); border-radius:50%;">' + i;
         } else {
            calendar += '<td id=' + (D.getMonth() + 1) + ' class=" ' + class_click + ' " style="color: green; cursor: pointer; box-shadow: 0 0 3px 3px green; border: .3px solid rgba(255, 166, 0, 0.311); border-radius:50%;">' + i;
         }
      } else {
         calendar += '<td id=' + (D.getMonth() + 1) + ' class=" ' + class_click + ' " style="' + day_work + 'border: .3px solid rgba(255, 166, 0, 0.311); border-radius:50%;">' + i;
      }
      if (new Date(D.getFullYear(), D.getMonth(), i).getDay() == 0) {
         calendar += '<tr>';
      }
   }
   for (var i = DNlast; i < 7; i++) calendar += '<td> ';
   document.querySelector('#' + id + ' tbody').innerHTML = calendar;
   document.querySelector('#' + id + ' thead td:nth-child(2)').innerHTML = month[D.getMonth()] + ' ' + D.getFullYear();
   document.querySelector('#' + id + ' thead td:nth-child(2)').dataset.month = D.getMonth();
   document.querySelector('#' + id + ' thead td:nth-child(2)').dataset.year = D.getFullYear();
   if (document.querySelectorAll('#' + id + ' tbody tr').length < 6) {
      // чтобы при перелистывании месяцев не "подпрыгивала" вся страница, добавляется ряд пустых клеток. Итог: всегда 6 строк для цифр
      document.querySelector('#' + id + ' tbody').innerHTML += '<tr><td> <td> <td> <td> <td> <td> <td> ';
   }

   $('.data-item').click(function () {
      $('.free-time-box').children().remove()
      let now_month = this.id;
      if (now_month < 10) {
         now_month = '0' + this.id;
      }
      getFreeTime(this.id, $(this).text());
      $('.free-time').show();

      $('.true-reserv-date').append('<li>' + this.outerText + '.' + now_month + '</li > ')
      if ($('.true-reserv-date').children().length > 1) {
         $('.oll-date').css('color', 'orange').css('box-shadow', '0 0 3px 3px orange')
         $('.true-reserv-date,.true-reserv-time').children().remove();
         $('.confirm-reserv').hide();
         $('.true-reserv-date').append('<li>' + this.outerText + '.' + now_month + '</li > ')
      }
   })
}
// переключатель минус месяц
document.querySelector('#calendar thead tr:nth-child(1) td:nth-child(1)').onclick = function () {
   calendar("calendar", document.querySelector('#calendar thead td:nth-child(2)').dataset.year, parseFloat(document.querySelector('#calendar thead td:nth-child(2)').dataset.month) - 1);
}
// переключатель плюс месяц
document.querySelector('#calendar thead tr:nth-child(1) td:nth-child(3)').onclick = function () {
   calendar("calendar", document.querySelector('#calendar thead td:nth-child(2)').dataset.year, parseFloat(document.querySelector('#calendar thead td:nth-child(2)').dataset.month) + 1);
}
////////////////

$(function () {


   $('.oll-date').click(function () {
      calendar("calendar", new Date().getFullYear(), new Date().getMonth());
      $('.free-time-box').children().remove()


      if ($('.true-reserv-service').html().trim() === '') {
         $('.look-calendar, .free-time,.confirm-reserv, .client-contact').hide();
         $('.service-item-masters').hide();
         $('.service-item,.service-item-ul').show();
         $('.oll-service').css('color', 'orange').css('box-shadow', '0 0 3px 3px orange');
         $('.oll-masters').css('color', 'antiquewhite').css('box-shadow', ' none')
         $('.oll-date').css('color', 'antiquewhite').css('box-shadow', ' none');

      } else if ($('.true-reserv-service').html().trim() != '' && $('.true-reserv-masters').html().trim() === '') {
         $('.service-item-masters').children().remove();
         getMasterForAll()
         $('.service-item-ul').hide();
         $('.look-calendar, .free-time').hide();
         $('.service-item-masters').show();
         $('.oll-date, .oll-service').css('color', 'antiquewhite').css('box-shadow', ' none');
         $('.oll-masters').css('color', 'orange').css('box-shadow', '0 0 3px 3px orange');

      } else {
         $('.service-item-ul, .client-contact').hide();
         $('.service-item-masters').hide();
         $('.look-calendar').show();
         $('.oll-service').css('color', 'antiquewhite').css('box-shadow', ' none');
         $('.oll-masters').css('color', 'antiquewhite').css('box-shadow', ' none');
         $('.oll-date').css('color', 'orange').css('box-shadow', '0 0 3px 3px orange')
      }
   })
})
$(function () {//////// time check click

   $(".free-time-box ").on('click', 'li', function () {
      $('.free-time-box').children().remove();
      $(this).clone().appendTo('.true-reserv-time');
      $(".free-time, .look-calendar").hide();
      $('.client-contact').show();
      $('.confirm-reserv').fadeIn(1000).css('color', 'orange').css('box-shadow', '0 0 3px 3px orange');
      $('.oll-date').css('color', 'antiquewhite').css('box-shadow', ' none')
      if ($('.true-reserv-time').children().length > 1) {
         $('.true-reserv-time').children().remove();
         $(this).clone().appendTo('.true-reserv-time');
      }
      // if ($('.free-time-box').children().length <= 8) {
      //    $('.free-time').css('width', '300px')
      // }
      $('.free-time-box').children().remove()
   })
   $(" .closed-time").click(function () {
      $(".free-time").hide();
      $('.free-time-box').children().remove()
   })
})
$(function () {////click confirm
   $(function () {
      $("#userPhone").mask("+38(999) 999-99-99");
   });
   $('.confirm-reserv').click(function () {
      let nameVal = $('#userName').val();
      let phoneVal = $('#userPhone').val();
      if (phoneVal == '') {
         $('#userPhone').css('box-shadow', '0 0 3px 3px darkred')
      } else {
         $('#userPhone').css('box-shadow', ' none');
         $(".true-reserv-phone").append("<li>" + phoneVal + "</li>");
      }
      if (nameVal == '') {
         $('#userName').css('box-shadow', '0 0 3px 3px darkred')
      } else {
         $('#userName').css('box-shadow', ' none');
         $(".true-reserv-name").append("<li>" + nameVal + "</li>");
      }
      if (phoneVal != '' && nameVal != '') {
         $(' .reserv-window').hide();
         $(' .servise-item-finish').show();
         $('.servise-item-finish').append('<div><p>' + nameVal + ', дякуемо за замовлення!<br><br> Ми до вас задзвонемо найближчим часом.</p></div>');
      }
      if ($('.servise-item-finish').children().length > 1) {
         $('.servise-item-finish').children().remove();
         $('.servise-item-finish').append('<div><p>' + nameVal + ', дякуемо за замовлення!<br><br> Ми до вас задзвонемо найближчим часом.</p></div>');
      }
      $('#userName,#userPhone').val('');
   })
   $('.servise-item-finish').click(function () {
      $(' .servise-item-finish').hide();
   })
   $('.servise-item-finish').mouseover(function () {
      $('.closed-vacancies-finish').css('color', 'red');
   })
   $('.servise-item-finish').mouseout(function () {
      $('.closed-vacancies-finish').css('color', 'antiquewhite');
   })
})

///////////////////////////// service oll !!!!!
$(function () {
   $('.item-1').mouseover(function () {
      $('.inform-1').show()
   })
   $('.item-1').mouseout(function () {
      $('.inform-1').hide()
   })
   $('.item-2').mouseover(function () {
      $('.inform-2').show()
   })
   $('.item-2').mouseout(function () {
      $('.inform-2').hide()
   })
})


$(function () {
   for (i = 0; i <= 6; i++) {
      let count = i;

      $('#price-' + count).mouseover(function () {
         $('.price-info').addClass('right-window')
         $('.price-info').show()
         $('.ul-' + count).show()
      })
      $('#price-' + count).mouseout(function () {
         $('.price-info').removeClass('right-window')
         $('.price-info').removeClass('left-window')
         $('.price-info').hide()
         $('.ul-' + count).hide()
      })
   }

   for (i = 7; i <= 20; i++) {
      let count = i;

      $('#price-' + count).mouseover(function () {
         $('.price-info').addClass('left-window')
         $('.price-info').show()
         $('.ul-' + count).show()
      })
      $('#price-' + count).mouseout(function () {
         $('.price-info').removeClass('right-window')
         $('.price-info').removeClass('left-window')
         $('.price-info').hide()
         $('.ul-' + count).hide()
      })
   }

})

$(function () {//////click price mobile
   for (i = 1; i <= 12; i++) {
      $('#price-' + i).on('touchstart', function () {
         $('.reserv-window, .service-item, .service-item-ul').fadeIn(500);
         $('.look-calendar, .free-time,.service-item-masters, .client-contact').hide();
         $('.oll-service').css('color', 'orange').css('box-shadow', ' 0 0 3px 3px orange')
      })
   }
})

//////////click for reserve
$(function () {

   $('.btn-reserv-a,.a-master').click(function () {
      $('.true-reserv-service li').each(function () {
         $(this).appendTo(`.service-item-ul-${$(this).attr('id')}`);
      })
      $('.true-reserv-date li, .true-reserv-time li, .true-reserv-masters li').remove();
      $('.reserv-window, .service-item, .service-item-ul').fadeIn(500);
      $('.look-calendar, .free-time,.service-item-masters, .client-contact, .confirm-reserv').hide();
      $('.oll-service').css('color', 'orange').css('box-shadow', ' 0 0 3px 3px orange')
      $('.oll-masters, .oll-date').css('color', 'antiquewhite').css('box-shadow', 'none')
      all_time_true_service = 0;
   })


   $('.closed-reserv-window').click(function () {
      $('.reserv-window,.wind-for-certificate').hide();
      $('.free-time-box').children().remove()
      all_time_true_service = 0
   })

})
$(function () {
   $('.item-1').click(function () {
      $('.info-block, .recomend-info-1').show();
      $('.recomend-info-2').hide();
      $('.info-block').removeClass('top');
   })
   $('.item-2').click(function () {
      $('.info-block, .recomend-info-2').show();
      $('.recomend-info-1').hide();

   })
   $('.closed-info-block').click(function () {
      $('.info-block, .recomend-info-1, .recomend-info-1').hide();

   })

})


/////////////////////masters////////////////////////

///////////carusel////
$(function () {
   $('.swiper-wrapper').slick({
      centerMode: true,
      centerPadding: '10px',
      slidesToShow: 2,
      autoplay: true,
      slidesToScroll: 1,
      autoplaySpeed: 3000,
      arrows: true,
      prevArrow: '<span class="arrow-left"><i class="fa-solid fa-circle-chevron-left"></i></span>',
      nextArrow: '<span class="arror-right"><i class="fa-solid fa-circle-chevron-right"></i></span>',
      responsive: [
         {
            breakpoint: 872,
            settings: {
               arrows: false,
               centerMode: true,
               centerPadding: '10px',
               slidesToShow: 2
            }
         },
         {
            breakpoint: 768,
            settings: {
               arrows: false,
               centerMode: true,
               centerPadding: '40px',
               slidesToShow: 1
            }
         },
         {
            breakpoint: 480,
            settings: {
               arrows: false,
               centerMode: true,
               centerPadding: '10px',
               slidesToShow: 1
            }
         }
      ]
   });
});



/////////////////////////gift-certificate

$(function () {
   $('#imgGift,.gift-text').mouseover(function () {
      $('.gift-btn').css('box-shadow', '0 0 4px 4px orange')
   })
   $('#imgGift,.gift-text').mouseout(function () {
      $('.gift-text').css('background', 'none').css('box-shadow', 'none')
      $('.gift-btn').css('box-shadow', 'none')
   })
})
$(function () {
   $('.gift-btn').click(function () {
      $('.oll-masters, .oll-date').css('color', 'antiquewhite').css('box-shadow', 'none')
      $('.true-reserv-date li, .true-reserv-time li, .true-reserv-masters li').remove();
      $('.reserv-window, .service-item, .service-item-ul,.wind-for-certificate').fadeIn(500);
      $('.look-calendar, .free-time,.service-item-masters, .client-contact').hide();
      $('.oll-service').css('color', 'orange').css('box-shadow', ' 0 0 3px 3px orange')
      if ($('.service-item-ul-1').children().length < 6) {
         $('.true-reserv-service').children().appendTo('.service-item-ul-1');
      } else {
         $('.true-reserv-service').children().appendTo('.service-item-ul-2');
      }

   })
   $('.wind-for-certificate,.reserv-window').click(function () {
      $('.wind-for-certificate').fadeOut(500)
   })
})

/////////////////////////gallery
$('.carusel-1').slick({
   slidesToShow: 3,
   slidesToScroll: 1,
   autoplay: true,
   autoplaySpeed: 3000,
   responsive: [
      {
         breakpoint: 768,
         settings: {
            // centerPadding: '115px',
            arrows: false,
            centerMode: true,
            slidesToShow: 2
         }
      },
      {
         breakpoint: 480,
         settings: {
            centerPadding: '5px',
            arrows: false,
            centerMode: true,
            slidesToShow: 1
         }
      }
   ]
});
$('.carusel-2').slick({
   slidesToShow: 3,
   slidesToScroll: 1,
   autoplay: true,
   autoplaySpeed: 3000,
   responsive: [
      {
         breakpoint: 768,
         settings: {
            arrows: false,
            centerMode: true,
            // centerPadding: '115px',
            slidesToShow: 2
         }
      },
      {
         breakpoint: 480,
         settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '5px',
            slidesToShow: 1
         }
      }
   ]
});
/////////////market
$('.market-carusel').slick({
   slidesToShow: 3,
   slidesToScroll: 1,
   centerPadding: '10px',
   autoplay: true,
   autoplaySpeed: 3000,
   responsive: [
      {
         breakpoint: 768,
         settings: {
            arrows: false,
            centerMode: true,
            // centerPadding: '115px',
            slidesToShow: 2
         }
      },
      {
         breakpoint: 480,
         settings: {
            arrows: false,
            centerMode: true,
            // centerPadding: '20px',
            slidesToShow: 1
         }
      }
   ]
});
// $('.market-div-oll').mouseover(function () {
//    $(this).children('.market-btn').show()
// })
// $('.market-div-oll').mouseout(function () {
//    $(this).children('.market-btn').hide()
// })



/////////////contact
// let request;
// if (window.XMLHttpRequest) {
//    request = new XMLHttpRequest();
// } else {
//    request = new ActiveXObject("Microsoft.XMLHTTP");
// }
// request.open("GET", "http://api.openweathermap.org/data/2.5/weather?q=Kyiv&units=metric&lang=en&appid=9fbaef1980ec0e5dd28c355a2f56449a");

// request.onload = function () {

//    if (request.status === 200) {

//       //parse////////
//       ourWeather = JSON.parse(request.response);
//       city.innerText = ourWeather.name
//       // + ' - ' +ourWeather.sys.country;

//       let iconImg = 'http://openweathermap.org/img/wn/' + ourWeather.weather[0].icon + '@2x.png';
//       mainIcon.src = iconImg;

//       temp.innerHTML = ourWeather.main.temp.toFixed(0) + "<span><sup>o</sup><span>c</span>";

//    }
// }
// request.send()


